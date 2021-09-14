import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletarTipoWorkflowComponent } from './deletar-tipo-workflow.component';

describe('DeletarTipoWorkflowComponent', () => {
  let component: DeletarTipoWorkflowComponent;
  let fixture: ComponentFixture<DeletarTipoWorkflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletarTipoWorkflowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletarTipoWorkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
