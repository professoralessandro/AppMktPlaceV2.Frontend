import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpinateComponent } from './opinate.component';

describe('OpinateComponent', () => {
  let component: OpinateComponent;
  let fixture: ComponentFixture<OpinateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpinateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpinateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
