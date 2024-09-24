import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { environment } from '../../environment';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-listening-test',
  templateUrl: './listening-test.component.html',
  styleUrl: './listening-test.component.scss'
})
export class ListeningTestComponent {
  listeningText: string | null = null;
  translation: string | null = null;
  audioSrc: string | null = null;
  showText: boolean = false;
  showTranslation: boolean = false;
  loading: boolean = true;
  scoreFlag: boolean = false;

  mcqResponse: any = null;
  opinionativeResponse: any = null;
  factCheckResponse: any = null;

  mcqSelected: string[] = [];
  opinionativeSelected: string[] = [];
  factCheckSelected: string[] = [];
  totalScore: number | null = 0;


  matchingInfoResponse: any = null;
  matchingSelected: string[] = [];
  finalScore: number | null = null;

  @ViewChild('audioPlayer') audioPlayer!: ElementRef<HTMLAudioElement>;

  private apiUrl = environment.backendUrl + '/api/v1';
  private token = localStorage.getItem('jwt') || '';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.generateListeningText();
  }

  private generateListeningText(): void {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    this.http.get<{ text: string }>(`${this.apiUrl}/generate-listening-text`, { headers })
      .subscribe({
        next: response => {
          this.listeningText = response.text;
          console.log(this.listeningText);
          this.generateListeningAudio();
          this.generateQuestions();
        },
        error: error => {
          console.error('Error generating text:', error);
        }
      });
  }

  private generateListeningAudio(): void {
    if (!this.listeningText) return;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });

    this.http.post(`${this.apiUrl}/generate-listening-audio`, { text: this.listeningText }, { headers, responseType: 'arraybuffer' })
      .subscribe({
        next: response => {
          const audioBlob = new Blob([response], { type: 'audio/mp3' });
          this.audioSrc = URL.createObjectURL(audioBlob);
          this.loading = false;
        },
        error: error => {
          console.error('Error generating audio:', error);
        }
      });
  }

  private generateQuestions(): void {
    if (!this.listeningText) return;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });

    this.http.post<{ mcq: any, opinionative: any, factCheck: any }>(
      `${this.apiUrl}/generate-listening-test-qs`, { text: this.listeningText }, { headers }).subscribe({
        next: response => {
          this.mcqResponse = response.mcq;
          this.opinionativeResponse = response.opinionative;
          this.factCheckResponse = response.factCheck;
          console.log('Questions generated:', response);
        },
        error: error => {
          console.log(this.listeningText);
          console.error('Error generating questions:', error);
        }
      });
  }

  toggleViewText(): void {
    this.showText = !this.showText;
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
    this.scoreFlag = true;
    this.totalScore = score;
    this.updateScore().subscribe({
      error: (error: any) => {
        console.error('Error updaing score:', error);
      },
      complete: () => {
        console.log('Score update done!');
        this.redirectToHome();
      }
    });
  }

  updateScore(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(`${this.apiUrl}/updateScore?score=${this.totalScore}`, {}, { headers });
  }

  redirectToHome(): void {
    setTimeout(() => {
      window.location.href = '/';
    }, 3000);
  }

  toggleAudio(): void {
    const audio = this.audioPlayer.nativeElement;
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  }

  resetAudio(): void {
    const audio = this.audioPlayer.nativeElement;
    audio.currentTime = 0;
  }
}
