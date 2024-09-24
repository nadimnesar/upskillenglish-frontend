import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environment';

@Component({
  selector: 'app-quick-practice',
  templateUrl: './quick-practice.component.html',
  styleUrl: './quick-practice.component.scss'
})
export class QuickPracticeComponent implements OnInit {

  private apiUrl = environment.backendUrl + '/api';
  questionList: any[] = [];
  loading: boolean = true;
  minutes: number = 5;
  seconds: number = 0;
  countdownInterval: any;
  showErrorMessage: boolean = false;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.fetchQuestions();
    this.showErrorMessage = false;
  }

  fetchQuestions(): void {
    const token = localStorage.getItem('jwt');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    this.http.get(`${this.apiUrl}/v1/create-quick-practice`, { headers }).subscribe({
      next: (response: any) => {
        this.questionList = response.questionList || [];
        this.loading = false;
        if (this.questionList.length > 0) {
          this.startCountdown();
        }
      },
      error: (error: any) => {
        console.error('Error fetching questions:', error);
      },
      complete: () => {
        console.info('Fetch process completed');
      }
    });
  }

  startCountdown(): void {
    this.countdownInterval = setInterval(() => {
      if (this.seconds === 0) {
        if (this.minutes === 0) {
          clearInterval(this.countdownInterval);
          this.router.navigate(['/']);
        } else {
          this.minutes--;
          this.seconds = 59;
        }
      } else {
        this.seconds--;
      }
    }, 1000);
  }

  onSubmit(): void {
    if (this.isAllQuestionsAnswered()) {
      this.submitForm();
      clearInterval(this.countdownInterval);
      this.showErrorMessage = false;
    } else {
      this.showErrorMessage = true;
    }
  }

  isAllQuestionsAnswered(): boolean {
    return this.questionList.every(q => q.userAnswer !== undefined && q.userAnswer !== null && q.userAnswer !== '');
  }

  submitForm(): void {
    const submittedQuestionFormList = this.questionList.map(q => ({
      question: q.question,
      optionA: q.optionA,
      optionB: q.optionB,
      optionC: q.optionC,
      optionD: q.optionD,
      answer: q.answer,
      userAnswer: q.userAnswer
    }));

    const token = localStorage.getItem('jwt');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    this.http.post(`${this.apiUrl}/v1/submit-quick-practice`, { submittedQuestionFormList }, { headers })
      .subscribe({
        next: (response: any) => {
          console.log('Submission successful', response);
          const responseAnswerList: any[] = response.responseQuestionList;
          localStorage.setItem('responseAnswerList', JSON.stringify(responseAnswerList));
          this.router.navigate(['/quick-test/answer']);
        },
        error: (error: any) => {
          console.error('Submission failed', error);
        },
        complete: () => {
          console.info('Submit process completed');
        }
      });
  }
}
