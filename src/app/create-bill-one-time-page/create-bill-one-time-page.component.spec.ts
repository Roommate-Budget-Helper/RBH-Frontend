import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef, MatInputModule, MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CreateBillOneTimePageComponent } from './create-bill-one-time-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { Router } from '@angular/router';
import { StorageServiceService } from '../storage-service.service';
import { BehaviorSubject } from 'rxjs';
import ApiClient from '../api-client';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

export class MdDialogMock {
    // When the component calls this.dialog.open(...) we'll return an object
    // with an afterClosed method that allows to subscribe to the dialog result observable.
    open() {
        return {
            afterClosed: () => of(),
            updatePosition: () => {}
        };
    }
}
const FirestoreStub = {
    collection: (name: string) => ({
        doc: (_id: string) => ({
            valueChanges: () => new BehaviorSubject({ foo: 'bar' }),
            set: (_d: any) => new Promise((resolve, _reject) => resolve())
        })
    })
};
let sampleGetHome = [
    { id: 0, full_name: 'home0', admin_name: 'admin_name0', admin_id: 0, roommates: 'roommates0' },
    { id: 1, full_name: 'home1', admin_name: 'admin_name1', admin_id: 1, roommates: 'roommates1' }
];
let sampleStorage = {
    userInfo: {
        id: 111111,
        full_name: 'full_name',
        balance: 0,
        userName: 'username',
        hashedPassword: 'hashedPass',
        email: 'some@gmail.com'
    },
    token: 'some-token'
};
describe('CreateBillOneTimePageComponent', () => {
    let component: CreateBillOneTimePageComponent;
    let fixture: ComponentFixture<CreateBillOneTimePageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, FormsModule, ReactiveFormsModule, MatInputModule, MatDialogModule, BrowserAnimationsModule],
            declarations: [CreateBillOneTimePageComponent],
            providers: [
                StorageServiceService,
                { provide: MatDialog, useValue: MdDialogMock },
                { provide: MatDialogRef, useValue: {} },
                { provide: AngularFireStorage, useValue: FirestoreStub }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CreateBillOneTimePageComponent);
        component = fixture.componentInstance;
        component.user = sampleStorage.userInfo;
        component.home = sampleGetHome[0];
        fixture.detectChanges();
    });
    describe('basic test', () => {
        it('should create', () => {
            expect(component).toBeTruthy();
        });
        it('should show correct user info', () => {
            const greeting = fixture.debugElement.query(By.css('.create-bill-one-container__header-user p')).nativeElement;

            expect(greeting.textContent).toContain(component.user.userName);
        });

        it('should create back button', () => {
            let backButton = fixture.debugElement.queryAll(By.css('.home-detail-page-back-arrow'));
            expect(backButton).toBeTruthy();
        });

        it('should create user Icon', () => {
            let userIcon = fixture.debugElement.queryAll(By.css('.home-detail-page-user-icon'));
            expect(userIcon).toBeTruthy();
        });

        it('should create correct header', () => {
            let header = fixture.debugElement.nativeElement.querySelector('h3');
            expect(header).toBeTruthy();
            expect(header.textContent).toContain('One Time Bill');
        });
    });
    // describe('form validation test',()=>{
    //     beforeEach(async(() => {
    //         // component.oneTimeBillForm.setValue({billname: 'test bill', description:'test description', amount: 0, receipt: '', splitMethod:'Percentage', addDynamicElement:''});
    //         // expect(component.oneTimeBillForm.invalid).toBeTruthy();
    //       }));
    //       it('should not show mat-error when first load', () => {
    //         let compiled = fixture.debugElement.nativeElement;
    //         expect(compiled.querySelector('mat-error')).toBeFalsy();
    //       });
    //       it('should be invalid when empty billname', () => {
    //         component.oneTimeBillForm.controls['billname'].patchValue("");
    //         expect(component.oneTimeBillForm.invalid).toBeTruthy();
    //       });
    //       it('should be invalid when empty description', () => {
    //         component.oneTimeBillForm.controls['description'].patchValue("");
    //         expect(component.oneTimeBillForm.invalid).toBeTruthy();
    //       });
    // })
});
