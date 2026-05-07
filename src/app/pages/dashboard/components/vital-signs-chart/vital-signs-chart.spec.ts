import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VitalSignsChart } from './vital-signs-chart';

describe('VitalSignsChart', () => {
  let component: VitalSignsChart;
  let fixture: ComponentFixture<VitalSignsChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VitalSignsChart],
    }).compileComponents();

    fixture = TestBed.createComponent(VitalSignsChart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
