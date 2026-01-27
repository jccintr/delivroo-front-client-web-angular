import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackOrderSummaryComponent } from './track-order-summary.component';

describe('TrackOrderSummaryComponent', () => {
  let component: TrackOrderSummaryComponent;
  let fixture: ComponentFixture<TrackOrderSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackOrderSummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackOrderSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
