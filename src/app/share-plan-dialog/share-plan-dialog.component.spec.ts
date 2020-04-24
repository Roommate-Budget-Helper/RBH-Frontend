import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharePlanDialogComponent } from './share-plan-dialog.component';
import { MAT_DIALOG_DATA,MatDialogModule,MatFormFieldModule, MatInputModule, MatIconModule } from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

const fakedata = {recurrent: true};
describe('SharePlanDialogComponent', () => {
  let component: SharePlanDialogComponent;
  let fixture: ComponentFixture<SharePlanDialogComponent>;
  let compiled;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatFormFieldModule,MatInputModule,MatIconModule,MatDialogModule, FormsModule, ReactiveFormsModule],
      declarations: [ SharePlanDialogComponent ],
      providers:[{provide : MAT_DIALOG_DATA, useValue : fakedata}]
    })
    .compileComponents();
  }));

  describe('Basic Tests', () => {
    beforeEach(async(() => {
      fixture = TestBed.createComponent(SharePlanDialogComponent);
      component = fixture.componentInstance;
      component.data.recurrent = false
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
      expect(compiled.querySelector('h2').textContent).toContain('Hold on');
  });

  // it('should have correct hint', () => {
  //     compiled = fixture.debugElement.nativeElement;
  //     expect(compiled.querySelector('mat-hint').textContent).toContain('enter');
  //     expect(compiled.querySelector('mat-hint').textContent).toContain('username');
  // });

  it('should be invalid when first load', () => {
      expect(component.emailFormControl.invalid).toBeTruthy;
  });

  it('should not show mat-error when first load', () => {
      compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('mat-error')).toBeFalsy();
  });
  })
});
