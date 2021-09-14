import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarTipoParametroComponent } from './cadastrar-tipo-parametro.component';

describe('CadastrarTipoParametroComponent', () => {
  let component: CadastrarTipoParametroComponent;
  let fixture: ComponentFixture<CadastrarTipoParametroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastrarTipoParametroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarTipoParametroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
