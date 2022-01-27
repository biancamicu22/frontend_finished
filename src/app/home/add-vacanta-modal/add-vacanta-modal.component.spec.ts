import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVacantaModalComponent } from './add-vacanta-modal.component';

describe('AddVacantaModalComponent', () => {
  let component: AddVacantaModalComponent;
  let fixture: ComponentFixture<AddVacantaModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddVacantaModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVacantaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
