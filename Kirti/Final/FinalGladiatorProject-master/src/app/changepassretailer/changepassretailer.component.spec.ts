import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangepassretailerComponent } from './changepassretailer.component';

describe('ChangepassretailerComponent', () => {
  let component: ChangepassretailerComponent;
  let fixture: ComponentFixture<ChangepassretailerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangepassretailerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangepassretailerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
