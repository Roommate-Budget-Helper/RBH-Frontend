import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CreateHomePageComponent } from './create-home-page.component';
import { FormsModule, ReactiveFormsModule }         from '@angular/forms';
import { Router } from '@angular/router';
import {MatDialogRef} from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StorageServiceService } from '../storage-service.service';

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

describe('CreateHomePageComponent', () => {
  let component: CreateHomePageComponent;
  let fixture: ComponentFixture<CreateHomePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateHomePageComponent ],
      imports:[RouterTestingModule,FormsModule,ReactiveFormsModule,
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
      providers: [{provide : MatDialogRef, useValue : {}}, StorageServiceService],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
