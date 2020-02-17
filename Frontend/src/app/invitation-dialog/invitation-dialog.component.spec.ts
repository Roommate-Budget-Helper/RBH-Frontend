import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InvitationDialogComponent } from './invitation-dialog.component';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material';
import { By } from "@angular/platform-browser";

describe('InvitationDialogComponent', () => {
  let component: InvitationDialogComponent;
  let fixture: ComponentFixture<InvitationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvitationDialogComponent ],
      imports: [MatDialogModule],
      providers:[{provide : MAT_DIALOG_DATA, useValue : {name: "my home"}}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render correct title in a h2 tag', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('New Invitation!');
  });  

  it('should render correct mat dialog content', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('mat-dialog-content').textContent).toContain('You have received an invitation to join home');
    expect(compiled.querySelector('mat-dialog-content').textContent).toContain('my home');
  });  

  it('should create accept button', () => {
    let acceptButton = fixture.debugElement.queryAll(By.css('.accept'))[0].nativeElement;
    expect(acceptButton).toBeTruthy();
  });  

  it('should have decline button', () => {
    let declineButton = fixture.debugElement.queryAll(By.css('.decline'))[0].nativeElement;
    expect(declineButton).toBeTruthy();
  });  

  it('should have accept button with correct content', () => {
    let acceptButton = fixture.debugElement.queryAll(By.css('.accept'))[0].nativeElement;
    expect(acceptButton.textContent).toContain("Accept");
  });  

  it('should have decline button', () => {
    let declineButton = fixture.debugElement.queryAll(By.css('.decline'))[0].nativeElement;
    expect(declineButton.textContent).toContain("Decline");
  });  
});
