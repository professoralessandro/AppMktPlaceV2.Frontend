import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBlockComponent } from './delete-block.component';

describe('DeleteBlockComponent', () => {
  let component: DeleteBlockComponent;
  let fixture: ComponentFixture<DeleteBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteBlockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
