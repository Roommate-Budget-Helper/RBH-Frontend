import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillHistoryPageComponent } from './bill-history-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage'
import { Router } from '@angular/router';
import { StorageServiceService } from '../storage-service.service';
import { BehaviorSubject } from 'rxjs'
import ApiClient from '../api-client';

import { By } from "@angular/platform-browser";
let sampleStorage = {userInfo: {id: 111111,
  full_name: "full_name",
  balance: 0,
  userName: "username",
  hashedPassword: "hashedPass",
  email: "some@gmail.com"},
  token:"some-token"};
describe('BillHistoryPageComponent', () => {
  let component: BillHistoryPageComponent;
  let fixture: ComponentFixture<BillHistoryPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ BillHistoryPageComponent ],
      providers: [ StorageServiceService]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillHistoryPageComponent);
    component = fixture.componentInstance;
    component.user = sampleStorage.userInfo;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should show correct user info', () => {
    const greeting = fixture.debugElement.query(By.css('.bill-history-user-info p')).nativeElement;
    console.info(component.user)
    expect(greeting.textContent).toContain(component.user.userName);
  });
});
