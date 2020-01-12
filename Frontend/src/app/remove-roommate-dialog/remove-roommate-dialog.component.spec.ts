import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveRoommateDialogComponent } from './remove-roommate-dialog.component';

describe('RemoveRoommateDialogComponent', () => {
  let component: RemoveRoommateDialogComponent;
  let fixture: ComponentFixture<RemoveRoommateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveRoommateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveRoommateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
