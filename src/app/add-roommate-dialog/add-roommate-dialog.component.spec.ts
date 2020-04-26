import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
    MAT_DIALOG_DATA,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatAutocompleteModule
} from '@angular/material';
import { AddRoommateDialogComponent } from './add-roommate-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import ApiClient from '../api-client';
import { Observable } from 'rxjs';

describe('AddRoommateDialogComponent', () => {
    let component: AddRoommateDialogComponent;
    let fixture: ComponentFixture<AddRoommateDialogComponent>;
    let compiled;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AddRoommateDialogComponent],
            imports: [
                MatDialogModule,
                MatFormFieldModule,
                MatInputModule,
                FormsModule,
                ReactiveFormsModule,
                MatIconModule,
                BrowserAnimationsModule,
                MatAutocompleteModule
            ],
            providers: [{ provide: MAT_DIALOG_DATA, useValue: { houseId: 1 } }]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AddRoommateDialogComponent);
        component = fixture.componentInstance;
        component.filteredOptions = new Observable<string[]>();
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
            compiled = fixture.debugElement.nativeElement;
            expect(compiled.querySelector('mat-label').textContent).toContain('oommate');
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
    });

    describe('Validation and Error checking Tests', () => {
        beforeEach(() => {
            fixture = TestBed.createComponent(AddRoommateDialogComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('should be valid when input is not empty', () => {
            expect(component.emailFormControl.invalid).toBeTruthy();
            component.emailFormControl.patchValue('sample username');
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
                fixture = TestBed.createComponent(AddRoommateDialogComponent);
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
                expect(button.textContent).toContain('Invite');
            });

            it('should be disabled when created', () => {
                expect(button.disabled).toBeTruthy();
            });

            it('should be enabled when the input is not empty', () => {
                component.emailFormControl.patchValue('sample username');
                fixture.detectChanges();
                expect(button.disabled).toBeFalsy();
            });
        });

        describe('Decline Button Tests', () => {
            beforeEach(() => {
                fixture = TestBed.createComponent(AddRoommateDialogComponent);
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
                expect(button.textContent).toContain('Nevermind');
            });

            it('should be enabled when created', () => {
                expect(button.disabled).toBeFalsy();
            });
        });
    });

    describe('Function Tests', () => {
        beforeEach(() => {
            fixture = TestBed.createComponent(AddRoommateDialogComponent);
            component = fixture.componentInstance;
            compiled = fixture.debugElement.nativeElement;
            fixture.detectChanges();
        });

        it('should make correct API call', () => {
            spyOnProperty(ApiClient, 'invitation').and.returnValue({ createInvitation: () => Promise.resolve(true) });
            expect(component.invite('username')).toBeTruthy();
        });
    });
});
