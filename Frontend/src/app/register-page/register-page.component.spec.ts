import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPageComponent } from './register-page.component';
import { RouterTestingModule } from '@angular/router/testing';
// import { Router } from '@angular/router';
// import {DevExtremeModule} from   '@angular/forms';
import { FormsModule, ReactiveFormsModule }         from '@angular/forms';
import {MatPaginatorModule} from '@angular/material';
import { MatDialogRef } from '@angular/material';
import { MatDialog } from '@angular/material/dialog';
describe('RegisterPageComponent', () => {
  let component: RegisterPageComponent;
  let fixture: ComponentFixture<RegisterPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule,FormsModule,ReactiveFormsModule,MatPaginatorModule],
      declarations: [ RegisterPageComponent],
      providers: [MatDialogRef]
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

  // it('should render title in a h1 tag', () => {
  //   const fixture = TestBed.createComponent(RegisterPageComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('Sign Up');
  // });
});
