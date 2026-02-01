import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzaInstructionsComponent } from './pizza-instructions.component';

describe('PizzaInstructionsComponent', () => {
  let component: PizzaInstructionsComponent;
  let fixture: ComponentFixture<PizzaInstructionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PizzaInstructionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PizzaInstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
