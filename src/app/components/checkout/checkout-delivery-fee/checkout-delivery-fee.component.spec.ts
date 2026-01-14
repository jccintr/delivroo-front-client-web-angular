import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutDeliveryFeeComponent } from './checkout-delivery-fee.component';

describe('CheckoutDeliveryFeeComponent', () => {
  let component: CheckoutDeliveryFeeComponent;
  let fixture: ComponentFixture<CheckoutDeliveryFeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutDeliveryFeeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckoutDeliveryFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
