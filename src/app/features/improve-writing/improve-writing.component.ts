import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Import the interfaces
import { ServerResponse } from './models'; // Adjust the path as necessary

@Component({
  selector: 'app-improve-writing',
  templateUrl: './improve-writing.component.html',
  styleUrls: ['./improve-writing.component.scss']
})
export class ImproveWritingComponent implements OnInit {

  private apiUrl = 'http://localhost:8080/api';
  topicList: any[] = [];
  selectedTopic: string = ''; 
  userResponse: string = '';  // To store the user's response
  serverResponse: ServerResponse | null = null;   // Update the type

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

    this.http.get(`${this.apiUrl}/genTopic`, { headers }).subscribe({
      next: (response: any) => {
        this.topicList = response.topicList || [];
        console.log('Topic List:', this.topicList); // Log the topic list
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

    this.http.post<ServerResponse>(`${this.apiUrl}/v1/judge`, payload, { headers }).subscribe({
      next: (response: ServerResponse) => {
        console.log('Full API Response:', response); // Log the full response
        this.serverResponse = response; // Assign the response directly
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
