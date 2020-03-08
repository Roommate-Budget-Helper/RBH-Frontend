import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillHistoryPageComponent } from './bill-history-page.component';

describe('BillHistoryPageComponent', () => {
  let component: BillHistoryPageComponent;
  let fixture: ComponentFixture<BillHistoryPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillHistoryPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillHistoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
