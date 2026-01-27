import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackOrderTimelineComponent } from './track-order-timeline.component';

describe('TrackOrderTimelineComponent', () => {
  let component: TrackOrderTimelineComponent;
  let fixture: ComponentFixture<TrackOrderTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackOrderTimelineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackOrderTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
