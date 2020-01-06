import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StartingPageComponent } from './starting-page.component';
import { Router } from '@angular/router';
import { By } from "@angular/platform-browser";
import { FormsModule } from '@angular/forms';

const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

describe('StartingPageComponent', () => {
    let component: StartingPageComponent;
    let fixture: ComponentFixture<StartingPageComponent>;
    let button;
    let buttons;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports:[FormsModule],
            declarations: [StartingPageComponent],
            providers: [
                { provide: Router,   useValue: routerSpy }]
        }).compileComponents();
    }));

    describe('Basic Tests', () => {
        beforeEach(() => {
            fixture = TestBed.createComponent(StartingPageComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });
    
        it('should create', () => {
            expect(component).toBeTruthy();
        });
    });

    describe('Button Basic Tests', () => {
        beforeEach(() => {
            fixture = TestBed.createComponent(StartingPageComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
            buttons = fixture.debugElement.queryAll(By.css('button'))
        });
        
        describe('Login Button Tests', () => {
            beforeEach(() => {
                button = buttons[0].nativeElement
            });

            it('should be created', () => {
                expect(button).toBeTruthy();
            });

            it('should have correct text content', () => {
                expect(button.textContent).toContain('Log In');
            });
        });

        describe('Signup Button Tests', () => {
            beforeEach(() => {
                button = buttons[1].nativeElement
            });

            it('should be created', () => {
                expect(button).toBeTruthy();
            });

            it('should have correct text content', () => {
                expect(button.textContent).toContain('Sign Up');
            });
        });
    });

    describe('Routing Tests', () => {
        let router: Router;
        beforeEach(() => {
            router = fixture.debugElement.injector.get(Router);
            fixture = TestBed.createComponent(StartingPageComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
            fixture.whenStable()
          .then(() => fixture.detectChanges());
        });

        it('should call handleRedirectLogin()', () => {
            spyOn(component, 'handleRedirectLogin');
            component.handleRedirectLogin();
            expect(component.handleRedirectLogin).toHaveBeenCalled();
        });


        it('should call handleRedirectLogin() and redirect to /login', () => {
            const spy = router.navigateByUrl as jasmine.Spy;
            component.handleRedirectLogin();
            fixture.whenStable().then(() => {
                const navArgs = spy.calls.mostRecent().args[0];
                expect(navArgs).toBe('/login', 'should nav to login page');
            });
        });

        it('should call handleRedirectRegister() and redirect to /register', () => {
            const spy = router.navigateByUrl as jasmine.Spy;
            component.handleRedirectRegister();
            fixture.whenStable().then(() => {
                const navArgs = spy.calls.mostRecent().args[0];
                expect(navArgs).toBe('/register', 'should nav to register page');
            });
        });

        it('Login redirect Botton should exist', () => {
            const spy = router.navigateByUrl as jasmine.Spy;
            button = fixture.debugElement.queryAll(By.css('button'))[0].nativeElement
            expect(button).toBeTruthy();
            fixture.detectChanges();
            button.click()
            fixture.whenStable().then(() => {
                const navArgs = spy.calls.mostRecent().args[0];
                expect(navArgs).toBe('/login', 'should nav to login page');
            });
        });

        it('Register redirect Botton should exist', () => {
            const spy = router.navigateByUrl as jasmine.Spy;
            button = fixture.debugElement.queryAll(By.css('button'))[1].nativeElement
            expect(button).toBeTruthy();
            fixture.detectChanges();
            button.click()
            fixture.whenStable().then(() => {
                const navArgs = spy.calls.mostRecent().args[0];
                expect(navArgs).toBe('/register', 'should nav to login page');
            });
        });
    });
});