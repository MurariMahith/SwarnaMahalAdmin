import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerTodayComponent } from './customer-today.component';

describe('CustomerTodayComponent', () => {
  let component: CustomerTodayComponent;
  let fixture: ComponentFixture<CustomerTodayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerTodayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerTodayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
