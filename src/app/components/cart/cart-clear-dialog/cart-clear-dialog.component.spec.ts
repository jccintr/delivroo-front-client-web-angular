import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartClearDialogComponent } from './cart-clear-dialog.component';

describe('CartClearDialogComponent', () => {
  let component: CartClearDialogComponent;
  let fixture: ComponentFixture<CartClearDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartClearDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartClearDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
