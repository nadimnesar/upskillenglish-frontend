import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-reading-test',
  templateUrl: './reading-test.component.html',
  styleUrls: ['./reading-test.component.scss']
})
export class ReadingTestComponent implements OnInit {

  passage: string = '';
  mcqResponse: any = null;
  opinionativeResponse: any = null;
  factCheckResponse: any = null;
  mcqSelected: string[] = [];
  opinionativeSelected: string[] = [];
  factCheckSelected: string[] = [];

  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadTest();
  }

  loadTest(): void {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json'
    });

    // Sample API Call for fetching test data
    this.http.get<any>(`${this.apiUrl}/api/public/v2/generate-passage`, { headers }).subscribe(response => {
      this.passage = response.passage.passage;
      //console.log(this.passage);
      this.mcqResponse = response.mcq;
      this.opinionativeResponse = response.opinionative;
      this.factCheckResponse = response.factCheck;
    });
  }
}
