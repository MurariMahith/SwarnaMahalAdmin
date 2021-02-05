import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailOfferComponent } from './avail-offer.component';

describe('AvailOfferComponent', () => {
  let component: AvailOfferComponent;
  let fixture: ComponentFixture<AvailOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailOfferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
