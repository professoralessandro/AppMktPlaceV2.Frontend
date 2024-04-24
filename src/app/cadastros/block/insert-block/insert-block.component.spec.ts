import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertBlockComponent } from './insert-block.component';

describe('InsertBlockComponent', () => {
  let component: InsertBlockComponent;
  let fixture: ComponentFixture<InsertBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertBlockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
