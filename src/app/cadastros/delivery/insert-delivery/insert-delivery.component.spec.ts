import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertDeliveryComponent } from './insert-delivery.component';

describe('InsertDeliveryComponent', () => {
  let component: InsertDeliveryComponent;
  let fixture: ComponentFixture<InsertDeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertDeliveryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
