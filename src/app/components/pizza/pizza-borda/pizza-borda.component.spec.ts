import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzaBordaComponent } from './pizza-borda.component';

describe('PizzaBordaComponent', () => {
  let component: PizzaBordaComponent;
  let fixture: ComponentFixture<PizzaBordaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PizzaBordaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PizzaBordaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
