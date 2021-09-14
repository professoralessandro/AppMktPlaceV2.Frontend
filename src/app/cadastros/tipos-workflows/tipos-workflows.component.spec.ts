import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposWorkflowsComponent } from './tipos-workflows.component';

describe('TiposWorkflowsComponent', () => {
  let component: TiposWorkflowsComponent;
  let fixture: ComponentFixture<TiposWorkflowsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TiposWorkflowsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TiposWorkflowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
