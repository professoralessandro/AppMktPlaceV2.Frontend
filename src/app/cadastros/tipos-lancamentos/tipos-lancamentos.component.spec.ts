import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposLancamentosComponent } from './tipos-lancamentos.component';

describe('TiposLancamentosComponent', () => {
  let component: TiposLancamentosComponent;
  let fixture: ComponentFixture<TiposLancamentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TiposLancamentosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TiposLancamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
