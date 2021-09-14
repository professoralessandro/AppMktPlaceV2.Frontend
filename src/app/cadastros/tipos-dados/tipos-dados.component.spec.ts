import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposDadosComponent } from './tipos-dados.component';

describe('TiposDadosComponent', () => {
  let component: TiposDadosComponent;
  let fixture: ComponentFixture<TiposDadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TiposDadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TiposDadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
