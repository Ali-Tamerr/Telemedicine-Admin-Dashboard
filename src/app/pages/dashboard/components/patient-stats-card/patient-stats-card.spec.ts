import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientStatsCard } from './patient-stats-card';

describe('PatientStatsCard', () => {
  let component: PatientStatsCard;
  let fixture: ComponentFixture<PatientStatsCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PatientStatsCard],
    }).compileComponents();

    fixture = TestBed.createComponent(PatientStatsCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
