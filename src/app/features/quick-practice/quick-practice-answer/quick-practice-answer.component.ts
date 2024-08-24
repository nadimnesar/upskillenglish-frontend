import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quick-practice-answer',
  templateUrl: './quick-practice-answer.component.html',
  styleUrls: ['./quick-practice-answer.component.scss']
})
export class QuickPracticeAnswerComponent implements OnInit {
  responseAnswerList: any[] = [];

  constructor(private router: Router) { }

  ngOnInit(): void {
    const savedList = localStorage.getItem('responseAnswerList');
    if (savedList) {
      this.responseAnswerList = JSON.parse(savedList);
    }
    else {
      console.warn('No Answer List');
      this.router.navigate(['/']);
    }
  }

  navigateToHome(): void {
    this.router.navigate(['/']);
    localStorage.removeItem('responseAnswerList');
  }

  startQuickPracticeAgain(): void {
    this.router.navigate(['/feature/quick-practice']);
    localStorage.removeItem('responseAnswerList');
  }
}
