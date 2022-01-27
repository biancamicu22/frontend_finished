import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAtractieModalComponent } from './detail-atractie-modal.component';

describe('DetailAtractieModalComponent', () => {
  let component: DetailAtractieModalComponent;
  let fixture: ComponentFixture<DetailAtractieModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailAtractieModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailAtractieModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
