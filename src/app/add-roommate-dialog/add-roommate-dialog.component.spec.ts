import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA,MatDialogModule,MatFormFieldModule, MatInputModule, MatIconModule } from '@angular/material';
import { AddRoommateDialogComponent } from './add-roommate-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

describe('AddRoommateDialogComponent', () => {
  let component: AddRoommateDialogComponent;
  let fixture: ComponentFixture<AddRoommateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRoommateDialogComponent ],
      imports: [MatDialogModule,MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatIconModule, BrowserAnimationsModule],
      providers:[{provide : MAT_DIALOG_DATA, useValue : {name: "my home"}}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRoommateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Basic Tests', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should create form control', () => {
      expect(component.emailFormControl).toBeTruthy;
    });

    it('should create matcher for error state', () => {
      expect(component.matcher).toBeTruthy;
    });


    it('should have correct label(dialog title)', () => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('mat-label').textContent).toContain('Invite New Roommate');
    });

    it('should have correct hint', () => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('mat-hint').textContent).toContain('enter');
      expect(compiled.querySelector('mat-hint').textContent).toContain('username');
    });

    it('should be invalid when first load', () => {
      expect(component.emailFormControl.invalid).toBeTruthy;
    });

    it('should not show mat-error when first load', () => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('mat-error')).toBeFalsy();
    });
  });

  describe('Validation and Error checking Tests', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(AddRoommateDialogComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should be valid when input is not empty', () => {
      expect(component.emailFormControl.invalid).toBeTruthy();
      component.emailFormControl.patchValue("sample username");
      expect(component.emailFormControl.invalid).toBeFalsy();
    });

    it('should show mat-error when touched', () => {
      const compiled = fixture.debugElement.nativeElement;
      component.emailFormControl.markAsTouched();
      fixture.detectChanges();
      expect(compiled.querySelector('mat-error')).toBeTruthy();
    });

    it('should show mat-error with corret content', () => {
      const compiled = fixture.debugElement.nativeElement;
      component.emailFormControl.markAsTouched();
      fixture.detectChanges();
      expect(compiled.querySelector('mat-error').textContent).toContain('Username is');
      expect(compiled.querySelector('mat-error').textContent).toContain('required');
    });
  });
});
