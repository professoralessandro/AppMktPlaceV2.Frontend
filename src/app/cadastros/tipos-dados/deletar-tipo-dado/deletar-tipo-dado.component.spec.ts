import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletarTipoDadoComponent } from './deletar-tipo-dado.component';

describe('DeletarTipoDadoComponent', () => {
  let component: DeletarTipoDadoComponent;
  let fixture: ComponentFixture<DeletarTipoDadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletarTipoDadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletarTipoDadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
