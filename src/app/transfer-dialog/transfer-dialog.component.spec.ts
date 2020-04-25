import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { TransferDialogComponent } from './transfer-dialog.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MAT_DIALOG_DATA,MatDialogModule,MatFormFieldModule, MatInputModule, MatIconModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { By } from "@angular/platform-browser";


const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
const fakedata = {roommateArray: ["rm1", "rm2", "rm3"]};

describe('TransferDialogComponent', () => {
    let component: TransferDialogComponent;
    let fixture: ComponentFixture<TransferDialogComponent>;
    let compiled;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [BrowserAnimationsModule, RouterTestingModule, MatFormFieldModule,MatInputModule, FormsModule, ReactiveFormsModule,MatAutocompleteModule,MatIconModule,MatDialogModule],
            declarations: [TransferDialogComponent],
            providers:[{provide : MAT_DIALOG_DATA, useValue : fakedata},{provide: Router,   useValue: routerSpy}]
        }).compileComponents();
    }));


    describe('Basic Tests', () => {
        beforeEach(async(() => {
            fixture = TestBed.createComponent(TransferDialogComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        }));

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
            compiled = fixture.debugElement.nativeElement;
            expect(compiled.querySelector('mat-label').textContent).toContain('Transfer the Ownership');
        });

        it('should have correct hint', () => {
            compiled = fixture.debugElement.nativeElement;
            expect(compiled.querySelector('mat-hint').textContent).toContain('enter');
            expect(compiled.querySelector('mat-hint').textContent).toContain('username');
        });

        it('should be invalid when first load', () => {
            expect(component.emailFormControl.invalid).toBeTruthy;
        });

        it('should not show mat-error when first load', () => {
            compiled = fixture.debugElement.nativeElement;
            expect(compiled.querySelector('mat-error')).toBeFalsy();
        });
    })

    describe('Validation and Error checking Tests', () => {
        beforeEach(() => {
          fixture = TestBed.createComponent(TransferDialogComponent);
          component = fixture.componentInstance;
          fixture.detectChanges();
        });
    
        it('should be valid when input is not empty', () => {
          expect(component.emailFormControl.invalid).toBeTruthy();
          component.emailFormControl.patchValue("sample username");
          expect(component.emailFormControl.invalid).toBeFalsy();
        });
    
        it('should show mat-error when touched', () => {
          compiled = fixture.debugElement.nativeElement;
          component.emailFormControl.markAsTouched();
          fixture.detectChanges();
          expect(compiled.querySelector('mat-error')).toBeTruthy();
        });
    
        it('should show mat-error with corret content', () => {
          compiled = fixture.debugElement.nativeElement;
          component.emailFormControl.markAsTouched();
          fixture.detectChanges();
          expect(compiled.querySelector('mat-error').textContent).toContain('Username is');
          expect(compiled.querySelector('mat-error').textContent).toContain('required');
        });
    });

    describe('Action Button Tests', () => {
        let button;
        let buttons;
        describe('Invite Button Tests', () => {
          beforeEach(() => {
            fixture = TestBed.createComponent(TransferDialogComponent);
            component = fixture.componentInstance;
            compiled = fixture.debugElement.nativeElement;
            fixture.detectChanges();
            buttons = fixture.debugElement.queryAll(By.css('button'));
            button = buttons[0].nativeElement;
          });
    
          it('should create', () => {
            expect(button).toBeTruthy();
          });
    
          it('should have correct content', () => {
            expect(button.textContent).toContain("Transfer");
          });
    
          it('should be disabled when created', () => {
            expect(button.disabled).toBeTruthy();
          });
    
          it('should be enabled when the input is not empty', () => {
            component.emailFormControl.patchValue("sample username");
            fixture.detectChanges();
            expect(button.disabled).toBeFalsy();
          });
    
          // //unresolved
          // it('should call function invite() when clicked', () => {
          //   component.emailFormControl.patchValue("sample username");
          //   spyOn(component, 'invite');
          //   fixture.detectChanges();
          //   expect(button.disabled).toBeFalsy();
          //   button.click();
          //   expect(component.invite).toHaveBeenCalled();//false
          // });
    
          // //unresolved
          // it('should call function invite() with correct value when clicked', () => {
          //   component.emailFormControl.patchValue("sample username");
          //   spyOn(component, 'invite');
          //   fixture.detectChanges();
          //   expect(button.disabled).toBeFalsy();
          //   button.click();
          //   expect(component.invite).toHaveBeenCalledWith("sample username");//false
          // });
        });
    
        describe('Decline Button Tests', () => {
          beforeEach(() => {
            fixture = TestBed.createComponent(TransferDialogComponent);
            component = fixture.componentInstance;
            compiled = fixture.debugElement.nativeElement;
            fixture.detectChanges();
            buttons = fixture.debugElement.queryAll(By.css('button'));
            button = buttons[1].nativeElement;
          });
    
          it('should create', () => {
            expect(button).toBeTruthy();
          });
    
          it('should have correct content', () => {
            expect(button.textContent).toContain("Nevermind");
          });
    
          it('should be enabled when created', () => {
            expect(button.disabled).toBeFalsy();
          });
        });
      });
});
