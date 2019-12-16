import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { StartingPageComponent } from './starting-page/starting-page.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StorageServiceModule } from 'ngx-webstorage-service';
import { StorageServiceService } from './storage-service.service';
import { RouterTestingModule } from '@angular/router/testing';
import {CommonModule } from '@angular/common';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatDialogModule,
    MatDialogRef
} from '@angular/material';
import { CreateHomePageComponent } from './create-home-page/create-home-page.component';
import { HomePageComponent } from './home-page/home-page.component';
export let routes:Routes = [
    { path: '', component: StartingPageComponent },
    { path: 'login', component: LoginPageComponent },
    { path: 'register', component: RegisterPageComponent },
    { path: 'home', component: HomePageComponent },
    { path: 'createhome', component: CreateHomePageComponent }
];
@NgModule({
    imports: [
        BrowserModule,
        StorageServiceModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,
        MatRadioModule,
        MatSelectModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatToolbarModule,
        MatListModule,
        MatGridListModule,
        MatCardModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatMenuModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(routes),
        RouterTestingModule,
        CommonModule
    ],
    declarations: [
        AppComponent,
        StartingPageComponent,
        LoginPageComponent,
        RegisterPageComponent,
        CreateHomePageComponent,
        HomePageComponent
    ],
    providers: [{ provide: MatDialogRef, useValue: {} }, StorageServiceService],
    entryComponents: [RegisterPageComponent, LoginPageComponent],
    bootstrap: [AppComponent]
})
export class AppModule {}
