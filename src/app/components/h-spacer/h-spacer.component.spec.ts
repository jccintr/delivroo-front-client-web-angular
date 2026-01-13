import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HSpacerComponent } from './h-spacer.component';

describe('HSpacerComponent', () => {
  let component: HSpacerComponent;
  let fixture: ComponentFixture<HSpacerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HSpacerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HSpacerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
