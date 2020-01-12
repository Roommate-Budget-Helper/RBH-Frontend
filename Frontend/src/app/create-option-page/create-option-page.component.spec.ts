import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOptionPageComponent } from './create-option-page.component';

describe('CreateOptionPageComponent', () => {
  let component: CreateOptionPageComponent;
  let fixture: ComponentFixture<CreateOptionPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateOptionPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOptionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
