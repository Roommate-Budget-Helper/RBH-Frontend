import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterPageComponent } from './register-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule,FormBuilder} from '@angular/forms';
import { StorageServiceService } from '../storage-service.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogRef,MatInputModule,MatDialogModule  } from '@angular/material';
import { By } from "@angular/platform-browser";
import ApiClient from '../api-client';

import user from 'rbh-api-service/lib/user';
import { computeStyle } from '@angular/animations/browser/src/util';

const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

describe('RegisterPageComponent', () => {
  let component: RegisterPageComponent;
  let fixture: ComponentFixture<RegisterPageComponent>;
  let username = "username";
  let password = "password";
  let email = "email@gmail.com";
  let repassword = "password"

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterPageComponent],
      imports: [RouterTestingModule,FormsModule,ReactiveFormsModule,MatInputModule,MatDialogModule,
        BrowserAnimationsModule],
      providers: [{provide : MatDialogRef, useValue : {}},
        FormBuilder,
        { provide: Router,   useValue: routerSpy },
        StorageServiceService
      ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(RegisterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  describe('Basic Tests', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should render title in a h1 tag', () => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('h1').textContent).toContain('Sign up');
    });  

    it('should create the FormGroup', () => {
      expect(component.registerForm).not.toBeNull;
    });  

    it('should have options initialized to be ""', () => {
      expect(component.options['username']).toBe("");
      expect(component.options['password']).toBe("");
      expect(component.options['email']).toBe("");
      expect(component.options['repassword']).toBe("");
    });  

    it('should be invalid when first load', () => {
      expect(component.registerForm.invalid).toBeTruthy;
    });

    describe('Form Validation Tests', () => {
      beforeEach(async(() => {
        component.registerForm.setValue({username: username, email:email, password: password, repassword: repassword});
        expect(component.registerForm.invalid).toBeFalsy();
      }));

      it('should be invalid when length of username < 5', () => {
        component.registerForm.controls['username'].patchValue("user");
        expect(component.registerForm.invalid).toBeTruthy();
      });

      it('should be invalid when length of username >20', () => {
        component.registerForm.controls['username'].patchValue("abcdefghijklmnopqrstuvxyz");
        expect(component.registerForm.invalid).toBeTruthy();
      });

      //to be continued, to be add later.
      // it('should show mat-error message when gets invalid username', () => {
      //   component.registerForm.controls['username'].patchValue("user");
      //   const input = fixture.debugElement.query(By.css("[formControlName='username']"));
      //   const errors = fixture.debugElement.queryAll(By.css("mat-error"));
      //   console.info(input);
      //   console.info(errors);
      //   // input.nativeElement.dispatchEvent(new Event("input"));
      //   // fixture.detectChanges();
      //   expect(errors.length).toEqual(1);
      //   expect(errors[0].nativeElement.innerHTML.trim()).toMatch("Username must contain at least 5 characters.");
      // });

      it('should be invalid when username contains invalid character', () => {
        component.registerForm.controls['username'].patchValue("//++==");
        expect(component.registerForm.invalid).toBeTruthy();
      });

      it('should be invalid when empty password', () => {
        component.registerForm.controls['password'].patchValue("");
        expect(component.registerForm.invalid).toBeTruthy();
      });

      it('should be invalid when length of password < 5', () => {
        component.registerForm.controls['password'].patchValue("pass");
        expect(component.registerForm.invalid).toBeTruthy();
      });

      it('should be invalid when length of password > 50', () => {
        component.registerForm.controls['password'].patchValue("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvxyz");
        expect(component.registerForm.invalid).toBeTruthy();
      });
      
      it('should be invalid when length of password < 5', () => {
        component.registerForm.controls['password'].patchValue("pass");
        expect(component.registerForm.invalid).toBeTruthy();
      });

      it('should be invalid when password contains invalid character', () => {
        component.registerForm.controls['password'].patchValue("//++==");
        expect(component.registerForm.invalid).toBeTruthy();
      });

      it('should be invalid when empty repassword', () => {
        component.registerForm.controls['repassword'].patchValue("");
        expect(component.registerForm.invalid).toBeTruthy();
      });

      it('should be invalid when empty email', () => {
        component.registerForm.controls['email'].patchValue("");
        expect(component.registerForm.invalid).toBeTruthy();
      });

      it('should be invalid with invalid email format', () => {
        component.registerForm.controls['email'].patchValue("abc");
        expect(component.registerForm.invalid).toBeTruthy();
        component.registerForm.controls['email'].patchValue("abc@");
        expect(component.registerForm.invalid).toBeTruthy();
        component.registerForm.controls['email'].patchValue("abc@.com");
        expect(component.registerForm.invalid).toBeTruthy();
      });
    });
  });

  describe('Function Tests', () => {
    describe('Basic Function Tests(createForm, checkPasswords)', () => {
      beforeEach(async(() => {
        fixture = TestBed.createComponent(RegisterPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));

      it('should call createForm to create registerForm', () => {
        spyOn(RegisterPageComponent.prototype, 'createForm');
        fixture = TestBed.createComponent(RegisterPageComponent);
        component = fixture.componentInstance;
        expect(component.createForm).toHaveBeenCalled();
      });

      it('should return null when password and repassword are the same ', () => {
        component.registerForm.setValue({username: username, email:email, password: password, repassword: repassword});
        expect(component.checkPasswords(component.registerForm)).toBeNull();
      });

      it('should return null when password and repassword are the same ', () => {
        component.registerForm.setValue({username: username, email:email, password: password, repassword: repassword});
        component.registerForm.controls['repassword'].patchValue("incorrectPassword");
        expect(component.checkPasswords(component.registerForm)).not.toBeNull();
        expect(component.checkPasswords(component.registerForm).notSame).toBeTruthy();
      });
    });

    describe('handleRedirect() Tests', () => {
      beforeEach(async(() => {
        fixture = TestBed.createComponent(RegisterPageComponent);
        component = fixture.componentInstance;
        component.options['username'] = username;
        component.options['password'] = password;
        component.options['email'] = email;
        component.options['repassword'] = repassword;
        component.registerForm.setValue({username: username, email:email, password: password, repassword: repassword});
        fixture.detectChanges();
        //to be continued
        let sampleCorrect = {userInfo: {id: 111111,
          full_name: "full_name",
          balance: 0,
          userName: "username",
          hashedPassword: "hashedPass",
          email: "some@gmail.com"},
          token:"some-token"};
      }));
      
      // it("should nav to /home after log in", ()=>{
      //   spyOnProperty(ApiClient, 'auth').and.returnValue({ login: () => Promise.resolve(sampleCorrect)})
      //   router = fixture.debugElement.injector.get(Router);
      //   component.options['username'] = username;
      //   component.options['password'] = password;
      //   const spy = router.navigateByUrl as jasmine.Spy;
      //   component.handleSubmit();
      //   fixture.whenStable().then(() => {
      //     const navArgs = spy.calls.mostRecent().args[0];
      //     expect(navArgs).toBe('/home', 'should nav to home page');
      //   });
      // });
    });
  });

  describe('Button Tests', () => {
    let submitButton;
    beforeEach(() => {
      fixture = TestBed.createComponent(RegisterPageComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      submitButton = fixture.debugElement.queryAll(By.css('button'))[0].nativeElement;
    });
    //to be continued;
  });

});
