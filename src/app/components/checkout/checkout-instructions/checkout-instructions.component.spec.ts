import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutInstructionsComponent } from './checkout-instructions.component';

describe('CheckoutInstructionsComponent', () => {
  let component: CheckoutInstructionsComponent;
  let fixture: ComponentFixture<CheckoutInstructionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutInstructionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckoutInstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
