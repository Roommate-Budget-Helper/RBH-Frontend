import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginPageComponent } from './login-page.component';
import { StorageServiceService } from '../storage-service.service';
import { async, ComponentFixture, TestBed} from '@angular/core/testing';
import { Router } from '@angular/router';
import ApiClient from '../api-client';
import { By } from "@angular/platform-browser";

const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
const storageSpy = jasmine.createSpyObj('StorageServiceService', ['storeOnLocalStorage', 'getLocalStorage'])
// // ApiClient.auth.login = jasmine.createSpy()
// const httpClient = ApiClient.auth
// const ApiClientSpy: { get: jasmine.Spy } = jasmine.createSpyObj('ApiClient', ['login']);

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  let router;
  let button;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule],
      declarations: [ LoginPageComponent ],
      providers: [{ provide: Router,   useValue: routerSpy }, StorageServiceService]
    })
    .compileComponents();
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  describe('Basic Tests', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should render title in a h1 tag', () => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('h1').textContent).toContain('Log In');
    });  

    it('should have options(username and passwords) initialized to be ""', () => {
      expect(component.options['username']).toBe("");
      expect(component.options['password']).toBe("");
    });  
  });

  describe('Function Tests', () => {
    describe('Basic Tests for Functions', () => {
      let username = "testusername";
      let password = "testpassword";
      beforeEach(async(() => {
        fixture = TestBed.createComponent(LoginPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));

      it("should show alert with correct content when handleSubmit() called with empty username", () => {
        spyOn(window, "alert");
        component.options['password'] = password;
        component.handleSubmit();
        expect(window.alert).toHaveBeenCalledWith("please enter username or password!");
      });  

      it("should show alert with correct content when handleSubmit() called with empty password", () => {
          spyOn(window, "alert");
          component.options['username'] = username;
          component.handleSubmit();
          expect(window.alert).toHaveBeenCalledWith("please enter username or password!");
      });  

      it("should show alert with correct content when handleSubmit() called with empty username and password", () => {
        spyOn(window, "alert");
        component.handleSubmit();
        expect(window.alert).toHaveBeenCalledWith("please enter username or password!");
      });  

      it("should not show alert when handleSubmit() with empty username and password", () => {
        spyOnProperty(ApiClient, 'auth').and.returnValue({ login: () => Promise.resolve({userInfo: {id: 111111,
          full_name: "full_name",
          balance: 0,
          userName: "username",
          hashedPassword: "hashedPass",
          email: "some@gmail.com"},
          token:"some-token"})})
        spyOn(window, "alert");
        component.options['username'] = username;
        component.options['password'] = password;
        component.handleSubmit();
        expect(window.alert).not.toHaveBeenCalledWith("wrong credential combination");
      }); 

      it("should nav to /home", ()=>{
         spyOnProperty(ApiClient, 'auth').and.returnValue({ login: () => Promise.resolve({userInfo: {id: 111111,
          full_name: "full_name",
          balance: 0,
          userName: "username",
          hashedPassword: "hashedPass",
          email: "some@gmail.com"},
          token:"some-token"})})
        router = fixture.debugElement.injector.get(Router);
        const spy = router.navigateByUrl as jasmine.Spy;
        component.options['username'] = username;
        component.options['password'] = password;
        component.handleSubmit();
        fixture.whenStable().then(() => {
          const navArgs = spy.calls.mostRecent().args[0];
          expect(navArgs).toBe('/home', 'should nav to home page');
        });
      });

      it("should store to local storage if result is not empty", ()=>{
        spyOnProperty(ApiClient, 'auth').and.returnValue({ login: () => Promise.resolve({userInfo: {id: 111111,
          full_name: "full_name",
          balance: 0,
          userName: "exampleusername",
          hashedPassword: "hashedPass",
          email: "some@gmail.com"},
          token:"some-token"})})
        let storage = fixture.debugElement.injector.get(StorageServiceService);
        component.options['username'] = username;
        component.options['password'] = password;
        component.handleSubmit();
        const STORAGE_KEY = "local_userInfo"
        console.log("!!!!!!!!!!!!!"+storage.getLocalStorage(STORAGE_KEY).userInfo.hashedPassword);
        expect(storage.getLocalStorage(STORAGE_KEY).token).toBe("some-token")
      });


      it('should call handleBack()', () => {
        spyOn(component, 'handleBack');
        component.handleBack();
        expect(component.handleBack).toHaveBeenCalled();
      });

      it('should call handleBack() and redirect to / ', () => {
        router = fixture.debugElement.injector.get(Router);
        const spy = router.navigateByUrl as jasmine.Spy;
        component.handleBack();
        fixture.whenStable().then(() => {
            const navArgs = spy.calls.mostRecent().args[0];
            expect(navArgs).toBe('/', 'should nav to starting page');
        });
      });
    });
  });

  // describe('Button Tests', () => {
  //   beforeEach(() => {
  //   });
    
    describe('Arrow Button Tests', () => {
      beforeEach(() => {
        fixture = TestBed.createComponent(LoginPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        button = fixture.debugElement.queryAll(By.css('.login-page-arrow'))[0].nativeElement;
      });

      it('should be created', () => {
        expect(button).toBeTruthy();
      });

      it('should nav to starting page', () => {
        router = fixture.debugElement.injector.get(Router);
        const spy = router.navigateByUrl as jasmine.Spy;
        button.click();
        fixture.whenStable().then(() => {
            const navArgs = spy.calls.mostRecent().args[0];
            expect(navArgs).toBe('/', 'should nav to starting page');
        });
      });
    });

    describe('Submit Button Tests', () => {
      beforeEach(() => {
        fixture = TestBed.createComponent(LoginPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        button = fixture.debugElement.queryAll(By.css('button'))[0].nativeElement;
      });

      it('should be created', () => {
        expect(button).toBeTruthy();
      });

      it('should have correct text content', () => {
        expect(button.textContent).toContain('Log in');
      });

      // it('should nav to /home', () => {
      // });
    });
});
  