import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { StartingPageComponent } from './starting-page/starting-page.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot([
            { path: '', component: StartingPageComponent },
            { path: 'login', component: LoginPageComponent },
            { path: 'register', component: RegisterPageComponent}
        ])
    ],
    declarations: [AppComponent, StartingPageComponent, LoginPageComponent, RegisterPageComponent],
    // providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
