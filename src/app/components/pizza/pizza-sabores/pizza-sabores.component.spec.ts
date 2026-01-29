import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzaSaboresComponent } from './pizza-sabores.component';

describe('PizzaSaboresComponent', () => {
  let component: PizzaSaboresComponent;
  let fixture: ComponentFixture<PizzaSaboresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PizzaSaboresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PizzaSaboresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
