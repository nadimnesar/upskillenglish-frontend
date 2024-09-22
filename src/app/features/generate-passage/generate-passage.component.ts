import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environment';

@Component({
  selector: 'app-generate-passage',
  templateUrl: './generate-passage.component.html',
  styleUrls: ['./generate-passage.component.scss']
})
export class GeneratePassageComponent implements OnInit {
  passage: string | null = null;
  translation: string | null = null;
  showTranslation: boolean = false;
  loading: boolean = true;
  selectedWordLimit: number = 250;
  wordLimits: number[] = [100, 250, 500, 1000];

  private apiUrl = environment.backendUrl + '/api/v1';
  private token = localStorage.getItem('jwt') || '';

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.getPassage();
  }

  private getPassage(): void {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    this.http.get<{ passage: string }>(`${this.apiUrl}/generate-passage`, {
      headers,
      params: { wordLimit: this.selectedWordLimit.toString() }
    })
      .subscribe({
        next: response => {
          this.passage = response.passage;
          this.loading = false;
        },
        error: error => {
          console.error('Error fetching passage:', error);
          this.loading = false;
        }
      });
  }

  toggleTranslation(): void {
    if (this.showTranslation) {
      this.translation = null;
    } else {
      if (this.passage && !this.translation) {
        this.getTranslation(this.passage);
      }
    }
    this.showTranslation = !this.showTranslation;
  }

  private getTranslation(passage: string): void {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });

    this.http.post<{ passage: string }>(`${this.apiUrl}/translate-passage`, { passage }, { headers })
      .subscribe({
        next: response => {
          this.translation = response.passage;
        },
        error: error => {
          console.error('Error fetching translation:', error);
        }
      });
  }

  onWordLimitChange(event: any): void {
    this.selectedWordLimit = +event.target.value;
  }

  copyPassage(): void {
    if (this.passage) {
      navigator.clipboard.writeText(this.passage).then(() => {
        alert('Passage copied to clipboard!');
      }).catch(err => {
        console.error('Failed to copy passage:', err);
      });
    }
  }

  getNewPassage(): void {
    this.loading = true;
    this.showTranslation = false;
    this.translation = null;
    this.getPassage();
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}
