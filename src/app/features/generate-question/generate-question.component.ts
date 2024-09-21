import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-generate-question',
  templateUrl: './generate-question.component.html',
  styleUrls: ['./generate-question.component.scss']
})
export class GenerateQuestionComponent {

  private apiUrl = 'http://localhost:8080'; // Base URL
  userText: string = '';
  serverResponse: { [key: string]: string | null } = { api1: null, api2: null, api3: null, api4: null };
  mcqResponse: any = null;  // To store the MCQ response data
  opinionativeResponse: any = null; // To store the Opinionative response data
  factCheckResponse : any = null;
  completionResponse : any = null;
  showAnswers: boolean[] = []; // Array to track visibility of each answer (for MCQs)
  showOpinionativeAnswers: boolean[] = []; // Array to track visibility of each answer (for Opinionative)
  showFactCheckAnswers: boolean[] = [];
  showCompletionAnswers : boolean[] = [];

  constructor(private http: HttpClient) {}

  // Function to clear all responses before making a new request
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

  // Function to handle MCQ submission
  submitMCQ(): void {
    this.clearResponses(); // Clear existing data
    const token = localStorage.getItem('jwt');  // If using authentication
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    const url = `${this.apiUrl}/api/public/mcq`;

    this.http.post<any>(url, this.userText, { headers }).subscribe({
      next: (response: any) => {
        // Assuming the response has the structure { mcqList: [...] }
        this.mcqResponse = response;
        this.initializeAnswerVisibility();
      },
      error: (error: any) => {
        console.error('Error submitting to MCQ:', error);
        this.mcqResponse = null;  // Clear the MCQ response on error
      }
    });
  }

  // Function to handle Opinionative submission
  submitOpinionative(): void {
    this.clearResponses(); // Clear existing data
    const token = localStorage.getItem('jwt');  // If using authentication
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    const url = `${this.apiUrl}/api/public/opinionative`;

    this.http.post<any>(url, this.userText, { headers }).subscribe({
      next: (response: any) => {
        // The response should have the structure { questionList: [{ question: string, answer: string }, ...] }
        this.opinionativeResponse = response.questionList; // Store only the question list
        this.initializeOpinionativeAnswerVisibility(); // Initialize visibility state for opinionative answers
      },
      error: (error: any) => {
        console.error('Error submitting to Opinionative:', error);
        this.opinionativeResponse = null;  // Clear the Opinionative response on error
      }
    });
  }

  // Function to handle FactCheck submission
  submitFactCheck(): void {
    this.clearResponses(); // Clear existing data
    // FactCheck functionality (add API call and handling here)
    const token = localStorage.getItem('jwt');  // If using authentication
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    const url = `${this.apiUrl}/api/public/factCheck`;
    // console.log('FactCheck button clicked.');
    // this.serverResponse['api3'] = 'FactCheck response here...'; // Dummy response for demonstration
    

    this.http.post<any>(url, this.userText, { headers }).subscribe({
      next: (response: any) => {
        // The response should have the structure { questionList: [{ question: string, answer: string }, ...] }
        this.factCheckResponse = response.tfList; // Store only the question list
        this.initializefactCheckAnswerVisibility(); // Initialize visibility state for opinionative answers
      },
      error: (error: any) => {
        console.error('Error submitting to FactChek:', error);
        this.factCheckResponse = null;  // Clear the Opinionative response on error
      }
    });
  
  
  }

  // Function to handle Completion submission
  submitCompletion(): void {
    this.clearResponses(); // Clear existing data
    // FactCheck functionality (add API call and handling here)
    const token = localStorage.getItem('jwt');  // If using authentication
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    const url = `${this.apiUrl}/api/public/completion`;
    // console.log('FactCheck button clicked.');
    // this.serverResponse['api3'] = 'FactCheck response here...'; // Dummy response for demonstration
    

    this.http.post<any>(url, this.userText, { headers }).subscribe({
      next: (response: any) => {
        // The response should have the structure { questionList: [{ question: string, answer: string }, ...] }
        this.completionResponse = response.scList; // Store only the question list
        this.initializeCompletionAnswerVisibility(); // Initialize visibility state for opinionative answers
      },
      error: (error: any) => {
        console.error('Error submitting to FactChek:', error);
        this.completionResponse = null;  // Clear the Opinionative response on error
      }
    });
  }

  // Initialize the answer visibility array based on the number of MCQs
  private initializeAnswerVisibility(): void {
    if (this.mcqResponse && this.mcqResponse.mcqList) {
      this.showAnswers = new Array(this.mcqResponse.mcqList.length).fill(false);
    }
  }

  // Toggle the visibility of the correct answer for each MCQ
  toggleAnswerVisibility(index: number): void {
    this.showAnswers[index] = !this.showAnswers[index];
  }

  // Initialize the answer visibility array based on the number of opinionative questions
  private initializeOpinionativeAnswerVisibility(): void {
    if (this.opinionativeResponse) {
      this.showOpinionativeAnswers = new Array(this.opinionativeResponse.length).fill(false);
    }
  }

  // Toggle the visibility of the answer for each opinionative question
  toggleOpinionativeAnswerVisibility(index: number): void {
    this.showOpinionativeAnswers[index] = !this.showOpinionativeAnswers[index];
  }

   // Initialize the answer visibility array based on the number of opinionative questions
   private initializefactCheckAnswerVisibility(): void {
    if (this.factCheckResponse) {
      this.showFactCheckAnswers = new Array(this.factCheckResponse.length).fill(false);
    }
  }

  // Toggle the visibility of the answer for each opinionative question
  togglefactCheckAnswerVisibility(index: number): void {
    this.showFactCheckAnswers[index] = !this.showFactCheckAnswers[index];
  }

   // Initialize the answer visibility array based on the number of opinionative questions
   

  private initializeCompletionAnswerVisibility(): void {
    if (this.completionResponse) {
      this.showCompletionAnswers = new Array(this.completionResponse.length).fill(false);
    }
  }

  // Toggle the visibility of the answer for each opinionative question
  togglecompletionAnswerVisibility(index: number): void {
    this.showCompletionAnswers[index] = !this.showCompletionAnswers[index];
  }
}