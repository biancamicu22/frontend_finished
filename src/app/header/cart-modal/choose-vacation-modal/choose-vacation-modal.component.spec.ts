import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseVacationModalComponent } from './choose-vacation-modal.component';

describe('ChooseVacationModalComponent', () => {
  let component: ChooseVacationModalComponent;
  let fixture: ComponentFixture<ChooseVacationModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseVacationModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseVacationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
