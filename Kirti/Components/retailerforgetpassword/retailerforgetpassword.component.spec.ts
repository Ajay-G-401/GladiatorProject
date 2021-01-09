import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailerforgetpasswordComponent } from './retailerforgetpassword.component';

describe('RetailerforgetpasswordComponent', () => {
  let component: RetailerforgetpasswordComponent;
  let fixture: ComponentFixture<RetailerforgetpasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetailerforgetpasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailerforgetpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
