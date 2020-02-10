import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginPageComponent } from './login-page.component';
import { StorageServiceService } from '../storage-service.service';
import { async, ComponentFixture, TestBed} from '@angular/core/testing';
import { Router } from '@angular/router';
import ApiClient from '../api-client';
import { By } from "@angular/platform-browser";

const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
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
    beforeEach(async(( )=> {
      fixture = TestBed.createComponent(LoginPageComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }));
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
      let sampleCorrect = {userInfo: {id: 111111,
        full_name: "full_name",
        balance: 0,
        userName: "username",
        hashedPassword: "hashedPass",
        email: "some@gmail.com"},
        token:"some-token"};
      beforeEach((() => {
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

      it("should not show alert when handleSubmit() with correct information provided", () => {
        spyOnProperty(ApiClient, 'auth').and.returnValue({ login: () => Promise.resolve(sampleCorrect)})
        spyOn(window, "alert");
        component.options['username'] = username;
        component.options['password'] = password;
        component.handleSubmit();
        expect(window.alert).not.toHaveBeenCalledWith("wrong credential combination");
      }); 

      it("should store token to local storage if result is not empty", ()=>{
        spyOnProperty(ApiClient, 'auth').and.returnValue({ login: () => Promise.resolve(sampleCorrect)})
        let storage = fixture.debugElement.injector.get(StorageServiceService);
        component.options['username'] = username;
        component.options['password'] = password;
        component.handleSubmit();
        const STORAGE_KEY = "local_userInfo";
        expect(storage.getLocalStorage(STORAGE_KEY)).toEqual(sampleCorrect);
      });
    });

    describe('Function Routing Tests', () => {
      let username = "testusername";
      let password = "testpassword";
      let sampleCorrect = {userInfo: {id: 111111,
        full_name: "full_name",
        balance: 0,
        userName: "username",
        hashedPassword: "hashedPass",
        email: "some@gmail.com"},
        token:"some-token"};
      beforeEach((() => {
        fixture = TestBed.createComponent(LoginPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));

      it("should nav to /home after log in", ()=>{
        spyOnProperty(ApiClient, 'auth').and.returnValue({ login: () => Promise.resolve(sampleCorrect)})
        router = fixture.debugElement.injector.get(Router);
        component.options['username'] = username;
        component.options['password'] = password;
        const spy = router.navigateByUrl as jasmine.Spy;
        component.handleSubmit();
        fixture.whenStable().then(() => {
          const navArgs = spy.calls.mostRecent().args[0];
          expect(navArgs).toBe('/home', 'should nav to home page');
        });
      });
      //saw '/home'
      it('should call handleBack() and redirect to / ', () => {
        spyOn(component, 'handleBack');
        component.handleBack();
        fixture.whenStable().then(() => {
            expect(component.handleBack).toHaveBeenCalled();
            const navArgs = routerSpy.calls.mostRecent().args[0];
            expect(navArgs).toBe('/', 'should nav to starting page');
        });
      });
    });
  });

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

      it('should call handleBack()', () => {
        spyOn(component, 'handleBack');
        button.click();
        expect(component.handleBack).toHaveBeenCalled();
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

      it('should call handleSubmit()', () => {
        spyOn(component, 'handleSubmit');
        button.click();
        expect(component.handleSubmit).toHaveBeenCalled();
      });
      
      it('should nav to /home', () => {
        button.click();
        fixture.whenStable().then(() => {
        const navArgs = routerSpy.calls.mostRecent().args[0];
        expect(navArgs).toBe('/home', 'should nav to home page');
        });
      });
    });
});
  