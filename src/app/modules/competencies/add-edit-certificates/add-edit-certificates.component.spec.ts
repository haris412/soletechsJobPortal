import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCertificatesComponent } from './add-edit-certificates.component';

describe('AddEditCertificatesComponent', () => {
  let component: AddEditCertificatesComponent;
  let fixture: ComponentFixture<AddEditCertificatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditCertificatesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditCertificatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
