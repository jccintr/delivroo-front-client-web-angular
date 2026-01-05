import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductExtraItemComponent } from './product-extra-item.component';

describe('ProductExtraItemComponent', () => {
  let component: ProductExtraItemComponent;
  let fixture: ComponentFixture<ProductExtraItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductExtraItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductExtraItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
