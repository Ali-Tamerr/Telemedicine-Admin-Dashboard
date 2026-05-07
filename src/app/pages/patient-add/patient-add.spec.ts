import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientAdd } from './patient-add';

describe('PatientAdd', () => {
  let component: PatientAdd;
  let fixture: ComponentFixture<PatientAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PatientAdd],
    }).compileComponents();

    fixture = TestBed.createComponent(PatientAdd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
