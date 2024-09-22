import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../environment';

interface SolutionDto {
  question: string;
  correctAnswer: string;
  userAnswer: string;
}

interface ScoreDto {
  score: number;
}

@Component({
  selector: 'app-writing-test',
  templateUrl: './writing-test.component.html',
  styleUrls: ['./writing-test.component.scss']
})
export class WritingTestComponent implements OnInit {
  year1Data: any[] = [];
  year2Data: any[] = [];
  year1Label: string = '';
  year2Label: string = '';
  writingPrompt: string = '';
  correctAnswer: string = '';
  userAnswer: string = '';
  score: number | null = null;
  essayTopic: string = '';
  userEssay: string = '';
  essayAnswer: string = '';
  essayScore: number | null = null;
  totalScore: number | null = null;
  essaySectionVisible: boolean = false;
  loading: boolean = true;
  apiUrl: string = environment.backendUrl + '/api';
  view: [number, number] = [350, 350];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchGraph();
    this.userAnswer = "";
    this.userEssay = "";
  }

  fetchGraph(): void {
    const token = localStorage.getItem('jwt');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    this.http.get(`${this.apiUrl}/v1/generateGraph`, { headers }).subscribe({
      next: (chartData: any) => {
        this.year1Data = chartData.labels.map((label: string, index: number) => ({
          name: label,
          value: chartData.year1Values[index],
        }));

        this.year2Data = chartData.labels.map((label: string, index: number) => ({
          name: label,
          value: chartData.year2Values[index],
        }));

        this.year1Label = chartData.year1Label;
        this.year2Label = chartData.year2Label;
        this.writingPrompt = chartData.writingPrompt;
        this.correctAnswer = chartData.correctAnswer;
      },
      error: (error: any) => {
        console.error('Error fetching graph:', error);
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  submitPieChartAnswer(): void {
    const token = localStorage.getItem('jwt');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    const solutionDto: SolutionDto = {
      question: this.writingPrompt,
      correctAnswer: this.correctAnswer,
      userAnswer: this.userAnswer,
    };

    this.http.post<ScoreDto>(`${this.apiUrl}/v1/writtenTestSolutionSubmit`, solutionDto, { headers }).subscribe({
      next: (scoreDto: ScoreDto) => {
        this.score = scoreDto.score;
        this.essaySectionVisible = true;
        this.fetchEssayTopic();
      },
      error: (error: any) => {
        console.error('Error submitting answer:', error);
      },
    });
  }

  fetchEssayTopic(): void {
    const token = localStorage.getItem('jwt');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    this.http.get(`${this.apiUrl}/v1/generatePassageTest`, { headers }).subscribe({
      next: (essayData: any) => {
        this.essayTopic = essayData.topic;
        this.essayAnswer = essayData.answer;
      },
      error: (error: any) => {
        console.error('Error fetching essay topic:', error);
      },
    });
  }

  submitEssayAnswer(): void {
    const token = localStorage.getItem('jwt');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    const solutionDto: SolutionDto = {
      question: this.essayTopic,
      correctAnswer: this.essayAnswer,
      userAnswer: this.userEssay,
    };

    this.http.post<ScoreDto>(`${this.apiUrl}/v1/writtenTestSolutionSubmit`, solutionDto, { headers }).subscribe({
      next: (scoreDto: ScoreDto) => {
        this.essayScore = scoreDto.score;
        this.totalScore = (this.score ?? 0) + (this.essayScore ?? 0);
        this.redirectToHome();
      },
      error: (error: any) => {
        console.error('Error submitting essay:', error);
      },
    });
  }

  redirectToHome(): void {
    setTimeout(() => {
      window.location.href = '/';
    }, 5000);
  }
}
