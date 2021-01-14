import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsforapprovalComponent } from './productsforapproval.component';

describe('ProductsforapprovalComponent', () => {
  let component: ProductsforapprovalComponent;
  let fixture: ComponentFixture<ProductsforapprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsforapprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsforapprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
