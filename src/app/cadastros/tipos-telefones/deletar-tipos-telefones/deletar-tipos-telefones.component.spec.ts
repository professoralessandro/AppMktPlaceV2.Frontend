import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletarTiposTelefonesComponent } from './deletar-tipos-telefones.component';

describe('DeletarTiposTelefonesComponent', () => {
  let component: DeletarTiposTelefonesComponent;
  let fixture: ComponentFixture<DeletarTiposTelefonesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletarTiposTelefonesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletarTiposTelefonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
