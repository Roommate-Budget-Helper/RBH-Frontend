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
import { CommonModule } from '@angular/common';
import { NgxImageCompressService } from 'ngx-image-compress';
import { MatTreeModule } from '@angular/material/tree';
import { CdkTreeModule } from '@angular/cdk/tree';

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
import { HomeDetailPageComponent } from './home-detail-page/home-detail-page.component';
import { InvitationDialogComponent } from './invitation-dialog/invitation-dialog.component';
import { AddRoommateDialogComponent } from './add-roommate-dialog/add-roommate-dialog.component';
import { RemoveRoommateDialogComponent } from './remove-roommate-dialog/remove-roommate-dialog.component';
import { CreateOptionPageComponent } from './create-option-page/create-option-page.component';
import { CreateBillOneTimePageComponent } from './create-bill-one-time-page/create-bill-one-time-page.component';
import { CreateBillRecurringPageComponent } from './create-bill-recurring-page/create-bill-recurring-page.component';
import { BillDetailPageComponent } from './bill-detail-page/bill-detail-page.component';
import { PaymentHistoryPageComponent } from './payment-history-page/payment-history-page.component';
import { SharePlanDialogComponent } from './share-plan-dialog/share-plan-dialog.component';
import { RecurrentBillDialogComponent } from './recurrent-bill-dialog/recurrent-bill-dialog.component';
import { BillHistoryPageComponent } from './bill-history-page/bill-history-page.component';
import { UserHistoryPageComponent } from './user-history-page/user-history-page.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { TransferDialogComponent } from './transfer-dialog/transfer-dialog.component';
export let routes: Routes = [
    { path: '', component: StartingPageComponent },
    { path: 'login', component: LoginPageComponent },
    { path: 'register', component: RegisterPageComponent },
    { path: 'home', component: HomePageComponent },
    { path: 'createhome', component: CreateHomePageComponent },
    { path: 'homedetail', component: HomeDetailPageComponent },
    { path: 'billoption', component: CreateOptionPageComponent },
    { path: 'onetimebill', component: CreateBillOneTimePageComponent },
    { path: 'recurringtimebill', component: CreateBillRecurringPageComponent },
    { path: 'homesummary', component: PaymentHistoryPageComponent },
    // { path: 'recurringtimebill', component: CreateBillRecurringPageComponent },
    { path: 'billdetail/:id', component: BillDetailPageComponent },
    { path: 'billhistory/:id', component: BillHistoryPageComponent },
    { path: 'history', component: UserHistoryPageComponent }
];
@NgModule({
    imports: [
        AngularFireModule.initializeApp({
            apiKey: 'AIzaSyBxKfmn3xG_kldO-EGTrId_5UlRfx4Z83M',
            authDomain: 'roommate-budget-helper.firebaseapp.com',
            projectId: 'roommate-budget-helper',
            storageBucket: 'roommate-budget-helper.appspot.com'
        }),
        MatAutocompleteModule,
        AngularFireStorageModule,
        BrowserModule,
        MatTreeModule,
        CdkTreeModule,
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
    exports: [MatCheckboxModule, MatTreeModule, MatIconModule, MatButtonModule, MatAutocompleteModule],
    declarations: [
        AppComponent,
        StartingPageComponent,
        LoginPageComponent,
        RegisterPageComponent,
        CreateHomePageComponent,
        HomePageComponent,
        HomeDetailPageComponent,
        InvitationDialogComponent,
        AddRoommateDialogComponent,
        RemoveRoommateDialogComponent,
        CreateOptionPageComponent,
        CreateBillOneTimePageComponent,
        CreateBillRecurringPageComponent,
        BillDetailPageComponent,
        PaymentHistoryPageComponent,
        SharePlanDialogComponent,
        RecurrentBillDialogComponent,
        BillHistoryPageComponent,
        UserHistoryPageComponent,
        TransferDialogComponent
    ],
    providers: [{ provide: MatDialogRef, useValue: { appearance: 'fill' } }, StorageServiceService, NgxImageCompressService],
    entryComponents: [
        RegisterPageComponent,
        LoginPageComponent,
        InvitationDialogComponent,
        AddRoommateDialogComponent,
        RemoveRoommateDialogComponent,
        SharePlanDialogComponent,
        RecurrentBillDialogComponent,
        UserHistoryPageComponent,
        TransferDialogComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
