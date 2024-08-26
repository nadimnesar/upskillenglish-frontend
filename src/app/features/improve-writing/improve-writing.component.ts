import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-improve-writing',
  templateUrl: './improve-writing.component.html',
  styleUrls: ['./improve-writing.component.scss']
})
export class ImproveWritingComponent implements OnInit {

  private apiUrl = 'http://localhost:8080/api';
  topicList: any[] = [];
  selectedTopic: string = '';
  userResponse: string = '';
  serverResponse: any | null = null;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.fetchTopic();
  }

  fetchTopic(): void {
    const token = localStorage.getItem('jwt');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    this.http.get(`${this.apiUrl}/v1/generate-topic`, { headers }).subscribe({
      next: (response: any) => {
        this.topicList = response.topicList || [];
        this.selectedTopic = this.topicList.length > 0 ? this.topicList[0].topic : '';
      },
      error: (error: any) => {
        console.error('Error fetching topicList:', error);
      },
      complete: () => {
        console.info('Fetch process completed');
      }
    });
  }

  submitResponse(): void {
    const token = localStorage.getItem('jwt');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    const payload = {
      question: this.selectedTopic,
      answer: this.userResponse
    };

    this.http.post<any>(`${this.apiUrl}/v1/judge-writing`, payload, { headers }).subscribe({
      next: (response: any) => {
        this.serverResponse = response;
      },
      error: (error: any) => {
        console.error('Error submitting response:', error);
      },
      complete: () => {
        console.info('Submission process completed');
      }
    });
  }
}
