import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpedientesCiudadanoComponent } from './expedientes-ciudadano.component';

describe('ExpedientesCiudadanoComponent', () => {
  let component: ExpedientesCiudadanoComponent;
  let fixture: ComponentFixture<ExpedientesCiudadanoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpedientesCiudadanoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpedientesCiudadanoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
