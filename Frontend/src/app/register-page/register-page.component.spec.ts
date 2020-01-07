import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterPageComponent } from './register-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule }         from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatInputModule,
  MatRadioModule,
  MatSelectModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatToolbarModule,
  MatListModule,
  MatGridListModule,
  MatCardModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatMenuModule,
  MatDialogModule
} from '@angular/material';

const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

describe('RegisterPageComponent', () => {
  let component: RegisterPageComponent;
  let fixture: ComponentFixture<RegisterPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterPageComponent],
      imports: [RouterTestingModule,FormsModule,ReactiveFormsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,
        MatRadioModule,
        MatSelectModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatToolbarModule,
        MatListModule,
        MatGridListModule,
        MatCardModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatMenuModule,
        MatDialogModule,
        BrowserAnimationsModule],
      providers: [{provide : MatDialogRef, useValue : {}},{ provide: Router,   useValue: routerSpy }]
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
      expect(compiled.querySelector('h1').textContent).toContain('Sign Up');
    });  

    it('should have options initialized to be ""', () => {
      expect(component.options['username']).toBe("");
      expect(component.options['password']).toBe("");
      expect(component.options['email']).toBe("");
      expect(component.options['repassword']).toBe("");
    });  
  });

  describe('Function Tests', () => {
    describe('Basic Tests for Functions', () => {
      let username = "username";
      let password = "password";
      let email = "email@gmail.com";
      let repassword = "password"
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

      it('should return true when checkPasswords() called with same pwds', () => {
        spyOn(component, 'checkPasswords');
        expect(component.checkPasswords(component.registerForm)).toBeNull();
      });
    });
  });

});
