import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import ApiClient from '../api-client';
import { UserHistoryPageComponent } from './user-history-page.component';
import {CdkTreeModule} from '@angular/cdk/tree';
import {MatIconModule} from '@angular/material';
import { Router } from '@angular/router';
import { StorageServiceService } from '../storage-service.service';
import { MatTreeModule} from '@angular/material/tree';
import { By } from "@angular/platform-browser";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const sampleStorage = {userInfo: {id: 111111,
  full_name: "full_name",
  balance: 0,
  userName: "username",
  hashedPassword: "hashedPass",
  email: "some@gmail.com"},
  token:"some-token"};
const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

let sampleGetHistory = [{userName: 'xixi', balance: 20, billCount: 1, homeCount: 0},
{userName: 'zhuzhu', balance: 20, billCount: 2, homeCount: 0}];
describe('UserHistoryPageComponent', () => {
  let component: UserHistoryPageComponent;
  let fixture: ComponentFixture<UserHistoryPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserHistoryPageComponent ],
      imports: [CdkTreeModule, MatTreeModule, MatIconModule, MatProgressSpinnerModule],
      providers:[
        { provide: Router,   useValue: routerSpy },
        StorageServiceService
      ]
    })
    .compileComponents();
  }));

  
  describe('basic tests', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(UserHistoryPageComponent);
      component = fixture.componentInstance;
      component.user = sampleStorage.userInfo;
      component.loaded = true
      fixture.detectChanges();
    });
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  
    it('should create back button', () => {
      let backButton = fixture.debugElement.queryAll(By.css('.user-history-page-arrow'));
      expect(backButton).toBeTruthy();
    })

    it('should create user Icon', () => {
      let userIcon = fixture.debugElement.queryAll(By.css('.user-history-page-user-icon'));
      expect(userIcon).toBeTruthy();
    })

    it('should create correct header', () => {
      let header = fixture.debugElement.nativeElement.querySelector('h3');
      expect(header).toBeTruthy();
        expect(header.textContent).toContain("Summary");
    })

    it('should create correct greeting', () => {
      let greeting = fixture.debugElement.query(By.css('.user-history-page-user-info p')).nativeElement
      expect(greeting).toBeTruthy()
      expect(greeting.textContent).toContain(sampleStorage.userInfo.userName)
    })
  })

  describe('functionality test', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(UserHistoryPageComponent);
      spyOnProperty(ApiClient, 'history').and.returnValue({ getHistory: () => Promise.resolve(sampleGetHistory)});

      component = fixture.componentInstance;
      component.user = sampleStorage.userInfo;
      
      fixture.detectChanges();
    });

    //
    it('should be able to go back', () => {
      component.handleBack()
      fixture.whenStable().then(() => {
        const navArgs = routerSpy.calls.mostRecent().args[0];
        expect(navArgs).toBe('/home')
      })
    })
    



  })

  


  
});
