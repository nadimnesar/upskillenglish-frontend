import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quick-practice',
  templateUrl: './quick-practice.component.html',
  styleUrl: './quick-practice.component.scss'
})
export class QuickPracticeComponent implements OnInit {

  questionList: any[] = [];
  loading: boolean = true;
  minutes: number = 2;
  seconds: number = 0;
  countdownInterval: any;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.fetchQuestions();
  }

  fetchQuestions(): void {
    const token = localStorage.getItem('jwt');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.get('http://localhost:8080/api/v1/create-quick-practice', { headers })
      .subscribe(
        (response: any) => {
          this.questionList = response.questionList || [];
          this.loading = false;
          if (this.questionList.length > 0) {
            this.startCountdown();
          }
        },
        (error) => {
          console.error('Error fetching questions:', error);
          this.loading = false;
        }
      );
  }

  startCountdown(): void {
    this.countdownInterval = setInterval(() => {
      if (this.seconds === 0) {
        if (this.minutes === 0) {
          this.submitForm();
          clearInterval(this.countdownInterval);
          this.router.navigate(['/']); // Redirect to home page after time is up
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
    this.submitForm();
    clearInterval(this.countdownInterval); // Stop the countdown on form submission
    this.router.navigate(['/']); // Redirect to home page after submission
  }

  submitForm(): void {
    const submittedAnswers = this.questionList.map(q => ({
      question: q.question,
      userAnswer: q.userAnswer
    }));

    // Call the backend API to submit answers
    // Example:
    // this.http.post('http://localhost:8080/api/v1/submit-quick-practice', submittedAnswers)
    //   .subscribe(response => {
    //     console.log('Submission successful', response);
    //   }, error => {
    //     console.error('Submission failed', error);
    //   });
  }

}
