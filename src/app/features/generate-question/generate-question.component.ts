import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from '../../environment';

@Component({
  selector: 'app-generate-question',
  templateUrl: './generate-question.component.html',
  styleUrls: ['./generate-question.component.scss']
})
export class GenerateQuestionComponent {

  private apiUrl = environment.backendUrl;
  userText: string = '';
  serverResponse: { [key: string]: string | null } = { api1: null, api2: null, api3: null, api4: null };
  mcqResponse: any = null;
  opinionativeResponse: any = null;
  factCheckResponse: any = null;
  completionResponse: any = null;
  showAnswers: boolean[] = [];
  showOpinionativeAnswers: boolean[] = [];
  showFactCheckAnswers: boolean[] = [];
  showCompletionAnswers: boolean[] = [];

  constructor(private http: HttpClient) { }

  private clearResponses(): void {
    this.mcqResponse = null;
    this.opinionativeResponse = null;
    this.factCheckResponse = null;
    this.completionResponse = null;
    this.serverResponse = { api1: null, api2: null, api3: null, api4: null };
    this.showAnswers = [];
    this.showOpinionativeAnswers = [];
    this.showFactCheckAnswers = [];
    this.showCompletionAnswers = [];
  }

  submitMCQ(): void {
    this.clearResponses();
    const token = localStorage.getItem('jwt');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    const url = `${this.apiUrl}/api/v1/generate-mcq`;

    this.http.post<any>(url, this.userText, { headers }).subscribe({
      next: (response: any) => {
        this.mcqResponse = response;
        this.initializeAnswerVisibility();
      },
      error: (error: any) => {
        console.error('Error submitting to MCQ:', error);
        this.mcqResponse = null;
      }
    });
  }


  submitOpinionative(): void {
    this.clearResponses();
    const token = localStorage.getItem('jwt');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    const url = `${this.apiUrl}/api/v1/generate-opinionative`;

    this.http.post<any>(url, this.userText, { headers }).subscribe({
      next: (response: any) => {
        this.opinionativeResponse = response.questionList;
        this.initializeOpinionativeAnswerVisibility();
      },
      error: (error: any) => {
        console.error('Error submitting to Opinionative:', error);
        this.opinionativeResponse = null;
      }
    });
  }

  submitFactCheck(): void {
    this.clearResponses();
    const token = localStorage.getItem('jwt');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    const url = `${this.apiUrl}/api/v1/generate-factCheck`;

    this.http.post<any>(url, this.userText, { headers }).subscribe({
      next: (response: any) => {
        this.factCheckResponse = response.tfList;
        this.initializefactCheckAnswerVisibility();
      },
      error: (error: any) => {
        console.error('Error submitting to FactChek:', error);
        this.factCheckResponse = null;
      }
    });
  }

  submitCompletion(): void {
    this.clearResponses();
    const token = localStorage.getItem('jwt');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    const url = `${this.apiUrl}/api/v1/generate-completion`;

    this.http.post<any>(url, this.userText, { headers }).subscribe({
      next: (response: any) => {
        this.completionResponse = response.scList;
        this.initializeCompletionAnswerVisibility();
      },
      error: (error: any) => {
        console.error('Error submitting to FactChek:', error);
        this.completionResponse = null;
      }
    });
  }

  private initializeAnswerVisibility(): void {
    if (this.mcqResponse && this.mcqResponse.mcqList) {
      this.showAnswers = new Array(this.mcqResponse.mcqList.length).fill(false);
    }
  }

  toggleAnswerVisibility(index: number): void {
    this.showAnswers[index] = !this.showAnswers[index];
  }

  private initializeOpinionativeAnswerVisibility(): void {
    if (this.opinionativeResponse) {
      this.showOpinionativeAnswers = new Array(this.opinionativeResponse.length).fill(false);
    }
  }

  toggleOpinionativeAnswerVisibility(index: number): void {
    this.showOpinionativeAnswers[index] = !this.showOpinionativeAnswers[index];
  }

  private initializefactCheckAnswerVisibility(): void {
    if (this.factCheckResponse) {
      this.showFactCheckAnswers = new Array(this.factCheckResponse.length).fill(false);
    }
  }

  togglefactCheckAnswerVisibility(index: number): void {
    this.showFactCheckAnswers[index] = !this.showFactCheckAnswers[index];
  }

  private initializeCompletionAnswerVisibility(): void {
    if (this.completionResponse) {
      this.showCompletionAnswers = new Array(this.completionResponse.length).fill(false);
    }
  }

  togglecompletionAnswerVisibility(index: number): void {
    this.showCompletionAnswers[index] = !this.showCompletionAnswers[index];
  }
}