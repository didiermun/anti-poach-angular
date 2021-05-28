import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePatrouilleComponent } from './delete-pat.component';

describe('DeletePatrouilleComponent', () => {
  let component: DeletePatrouilleComponent;
  let fixture: ComponentFixture<DeletePatrouilleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletePatrouilleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletePatrouilleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
