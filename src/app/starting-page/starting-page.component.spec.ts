import { async, ComponentFixture, TestBed, tick,fakeAsync} from '@angular/core/testing';
import { StartingPageComponent } from './starting-page.component';
import { Router } from '@angular/router';
import { By } from "@angular/platform-browser";
import { FormsModule } from '@angular/forms';
import { SpyLocation } from '@angular/common/testing';;
// import { Location } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

describe('StartingPageComponent', () => {
    let component: StartingPageComponent;
    let fixture: ComponentFixture<StartingPageComponent>;
    let button;
    let buttons;
    let router;
    let spy;
    // let location: SpyLocation;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports:[FormsModule, RouterTestingModule],
            declarations: [StartingPageComponent],
            providers: [
                { provide: Router,   useValue: routerSpy },
                { provide: MatDialog,   useValue: {} },
                { provide: MatDialogRef,   useValue: {} }
                // Location
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(StartingPageComponent);
        component = fixture.componentInstance;
    }));


    describe('Basic Tests', () => {
        it('should create', () => {
            expect(component).toBeTruthy();
        });
    });

    describe('Function Tests', () => {
        describe('Routing Tests for Functions', () => {
            beforeEach(() => {
                router = fixture.debugElement.injector.get(Router);
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
        });
    });

    describe('Button Tests', () => {
        beforeEach(() => {
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

            it('should call handleRedirectLogin()', () => {
                spyOn(component, 'handleRedirectLogin');
                button = fixture.debugElement.queryAll(By.css('button'))[0].nativeElement
                button.click();
                expect(component.handleRedirectLogin).toHaveBeenCalled();
            });

            it('should nav to login page', () => {
                router = fixture.debugElement.injector.get(Router);
                spy = router.navigateByUrl as jasmine.Spy;
                button = fixture.debugElement.queryAll(By.css('button'))[0].nativeElement
                button.click();
                fixture.whenStable().then(() => {
                    const navArgs = spy.calls.mostRecent().args[0];
                    expect(navArgs).toBe('/login', 'should nav to login page');
                });
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

            it('should call handleRedirectRegister()', () => {
                spyOn(component, 'handleRedirectRegister');
                button = fixture.debugElement.queryAll(By.css('button'))[1].nativeElement
                button.click();
                expect(component.handleRedirectRegister).toHaveBeenCalled();
            });

            it('should nav to register page', () => {
                router = fixture.debugElement.injector.get(Router);
                spy = router.navigateByUrl as jasmine.Spy;
                button = fixture.debugElement.queryAll(By.css('button'))[1].nativeElement
                button.click();
                fixture.whenStable().then(() => {
                    const navArgs = spy.calls.mostRecent().args[0];
                    expect(navArgs).toBe('/register', 'should nav to register page');
                });
            });
        });
    });
});