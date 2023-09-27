import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalCheckUpComponent } from './medical-check-up.component';

describe('MedicalCheckUpComponent', () => {
  let component: MedicalCheckUpComponent;
  let fixture: ComponentFixture<MedicalCheckUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicalCheckUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicalCheckUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
