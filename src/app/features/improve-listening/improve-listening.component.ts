import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-improve-listening',
  templateUrl: './improve-listening.component.html',
  styleUrl: './improve-listening.component.scss'
})
export class ImproveListeningComponent {
  listeningText: string | null = null;
  translation: string | null = null;
  audioSrc: string | null = null;
  showText: boolean = false;
  showTranslation: boolean = false;
  loading: boolean = true;

  @ViewChild('audioPlayer') audioPlayer!: ElementRef<HTMLAudioElement>;

  private apiUrl = 'http://localhost:8080/api/v1';
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
          this.generateListeningAudio();
        },
        error: error => {
          console.error('Error generating text:', error);
          this.loading = false;
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
          this.loading = false;
        }
      });
  }

  toggleViewText(): void {
    this.showText = !this.showText;
  }

  toggleTranslation(): void {
    if (this.showTranslation) {
      this.translation = null;
    } else if (this.listeningText && !this.translation) {
      this.translatePassage(this.listeningText);
    }
    this.showTranslation = !this.showTranslation;
  }

  private translatePassage(text: string): void {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });

    this.http.post<{ passage: string }>(`${this.apiUrl}/translate-passage`, { text }, { headers })
      .subscribe({
        next: response => {
          this.translation = response.passage;
        },
        error: error => {
          console.error('Error translating text:', error);
        }
      });
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
