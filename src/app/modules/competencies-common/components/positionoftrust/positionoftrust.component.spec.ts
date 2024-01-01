import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionoftrustComponent } from './positionoftrust.component';

describe('PositionoftrustComponent', () => {
  let component: PositionoftrustComponent;
  let fixture: ComponentFixture<PositionoftrustComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PositionoftrustComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PositionoftrustComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
