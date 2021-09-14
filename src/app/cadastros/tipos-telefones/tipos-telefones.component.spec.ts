import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposTelefonesComponent } from './tipos-telefones.component';

describe('TiposTelefonesComponent', () => {
  let component: TiposTelefonesComponent;
  let fixture: ComponentFixture<TiposTelefonesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TiposTelefonesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TiposTelefonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
