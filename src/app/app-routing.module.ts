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

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'leaderboard', component: LeaderboardComponent },
  { path: 'feature/quick-practice', component: QuickPracticeComponent, canActivate: [AuthGuard] },
  { path: 'feature/improve-writing', component: ImproveWritingComponent, canActivate: [AuthGuard] },
  { path: 'feature/quick-practice/answer', component: QuickPracticeAnswerComponent, canActivate: [AuthGuard] },
  { path: 'feature/generate-passage', component: GeneratePassageComponent, canActivate: [AuthGuard] },
  { path: 'feature/improve-listening', component: ImproveListeningComponent, canActivate: [AuthGuard] },
  { path: 'feature/generate-question', component: GenerateQuestionComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
