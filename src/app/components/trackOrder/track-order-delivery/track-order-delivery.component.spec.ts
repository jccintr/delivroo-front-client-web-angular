import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackOrderDeliveryComponent } from './track-order-delivery.component';

describe('TrackOrderDeliveryComponent', () => {
  let component: TrackOrderDeliveryComponent;
  let fixture: ComponentFixture<TrackOrderDeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackOrderDeliveryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackOrderDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
