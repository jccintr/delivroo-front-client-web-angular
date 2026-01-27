import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackOrderPaymentComponent } from './track-order-payment.component';

describe('TrackOrderPaymentComponent', () => {
  let component: TrackOrderPaymentComponent;
  let fixture: ComponentFixture<TrackOrderPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackOrderPaymentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackOrderPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
