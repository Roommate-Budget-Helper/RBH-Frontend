import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import ApiClient from '../api-client';

import { HomeDetailPageComponent } from './home-detail-page.component';
import { StorageServiceService } from '../storage-service.service';
import { MatDialog, MatDialogRef, MatProgressSpinnerModule} from '@angular/material';
import { of} from 'rxjs';
import { By } from "@angular/platform-browser";

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
let sampleGetHome = [{id: 0, full_name: "home0", admin_name: "admin_name0", admin_id: 0, roommates: "roommates0 "},
{id: 1, full_name: "home1", admin_name: "admin_name1", admin_id: 1, roommates: "roommates1"}];
let sampleStorage = {userInfo: {id: 111111,
  full_name: "full_name",
  balance: 0,
  userName: "username",
  hashedPassword: "hashedPass",
  email: "some@gmail.com"},
  token:"some-token"};
describe('HomeDetailPageComponent', () => {
  let component: HomeDetailPageComponent;
  let fixture: ComponentFixture<HomeDetailPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeDetailPageComponent ],
      providers: [
        { provide: Router,   useValue: routerSpy },
        StorageServiceService,
        { provide: MatDialog,   useValue: MdDialogMock},
        { provide: MatDialogRef,   useValue: {}}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeDetailPageComponent);
    component = fixture.componentInstance;
    component.user = sampleStorage.userInfo
    component.home = sampleGetHome[0]
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should show correct user info', () => {
    const greeting = fixture.debugElement.query(By.css('.home-detail-page-user-info p')).nativeElement;
    console.info(component.home)
    expect(greeting.textContent).toContain(component.user.userName);
  });
  it('should create back button', () => {
    let backButton = fixture.debugElement.queryAll(By.css('.home-detail-page-arrow'));
    expect(backButton).toBeTruthy();
  })

  it('should create user Icon', () => {
    let userIcon = fixture.debugElement.queryAll(By.css('.home-detail-page-user-icon'));
    expect(userIcon).toBeTruthy();
  })

  it('should create correct header', () => {
    let header = fixture.debugElement.nativeElement.querySelector('h1');
    expect(header).toBeTruthy();
      expect(header.textContent).toContain(component.home.full_name);
  })

  it('should be able to go back', () => {
    component.handleBack()
    fixture.whenStable().then(() => {
      const navArgs = routerSpy.calls.mostRecent().args[0];
      expect(navArgs).toBe('/home')
    })
  })


});
