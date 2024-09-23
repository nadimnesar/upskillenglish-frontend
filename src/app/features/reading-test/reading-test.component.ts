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
  totalScore: number | null = 0;

  part2Visible = false; 
  passageList: string[] = [];
  matchingInfoResponse: any = null;
  matchingSelected: string[] = [];
  finalScore: number | null = null;
  passageStringList: string[] = [];

  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadTest();
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

    if (this.mcqResponse?.mcqList) {
      this.mcqResponse.mcqList.forEach((mcq: any, index: number) => {
        if (this.mcqSelected[index] === mcq.answer) {
          score++;
        }
      });
    }

    if (this.opinionativeResponse?.questionList) {
      this.opinionativeResponse.questionList.forEach((question: any, index: number) => {
        if (this.opinionativeSelected[index] === question.answer) {
          score++;
        }
      });
    }

    if (this.factCheckResponse?.tfList) {
      this.factCheckResponse.tfList.forEach((factCheck: any, index: number) => {
        if (this.factCheckSelected[index] === factCheck.answer) {
          score++;
        }
      });
    }

    this.totalScore = score;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json'
    });

    this.http.post<any>(`${this.apiUrl}/api/v1/generate-matching`, this.passage, { headers })
      .subscribe(response => {
        this.passageList = response.passages.psList.map((p: any) => `${p.A}, ${p.B}, ${p.C}, ${p.D}, ${p.E}`);
        const firstdPassageObject = response.passages.psList[0];  // Access the second object in psList
        
        this.passageStringList.push(firstdPassageObject.A);
        this.passageStringList.push(firstdPassageObject.B);
        this.passageStringList.push(firstdPassageObject.C);
        this.passageStringList.push(firstdPassageObject.D);
        this.passageStringList.push(firstdPassageObject.E);

        this.matchingInfoResponse = response.matchingInfo;
        this.part2Visible = true;
      });
  }

  submitMatchingAnswers(): void {
    let matchingScore = 0;

    if (this.matchingInfoResponse?.infoList) {
      this.matchingInfoResponse.infoList.forEach((info: any, index: number) => {
        if (this.matchingSelected[index] === info.serial) {
          matchingScore+=2;
        }
      });
    }

    this.finalScore = (this.totalScore || 0) + matchingScore;
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

    return this.http.post<any>(`${this.apiUrl}/api/v1/updateScore?score=${this.finalScore}`, {}, { headers });
  }
}
