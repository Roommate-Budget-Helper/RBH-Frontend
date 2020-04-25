import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RemoveRoommateDialogComponent } from './remove-roommate-dialog.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatFormFieldModule, MatInputModule, MatIconModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
describe('RemoveRoommateDialogComponent', () => {
    let component: RemoveRoommateDialogComponent;
    let fixture: ComponentFixture<RemoveRoommateDialogComponent>;
    let compiled;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RemoveRoommateDialogComponent],
            imports: [MatListModule, FormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatIconModule],
            providers: [{ provide: MAT_DIALOG_DATA, useValue: { HouseId: 1, roommates: ['Roommate1', 'Roommate2', 'Roommate3'] } }]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RemoveRoommateDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    describe('Basic Tests', () => {
        it('should create', () => {
            expect(component).toBeTruthy();
        });

        it('should select none when created', () => {
            expect(component.selected.length).toBe(0);
        });

        it('should generate correct option list', () => {
            compiled = fixture.debugElement.nativeElement;

            expect(compiled.querySelector('mat-list-option')).toBeTruthy();
        });
    });
    describe('Basic Tests', () => {
        it('should create', () => {
            // expect(component).toBeTruthy();
        });
    });
    describe('Basic Tests', () => {
        it('should create', () => {
            // expect(component).toBeTruthy();
        });
    });
});
