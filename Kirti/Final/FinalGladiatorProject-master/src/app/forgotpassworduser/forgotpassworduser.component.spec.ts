import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotpassworduserComponent } from './forgotpassworduser.component';

describe('ForgotpassworduserComponent', () => {
  let component: ForgotpassworduserComponent;
  let fixture: ComponentFixture<ForgotpassworduserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotpassworduserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotpassworduserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
