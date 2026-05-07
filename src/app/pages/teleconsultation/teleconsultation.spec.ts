import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Teleconsultation } from './teleconsultation';

describe('Teleconsultation', () => {
  let component: Teleconsultation;
  let fixture: ComponentFixture<Teleconsultation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Teleconsultation],
    }).compileComponents();

    fixture = TestBed.createComponent(Teleconsultation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
