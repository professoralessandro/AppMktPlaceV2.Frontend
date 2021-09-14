import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarTipoWorkflowComponent } from './cadastrar-tipo-workflow.component';

describe('CadastrarTipoWorkflowComponent', () => {
  let component: CadastrarTipoWorkflowComponent;
  let fixture: ComponentFixture<CadastrarTipoWorkflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastrarTipoWorkflowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarTipoWorkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
