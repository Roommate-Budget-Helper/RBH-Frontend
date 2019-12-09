import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { StartingPageComponent } from './starting-page/starting-page.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import {
    MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatFormFieldModule,
    MatInputModule, MatRadioModule, MatSelectModule, MatSliderModule,
    MatSlideToggleModule, MatToolbarModule, MatListModule, MatGridListModule,
    MatCardModule, MatIconModule, MatProgressSpinnerModule, MatMenuModule,
    MatDialogModule,MatDialogRef
  } from '@angular/material';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatFormFieldModule,
        MatInputModule, MatRadioModule, MatSelectModule, MatSliderModule,
        MatSlideToggleModule, MatToolbarModule, MatListModule, MatGridListModule,
        MatCardModule, MatIconModule, MatProgressSpinnerModule, MatDialogModule,MatMenuModule,
        BrowserAnimationsModule,
        RouterModule.forRoot([
            { path: '', component: StartingPageComponent },
            { path: 'login', component: LoginPageComponent },
            { path: 'register', component: RegisterPageComponent}
        ])
    ],
    declarations: [AppComponent, StartingPageComponent, LoginPageComponent, RegisterPageComponent],
    providers: [
        { provide: MatDialogRef, useValue: {} },
        ],
    entryComponents: [
        RegisterPageComponent,
        LoginPageComponent,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
