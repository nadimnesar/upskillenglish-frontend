import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { LeaderboardComponent } from './pages/leaderboard/leaderboard.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { QuickPracticeComponent } from './features/quick-practice/quick-practice.component';
import { ImproveWritingComponent } from './features/improve-writing/improve-writing.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { QuickPracticeAnswerComponent } from './features/quick-practice/quick-practice-answer/quick-practice-answer.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    HomeComponent,
    LeaderboardComponent,
    LoginComponent,
    SignupComponent,
    QuickPracticeComponent,
    ImproveWritingComponent,
    QuickPracticeAnswerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [provideHttpClient(withInterceptorsFromDi()), provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule { }
