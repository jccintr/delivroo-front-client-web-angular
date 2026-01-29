import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzaSaboresSeletorComponent } from './pizza-sabores-seletor.component';

describe('PizzaSaboresSeletorComponent', () => {
  let component: PizzaSaboresSeletorComponent;
  let fixture: ComponentFixture<PizzaSaboresSeletorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PizzaSaboresSeletorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PizzaSaboresSeletorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
