import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposParametrosComponent } from './tipos-parametros.component';

describe('TiposParametrosComponent', () => {
  let component: TiposParametrosComponent;
  let fixture: ComponentFixture<TiposParametrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TiposParametrosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TiposParametrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
