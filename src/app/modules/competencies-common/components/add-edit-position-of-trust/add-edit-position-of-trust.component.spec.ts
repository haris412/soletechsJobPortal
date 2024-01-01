import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditPositionOfTrustComponent } from './add-edit-position-of-trust.component';

describe('AddEditPositionOfTrustComponent', () => {
  let component: AddEditPositionOfTrustComponent;
  let fixture: ComponentFixture<AddEditPositionOfTrustComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditPositionOfTrustComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditPositionOfTrustComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
