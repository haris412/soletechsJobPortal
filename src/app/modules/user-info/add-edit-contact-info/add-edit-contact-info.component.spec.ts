import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditContactInfoComponent } from './add-edit-contact-info.component';

describe('AddEditContactInfoComponent', () => {
  let component: AddEditContactInfoComponent;
  let fixture: ComponentFixture<AddEditContactInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditContactInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditContactInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
