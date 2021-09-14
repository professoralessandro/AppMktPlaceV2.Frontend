import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposDocumentosComponent } from './tipos-documentos.component';

describe('TiposDocumentosComponent', () => {
  let component: TiposDocumentosComponent;
  let fixture: ComponentFixture<TiposDocumentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TiposDocumentosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TiposDocumentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
