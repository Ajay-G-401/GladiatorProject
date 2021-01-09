import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailerloginComponent } from './retailerlogin.component';

describe('RetailerloginComponent', () => {
  let component: RetailerloginComponent;
  let fixture: ComponentFixture<RetailerloginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetailerloginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailerloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
