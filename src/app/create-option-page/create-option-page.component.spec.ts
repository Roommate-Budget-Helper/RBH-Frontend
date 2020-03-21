import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { CreateOptionPageComponent } from './create-option-page.component';
import { StorageServiceService } from '../storage-service.service';
import { By } from "@angular/platform-browser";

const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
let sampleStorage = {userInfo: {id: 111111,
  full_name: "full_name",
  balance: 0,
  userName: "username",
  hashedPassword: "hashedPass",
  email: "some@gmail.com"},
  token:"some-token"};
describe('CreateOptionPageComponent', () => {
  let component: CreateOptionPageComponent;
  let fixture: ComponentFixture<CreateOptionPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateOptionPageComponent ],
      providers: [
        { provide: Router,   useValue: routerSpy },
        StorageServiceService,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOptionPageComponent);
    component = fixture.componentInstance;
    component.user = sampleStorage.userInfo
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should show correct user info', () => {
    const greeting = fixture.debugElement.query(By.css('.create-option-page-container__header-user p')).nativeElement;
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
    let header = fixture.debugElement.nativeElement.querySelector('h2');
    expect(header).toBeTruthy();
      expect(header.textContent).toContain("To Create");
  })

  it('should be able to go back', () => {
    component.handleBack()
    fixture.whenStable().then(() => {
      const navArgs = routerSpy.calls.mostRecent().args[0];
      expect(navArgs).toBe('/homedetail')
    })
  })

  it('should be able to direct to one-time-bill when clicked the upper button', () => {
    component.handleOneTimeCreate()
    fixture.whenStable().then(() => {
      const navArgs = routerSpy.calls.mostRecent().args[0];
      expect(navArgs).toBe('/onetimebill')
    })
  })

  it('should be able to direct to recurring bill when clicked the lower button', () => {
    component.handleRecurringTimeCreate()
    fixture.whenStable().then(() => {
      const navArgs = routerSpy.calls.mostRecent().args[0];
      expect(navArgs).toBe('/recurringtimebill')
    })
  })


});
