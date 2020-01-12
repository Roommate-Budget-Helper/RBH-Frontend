import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRoommateDialogComponent } from './add-roommate-dialog.component';

describe('AddRoommateDialogComponent', () => {
  let component: AddRoommateDialogComponent;
  let fixture: ComponentFixture<AddRoommateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRoommateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRoommateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
