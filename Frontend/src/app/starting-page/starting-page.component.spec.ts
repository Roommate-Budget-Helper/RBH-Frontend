import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StartingPageComponent } from './starting-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { Button } from 'protractor';
import { DebugElement } from '@angular/core';
import { By } from "@angular/platform-browser";
import {Component, Directive, Input, ViewChild} from '@angular/core';
import { LoginPageComponent } from '../login-page/login-page.component';
import { RegisterPageComponent } from '../register-page/register-page.component';
import {Location} from '@angular/common'
import {routes} from '../app.module'
import { CreateHomePageComponent } from '../create-home-page/create-home-page.component';
import { HomePageComponent } from '../home-page/home-page.component';
// import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

describe('StartingPageComponent', () => {
    let componentDe;
    let component: StartingPageComponent;
    let fixture: ComponentFixture<StartingPageComponent>;
    let location : Location;
    let button;
    let buttons;
    // .withRoutes([
    //     { path: 'login', component: LoginPageComponent }])
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule.withRoutes([{path:'', component:StartingPageComponent},{ path: 'login', component: LoginPageComponent}]), FormsModule],
            declarations: [StartingPageComponent, LoginPageComponent],
            providers: [ Location, { provide: Router, 
                useClass: class { navigate = jasmine.createSpy("navigate"); },
                Component, Directive, Input, ViewChild }]
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
        
        beforeEach(() => {
            location = TestBed.get(Location);
            fixture = TestBed.createComponent(StartingPageComponent);
            component = fixture.componentInstance;
            // componentDe = fixture.debugElement.componentInstance;
            fixture.detectChanges();
        });

        it('should call handleRedirectLogin()', () => {
            spyOn(component, 'handleRedirectLogin');
            component.handleRedirectLogin();
            expect(component.handleRedirectLogin).toHaveBeenCalled();
        });

        // it('should call handleRedirectLogin() and redirect to /login', () => {
        //     spyOn(component, 'handleRedirectLogin');
        //     component.handleRedirectLogin();
        //     fixture.whenStable().then(() => {
        //         // console.log(location.path());
        //     //    expect(location.path()).toBe('/signup')
        //         expect(location.path()).toBe('/login');
        //       });
        // });

        // it('Login redirect Botton should exist', () => {
        //     // fixture.detectChanges();
        //     // fixture.debugElement.query(By.css('.starting-page-buttons'))[0].nativeElement.click();
        //     button = fixture.debugElement.queryAll(By.css('button'))[0].nativeElement
        //     expect(button).toBeTruthy();
        //     fixture.detectChanges();
        //     button.click()
        // });

        // it('should Login redirect button', async(() => {
        //     fixture.detectChanges();
        //     button = fixture.debugElement.queryAll(By.css('button'))[0].nativeElement
        //     // expect(button.textContent).toContain('Log In');
        //     // expect(button.textContent).not.toContain('Sign up')
        //     // console.log(button);
        //   }));

        // it('should call handleRedirectLogin() after the Login button is clicked', () => {
        //     // let el = fixture.debugElement.queryAll(By.css('.starting-page-buttons'))[0].nativeElement
        //     button = fixture.debugElement.queryAll(By.css('button'))[0].nativeElement
        //     fixture.detectChanges();
        //     button.click()

        // });
    });
});