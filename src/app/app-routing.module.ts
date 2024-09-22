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
import { ThreeInOneTestComponent } from './features/three-in-one-test/three-in-one-test.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'leaderboard', component: LeaderboardComponent },
  { path: 'quick-test', component: QuickPracticeComponent, canActivate: [AuthGuard] },
  { path: 'improve-writing', component: ImproveWritingComponent, canActivate: [AuthGuard] },
  { path: 'quick-test/answer', component: QuickPracticeAnswerComponent, canActivate: [AuthGuard] },
  { path: 'passage-learning-lab', component: GeneratePassageComponent, canActivate: [AuthGuard] },
  { path: 'improve-listening', component: ImproveListeningComponent, canActivate: [AuthGuard] },
  { path: 'question-practicing-hub', component: GenerateQuestionComponent, canActivate: [AuthGuard] },
  { path: 'reading-test', component: ReadingTestComponent, canActivate: [AuthGuard] },
  { path: 'writing-test', component: WritingTestComponent, canActivate: [AuthGuard] },
  { path: 'listening-test', component: ListeningTestComponent, canActivate: [AuthGuard] },
  { path: 'three-in-one-test', component: ThreeInOneTestComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
