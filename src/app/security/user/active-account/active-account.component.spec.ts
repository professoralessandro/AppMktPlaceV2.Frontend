import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveAccountComponent } from './active-account.component';

describe('ActiveAccountComponent', () => {
  let component: ActiveAccountComponent;
  let fixture: ComponentFixture<ActiveAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
