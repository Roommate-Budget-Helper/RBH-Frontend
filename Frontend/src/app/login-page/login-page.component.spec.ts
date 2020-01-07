import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginPageComponent } from './login-page.component';
import { StorageServiceService } from '../storage-service.service';
import { async, ComponentFixture, TestBed} from '@angular/core/testing';
import { Router } from '@angular/router';
import HttpClient from '../api-client';
import ApiClient from '../api-client';
import { By } from "@angular/platform-browser";

const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
// ApiClient.auth.login = jasmine.createSpy()
// const ApiClientSpy: { get: jasmine.Spy } = jasmine.createSpy('ApiClient', ['auth.login']);


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
      let username = "username";
      let password = "password";
      beforeEach(async(() => {
        fixture = TestBed.createComponent(LoginPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        // storage = TestBed.get(StorageServiceService);
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
        // ApiClient.auth.login = jasmine.createSpy().and.returnValue(of({userInfo:"11111111"}));
        ApiClient.auth.login = jasmine.createSpy().and.returnValue({userInfo:"11111111"});
        spyOn(window, "alert");
        component.options['username'] = username;
        component.options['password'] = password;
        component.handleSubmit();
        // expect(storage)
        expect(window.alert).not.toHaveBeenCalledWith("please enter username or password!");
      }); 

      //it("nav to /home")

      //it("invalid credential")


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

  describe('Button Tests', () => {
    beforeEach(() => {
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
        expect(button.textContent).toContain('Log In');
      });

      // it('should nav to /home', () => {
      // });
    });
  });
});
  