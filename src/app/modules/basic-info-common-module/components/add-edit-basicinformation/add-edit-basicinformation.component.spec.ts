import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditBasicinformationComponent } from './add-edit-basicinformation.component';

describe('AddEditBasicinformationComponent', () => {
  let component: AddEditBasicinformationComponent;
  let fixture: ComponentFixture<AddEditBasicinformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditBasicinformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditBasicinformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
