import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCazareModalComponent } from './edit-cazare-modal.component';

describe('EditCazareModalComponent', () => {
  let component: EditCazareModalComponent;
  let fixture: ComponentFixture<EditCazareModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCazareModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCazareModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
