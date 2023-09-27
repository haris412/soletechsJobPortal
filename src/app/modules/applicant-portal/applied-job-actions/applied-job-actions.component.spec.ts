import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppliedJobActionsComponent } from './applied-job-actions.component';

describe('AppliedJobActionsComponent', () => {
  let component: AppliedJobActionsComponent;
  let fixture: ComponentFixture<AppliedJobActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppliedJobActionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppliedJobActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
