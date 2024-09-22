import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  totalScore: number | null = null;

  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadTest();
    this.totalScore = 0;
  }

  loadTest(): void {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json'
    });

    this.http.get<any>(`${this.apiUrl}/api/v2/generate-passage`, { headers }).subscribe(response => {
      this.passage = response.passage.passage;
      this.mcqResponse = response.mcq;
      this.opinionativeResponse = response.opinionative;
      this.factCheckResponse = response.factCheck;
    });
  }

  submitAnswers(): void {
    let score = 0;

    // Calculate MCQ score
    if (this.mcqResponse?.mcqList) {
      this.mcqResponse.mcqList.forEach((mcq: any, index: number) => {
        if (this.mcqSelected[index] === mcq.answer) {
          console.log("mcq score added");
          score++;
        }
      });
    }

    // Calculate Opinionative score (assuming Yes/No type, but scoring logic can vary)
    if (this.opinionativeResponse?.questionList) {
      this.opinionativeResponse.questionList.forEach((question: any, index: number) => {
        if (this.opinionativeSelected[index] === question.answer) {
          console.log("Opinionative score added");
          score++;
        }
      });
    }

    // Calculate FactCheck score
    if (this.factCheckResponse?.tfList) {
      this.factCheckResponse.tfList.forEach((factCheck: any, index: number) => {
        if (this.factCheckSelected[index] === factCheck.answer) {
          console.log("FactCheck score added");
          score++;
        }
      });
    }

    this.totalScore = score;

    this.updateScore().subscribe({
      error: (error: any) => {
        console.error('Error updaing score:', error);
      },
      complete: () => {
        console.log('Score update done!');
      }
    });
  }

  updateScore(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(`${this.apiUrl}/api/v1/updateScore?score=${this.totalScore}`, {}, { headers });
  }
}
