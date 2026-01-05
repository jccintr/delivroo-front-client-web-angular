import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductExtrasComponent } from './product-extras.component';

describe('ProductExtrasComponent', () => {
  let component: ProductExtrasComponent;
  let fixture: ComponentFixture<ProductExtrasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductExtrasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductExtrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
