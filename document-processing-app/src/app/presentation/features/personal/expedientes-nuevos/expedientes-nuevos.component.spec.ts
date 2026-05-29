import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpedientesNuevosComponent } from './expedientes-nuevos.component';

describe('ExpedientesNuevosComponent', () => {
  let component: ExpedientesNuevosComponent;
  let fixture: ComponentFixture<ExpedientesNuevosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpedientesNuevosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpedientesNuevosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
