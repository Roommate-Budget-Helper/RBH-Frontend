import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterPageComponent } from './register-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule }         from '@angular/forms';
// import { MatDialogRef } from '@angular/material';
// import { MatDialog } from '@angular/material/dialog';
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
  // MatDialogRef
} from '@angular/material';

describe('RegisterPageComponent', () => {
  let component: RegisterPageComponent;
  let fixture: ComponentFixture<RegisterPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterPageComponent],
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
      providers: [{provide : MatDialogRef, useValue : {}}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(RegisterPageComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Sign up');
  });

});
