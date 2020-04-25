import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateBillRecurringPageComponent } from './create-bill-recurring-page.component';
import { MatDialog, MatDialogRef, MatInputModule,MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule ,FormBuilder } from '@angular/forms';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage'
import { Router } from '@angular/router';
import { StorageServiceService } from '../storage-service.service';
import { BehaviorSubject } from 'rxjs'
import ApiClient from '../api-client';
import { By } from "@angular/platform-browser";
import { of} from 'rxjs';
const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

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
let sampleStorage = {userInfo: {id: 111111,
  full_name: "full_name",
  balance: 0,
  userName: "username",
  hashedPassword: "hashedPass",
  email: "some@gmail.com"},
  token:"some-token"};
let sampleGetHome = [{id: 0, full_name: "home0", admin_name: "admin_name0", admin_id: 0, roommates: "roommates0"},
{id: 1, full_name: "home1", admin_name: "admin_name1", admin_id: 1, roommates: "roommates1"}]
describe('CreateBillRecurringPageComponent', () => {
  let component: CreateBillRecurringPageComponent;
  let fixture: ComponentFixture<CreateBillRecurringPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule, ReactiveFormsModule,MatInputModule,MatDialogModule,BrowserAnimationsModule],
      declarations: [ CreateBillRecurringPageComponent ],
      providers: [ StorageServiceService, { provide: MatDialog,   useValue: MdDialogMock},
        { provide: MatDialogRef,   useValue: {}},
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBillRecurringPageComponent);
    component = fixture.componentInstance;
    component.user = sampleStorage.userInfo
        component.home = sampleGetHome[0]
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should show correct user info', () => {
    const greeting = fixture.debugElement.query(By.css('.create-recurring-container__header-user')).nativeElement;
    console.info(component.user)
    expect(greeting.textContent).toContain(component.user.userName);
  });

  it('should create back button', () => {
    let backButton = fixture.debugElement.queryAll(By.css('.home-detail-page-back-arrow'));
    expect(backButton).toBeTruthy();
  })

  it('should create user Icon', () => {
    let userIcon = fixture.debugElement.queryAll(By.css('.home-detail-page-user-icon'));
    expect(userIcon).toBeTruthy();
  })

  it('should create correct header', () => {
    let header = fixture.debugElement.nativeElement.querySelector('h3');
    expect(header).toBeTruthy();
      expect(header.textContent).toContain("Recurring Bill");
  })
  it('should be able to go back', () => {
    component.handleBack()
    fixture.whenStable().then(() => {
      const navArgs = routerSpy.calls.mostRecent().args[0];
      expect(navArgs).toBe('/createoption')
    })
  })
});
