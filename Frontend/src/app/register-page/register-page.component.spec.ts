import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterPageComponent } from './register-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule,FormBuilder} from '@angular/forms';
import { StorageServiceService } from '../storage-service.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogRef,MatInputModule,MatDialogModule  } from '@angular/material';
import user from 'rbh-api-service/lib/user';

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
    describe('Basic Tests for Functions', () => {
      beforeEach(async(() => {
        fixture = TestBed.createComponent(RegisterPageComponent);
        component = fixture.componentInstance;
        component.options['username'] = username;
        component.options['password'] = password;
        component.options['email'] = email;
        component.options['repassword'] = repassword;
        fixture.detectChanges();
      }));


      it('should call checkPasswords()', () => {
        spyOn(component, 'checkPasswords');
        component.checkPasswords(component.registerForm)
        expect(component.checkPasswords).toHaveBeenCalled();
      });

      it('should return null when checkPasswords() called with different pwds', () => {
        spyOn(component, 'checkPasswords');
        component.options['repassword'] = 'repassword';
        // console.log(component.checkPasswords(component.registerForm));
        expect(component.checkPasswords(component.registerForm).notSame).toBeTruthy();
      });

      // it('should return true when checkPasswords() called with same pwds', () => {
      //   spyOn(component, 'checkPasswords');
      //   expect(component.checkPasswords(component.registerForm)).toBeNull();
      // });
    });
  });

});
