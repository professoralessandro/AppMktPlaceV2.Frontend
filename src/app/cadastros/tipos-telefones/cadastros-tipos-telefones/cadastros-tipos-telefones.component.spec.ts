import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrosTiposTelefonesComponent } from './cadastros-tipos-telefones.component';

describe('CadastrosTiposTelefonesComponent', () => {
  let component: CadastrosTiposTelefonesComponent;
  let fixture: ComponentFixture<CadastrosTiposTelefonesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastrosTiposTelefonesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrosTiposTelefonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
