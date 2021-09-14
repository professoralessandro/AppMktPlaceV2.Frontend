import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletarTiposDocumentosComponent } from './deletar-tipos-documentos.component';

describe('DeletarTiposDocumentosComponent', () => {
  let component: DeletarTiposDocumentosComponent;
  let fixture: ComponentFixture<DeletarTiposDocumentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletarTiposDocumentosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletarTiposDocumentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
