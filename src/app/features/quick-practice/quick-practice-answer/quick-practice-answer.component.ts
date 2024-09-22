import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quick-practice-answer',
  templateUrl: './quick-practice-answer.component.html',
  styleUrls: ['./quick-practice-answer.component.scss']
})
export class QuickPracticeAnswerComponent implements OnInit {
  responseAnswerList: any[] = [];
  noAnswers: boolean = true;

  constructor(private router: Router) { }

  ngOnInit(): void {
    const savedList = localStorage.getItem('responseAnswerList');
    if (savedList) {
      this.responseAnswerList = JSON.parse(savedList);
      this.noAnswers = false;
    }
    else {
      console.warn('No Answer List');
      this.noAnswers = true;
    }
  }

  ngOnDestroy(): void {
    localStorage.removeItem('responseAnswerList');
    this.noAnswers = true;
  }

  navigateToHome(): void {
    this.router.navigate(['/']);
  }

  startQuickPracticeAgain(): void {
    this.router.navigate(['/quick-test']);
  }
}
