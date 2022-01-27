import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailRestaurantModalComponent } from './detail-restaurant-modal.component';

describe('DetailRestaurantModalComponent', () => {
  let component: DetailRestaurantModalComponent;
  let fixture: ComponentFixture<DetailRestaurantModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailRestaurantModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailRestaurantModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
