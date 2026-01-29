import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzaDescriptionComponent } from './pizza-description.component';

describe('PizzaDescriptionComponent', () => {
  let component: PizzaDescriptionComponent;
  let fixture: ComponentFixture<PizzaDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PizzaDescriptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PizzaDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
