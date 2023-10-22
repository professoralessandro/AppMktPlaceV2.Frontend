import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertProdutoComponent } from './insert-produto.component';

describe('InsertProdutoComponent', () => {
  let component: InsertProdutoComponent;
  let fixture: ComponentFixture<InsertProdutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertProdutoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
