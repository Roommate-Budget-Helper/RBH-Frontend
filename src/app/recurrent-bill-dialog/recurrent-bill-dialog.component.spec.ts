import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StorageServiceService } from '../storage-service.service';
import { Router } from '@angular/router';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage'
import { BehaviorSubject } from 'rxjs'

import { RecurrentBillDialogComponent } from './recurrent-bill-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material';
const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
import { MAT_DIALOG_DATA, MatDialogModule, MatFormFieldModule, MatInputModule, MatIconModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { of } from 'rxjs';
import { By } from "@angular/platform-browser";
export class MdDialogMock {
  // When the component calls this.dialog.open(...) we'll return an object
  // with an afterClosed method that allows to subscribe to the dialog result observable.
  open() {
    return {
      afterClosed: () => of(),
      updatePosition: () => { }
    }
  };
};
const FirestoreStub = {
  collection: (name: string) => ({
    doc: (_id: string) => ({
      valueChanges: () => new BehaviorSubject({ foo: 'bar' }),
      set: (_d: any) => new Promise((resolve, _reject) => resolve()),
    }),
  }),
}
describe('RecurrentBillDialogComponent', () => {
  let component: RecurrentBillDialogComponent;
  let fixture: ComponentFixture<RecurrentBillDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RecurrentBillDialogComponent],
      imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatIconModule, BrowserAnimationsModule],
      providers: [
        { provide: Router, useValue: routerSpy },
        StorageServiceService,
        { provide: MatDialog, useValue: MdDialogMock },
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: { billName: "recur bill", interval: "Month" } },
        { provide: AngularFireStorage, useValue: FirestoreStub }
      ]

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecurrentBillDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct dialog content', () => {
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('mat-dialog-content').textContent).toContain('Your recurrent bill: recur bill for this Month needs to be updated');
  });

  it('should have correct dialog label', () => {
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('mat-label').textContent).toContain('Enter the amount for this Month on recur bill!');
  });

  it('should have correct hint in input', () => {
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('mat-hint').textContent).toContain('Please enter amount');
  });

  it('should have correct dialog label', () => {
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('mat-label').textContent).toContain('Enter the amount for this Month on recur bill!');
  });
  it('should not show mat-error when first load', () => {
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('mat-error')).toBeFalsy();
  });

  it('should create correct header', () => {
    let header = fixture.debugElement.nativeElement.querySelector('h2');
    expect(header).toBeTruthy();
    expect(header.textContent).toContain("Recurrent Bill Notification!");
  })
});
