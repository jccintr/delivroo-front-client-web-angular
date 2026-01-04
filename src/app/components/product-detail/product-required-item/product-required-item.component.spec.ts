import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductRequiredItemComponent } from './product-required-item.component';

describe('ProductRequiredItemComponent', () => {
  let component: ProductRequiredItemComponent;
  let fixture: ComponentFixture<ProductRequiredItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductRequiredItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductRequiredItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
