import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';
import { environment } from '../../environment';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {
  userList: any[] = [];
  loading: boolean = true;
  currentPage: number = 0;
  hasNextPage: boolean = true;
  pageSize: number = 10;
  totalUsers: number = 0;

  private apiUrl = environment.backendUrl + '/api/public/v1/get-all-user';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadPage(this.currentPage);
  }

  loadPage(page: number): void {
    if (page < 0) return;
    this.loading = true;
    this.http.get<any[]>(`${this.apiUrl}?page=${page}&size=${this.pageSize}`)
      .pipe(
        catchError(error => {
          console.error('Error fetching data', error);
          this.loading = false;
          return of([]);
        })
      )
      .subscribe(response => {
        this.userList = response;
        this.hasNextPage = response.length === this.pageSize;
        this.currentPage = page;
        this.loading = false;
      });
  }

  getGlobalRank(index: number): number {
    return (this.currentPage * this.pageSize) + index + 1;
  }
}
