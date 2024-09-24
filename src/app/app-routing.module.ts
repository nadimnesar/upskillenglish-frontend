import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LeaderboardComponent } from './pages/leaderboard/leaderboard.component';
import { QuickPracticeComponent } from './features/quick-practice/quick-practice.component';
import { ImproveWritingComponent } from './features/improve-writing/improve-writing.component';
import { AuthGuard } from './services/auth.guard';
import { QuickPracticeAnswerComponent } from './features/quick-practice/quick-practice-answer/quick-practice-answer.component';
import { GeneratePassageComponent } from './features/generate-passage/generate-passage.component';
import { GenerateQuestionComponent } from './features/generate-question/generate-question.component';
import { ImproveListeningComponent } from './features/improve-listening/improve-listening.component';
import { ReadingTestComponent } from './features/reading-test/reading-test.component';
import { WritingTestComponent } from './features/writing-test/writing-test.component';
import { ListeningTestComponent } from './features/listening-test/listening-test.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      title: 'UpskillEnglish | AI-powered English Skill Enhancer'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'UpskillEnglish | Login'
    }
  },
  {
    path: 'signup',
    component: SignupComponent,
    data: {
      title: 'UpskillEnglish | Signup'
    }
  },
  {
    path: 'leaderboard',
    component: LeaderboardComponent,
    data: {
      title: 'UpskillEnglish | Leaderboard'
    }
  },
  {
    path: 'quick-test',
    component: QuickPracticeComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'UpskillEnglish | Quick Test'
    }
  },
  {
    path: 'improve-writing',
    component: ImproveWritingComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'UpskillEnglish | Improve Writing'
    }
  },
  {
    path: 'quick-test/answer',
    component: QuickPracticeAnswerComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'UpskillEnglish | Quick Test | Answer'
    }
  },
  {
    path: 'passage-learning-lab',
    component: GeneratePassageComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'UpskillEnglish | Passage Learning Lab'
    }
  },
  {
    path: 'improve-listening',
    component: ImproveListeningComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'UpskillEnglish | Improve Listening'
    }
  },
  {
    path: 'question-practicing-hub',
    component: GenerateQuestionComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'UpskillEnglish | Question Practicing Hub'
    }
  },
  {
    path: 'reading-test',
    component: ReadingTestComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'UpskillEnglish | Reading Test'
    }
  },
  {
    path: 'writing-test',
    component: WritingTestComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'UpskillEnglish | Writing Test'
    }
  },
  {
    path: 'listening-test',
    component: ListeningTestComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'UpskillEnglish | Listening Test'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
