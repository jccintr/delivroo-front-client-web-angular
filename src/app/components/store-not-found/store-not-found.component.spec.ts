import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreNotFoundComponent } from './store-not-found.component';

describe('StoreNotFoundComponent', () => {
  let component: StoreNotFoundComponent;
  let fixture: ComponentFixture<StoreNotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreNotFoundComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
