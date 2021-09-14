import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarTiposDocumentosComponent } from './cadastrar-tipos-documentos.component';

describe('CadastrarTiposDocumentosComponent', () => {
  let component: CadastrarTiposDocumentosComponent;
  let fixture: ComponentFixture<CadastrarTiposDocumentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastrarTiposDocumentosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarTiposDocumentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
