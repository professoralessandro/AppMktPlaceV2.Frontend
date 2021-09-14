import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletarTipoParametroComponent } from './deletar-tipo-parametro.component';

describe('DeletarTipoParametroComponent', () => {
  let component: DeletarTipoParametroComponent;
  let fixture: ComponentFixture<DeletarTipoParametroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletarTipoParametroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletarTipoParametroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
