import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompTitleComponent } from './comp-title.component';

describe('CompTitleComponent', () => {
  let component: CompTitleComponent;
  let fixture: ComponentFixture<CompTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompTitleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
