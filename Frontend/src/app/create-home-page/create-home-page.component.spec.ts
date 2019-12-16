import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHomePageComponent } from './create-home-page.component';

describe('CreateHomePageComponent', () => {
  let component: CreateHomePageComponent;
  let fixture: ComponentFixture<CreateHomePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateHomePageComponent ]
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
