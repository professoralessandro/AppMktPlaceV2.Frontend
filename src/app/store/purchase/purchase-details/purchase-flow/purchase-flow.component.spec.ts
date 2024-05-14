import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseFlowComponent } from './purchase-flow.component';

describe('PurchaseFlowComponent', () => {
  let component: PurchaseFlowComponent;
  let fixture: ComponentFixture<PurchaseFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseFlowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
