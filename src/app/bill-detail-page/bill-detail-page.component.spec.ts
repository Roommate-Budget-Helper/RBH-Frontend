import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage'
import { Router } from '@angular/router';
import { StorageServiceService } from '../storage-service.service';
import { BehaviorSubject } from 'rxjs'
import ApiClient from '../api-client';
import { By } from "@angular/platform-browser";

import { BillDetailPageComponent } from './bill-detail-page.component';
// const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

const FirestoreStub = {
    collection: (name: string) => ({
        doc: (_id: string) => ({
            valueChanges: () => new BehaviorSubject({ foo: 'bar' }),
            set: (_d: any) => new Promise((resolve, _reject) => resolve()),
        }),
    }),
}

let sampleStorage = {userInfo: {id: 111111,
    full_name: "full_name",
    balance: 0,
    userName: "username",
    hashedPassword: "hashedPass",
    email: "some@gmail.com"},
    token:"some-token"};

describe('BillDetailPageComponent', () => {
    let component: BillDetailPageComponent;
    let fixture: ComponentFixture<BillDetailPageComponent>;
    let storage;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, FormsModule, ReactiveFormsModule],
            declarations: [BillDetailPageComponent],
            providers: [{ provide: AngularFireStorage, useValue: FirestoreStub }, StorageServiceService]

        }).compileComponents();

    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(BillDetailPageComponent);
        component = fixture.componentInstance;
        component.billId = 9
        component.user = sampleStorage.userInfo;
        storage = fixture.debugElement.injector.get(StorageServiceService);

        fixture.detectChanges();
        // component.billDetail = [{billId:9, userName:'lanxikk'}] as IBillDetail[]

    });
    describe('Basic Tests', () => {
        it('should create', () => {
            expect(component).toBeTruthy();
        });
        it('should show correct user info', () => {
            const greeting = fixture.debugElement.query(By.css('.bill-detail-page-user-info p')).nativeElement;
            console.info(component.user)
            expect(greeting.textContent).toContain(component.user.userName);
          });
          it('should create back button', () => {
            let backButton = fixture.debugElement.queryAll(By.css('.bill-detail-page-arrow'));
            expect(backButton).toBeTruthy();
          })
        
          it('should create user Icon', () => {
            let userIcon = fixture.debugElement.queryAll(By.css('.bill-detail-page-user-icon'));
            expect(userIcon).toBeTruthy();
          })
          it('should be able to go back', () => {
            component.handleBack()
            fixture.whenStable().then(() => {
              const navArgs = routerSpy.calls.mostRecent().args[0];
              expect(navArgs).toBe('/homedetail')
            })
          })
    })
});
