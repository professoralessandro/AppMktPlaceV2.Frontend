import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDeliveryComponent } from './delete-delivery.component';

describe('DeleteDeliveryComponent', () => {
  let component: DeleteDeliveryComponent;
  let fixture: ComponentFixture<DeleteDeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteDeliveryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
