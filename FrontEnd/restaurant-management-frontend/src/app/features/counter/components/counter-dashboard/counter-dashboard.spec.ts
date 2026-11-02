import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterDashboard } from './counter-dashboard';

describe('CounterDashboard', () => {
  let component: CounterDashboard;
  let fixture: ComponentFixture<CounterDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CounterDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CounterDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
