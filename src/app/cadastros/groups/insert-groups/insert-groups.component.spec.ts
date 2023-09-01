import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertGroupsComponent } from './insert-groups.component';

describe('InsertGroupsComponent', () => {
  let component: InsertGroupsComponent;
  let fixture: ComponentFixture<InsertGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertGroupsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
