import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef} from '@angular/material';

import { CreateBillOneTimePageComponent } from './create-bill-one-time-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage'
import { Router } from '@angular/router';
import { StorageServiceService } from '../storage-service.service';
import { BehaviorSubject } from 'rxjs'
import ApiClient from '../api-client';
import { By } from "@angular/platform-browser";
import { of} from 'rxjs';

export class MdDialogMock {
    // When the component calls this.dialog.open(...) we'll return an object
    // with an afterClosed method that allows to subscribe to the dialog result observable.
    open(){
      return {
        afterClosed: () => of(),
        updatePosition: () => {}
      }
    };
  };
  const FirestoreStub = {
    collection: (name: string) => ({
        doc: (_id: string) => ({
            valueChanges: () => new BehaviorSubject({ foo: 'bar' }),
            set: (_d: any) => new Promise((resolve, _reject) => resolve()),
        }),
    }),
}
let sampleGetHome = [{id: 0, full_name: "home0", admin_name: "admin_name0", admin_id: 0, roommates: "roommates0"},
{id: 1, full_name: "home1", admin_name: "admin_name1", admin_id: 1, roommates: "roommates1"}]
let sampleStorage = {userInfo: {id: 111111,
    full_name: "full_name",
    balance: 0,
    userName: "username",
    hashedPassword: "hashedPass",
    email: "some@gmail.com"},
    token:"some-token"};
fdescribe('CreateBillOneTimePageComponent', () => {
    let component: CreateBillOneTimePageComponent;
    let fixture: ComponentFixture<CreateBillOneTimePageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, FormsModule, ReactiveFormsModule],
            declarations: [CreateBillOneTimePageComponent],
            providers: [ StorageServiceService, { provide: MatDialog,   useValue: MdDialogMock},
                { provide: MatDialogRef,   useValue: {}},
                { provide: AngularFireStorage, useValue: FirestoreStub }]

        }).compileComponents();

    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CreateBillOneTimePageComponent);
        component = fixture.componentInstance;
        component.user = sampleStorage.userInfo
        component.home = sampleGetHome[0]
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should show correct user info', () => {
        const greeting = fixture.debugElement.query(By.css('.create-bill-one-container__header-user p')).nativeElement;
        console.info(component.user)
        expect(greeting.textContent).toContain(component.user.userName);
      });
});
