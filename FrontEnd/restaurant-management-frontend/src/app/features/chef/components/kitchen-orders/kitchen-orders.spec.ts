import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitchenOrders } from './kitchen-orders';

describe('KitchenOrders', () => {
  let component: KitchenOrders;
  let fixture: ComponentFixture<KitchenOrders>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KitchenOrders]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KitchenOrders);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
