import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditIdentificationComponent } from './add-edit-identification.component';

describe('AddEditIdentificationComponent', () => {
  let component: AddEditIdentificationComponent;
  let fixture: ComponentFixture<AddEditIdentificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditIdentificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditIdentificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
