import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzaTamanhoComponent } from './pizza-tamanho.component';

describe('PizzaTamanhoComponent', () => {
  let component: PizzaTamanhoComponent;
  let fixture: ComponentFixture<PizzaTamanhoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PizzaTamanhoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PizzaTamanhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
