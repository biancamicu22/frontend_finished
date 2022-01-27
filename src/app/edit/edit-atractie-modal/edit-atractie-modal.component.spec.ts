import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAtractieModalComponent } from './edit-atractie-modal.component';

describe('EditAtractieModalComponent', () => {
  let component: EditAtractieModalComponent;
  let fixture: ComponentFixture<EditAtractieModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAtractieModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAtractieModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
