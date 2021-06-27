import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatrouilleComponent } from './patrouille.component';

describe('PatrouilleComponent', () => {
  let component: PatrouilleComponent;
  let fixture: ComponentFixture<PatrouilleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatrouilleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatrouilleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
