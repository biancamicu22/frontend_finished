import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtractieComponent } from './atractie.component';

describe('AtractieComponent', () => {
  let component: AtractieComponent;
  let fixture: ComponentFixture<AtractieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtractieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtractieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
