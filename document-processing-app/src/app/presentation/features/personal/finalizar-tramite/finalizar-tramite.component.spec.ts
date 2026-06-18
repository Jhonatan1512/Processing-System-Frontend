import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalizarTramiteComponent } from './finalizar-tramite.component';

describe('FinalizarTramiteComponent', () => {
  let component: FinalizarTramiteComponent;
  let fixture: ComponentFixture<FinalizarTramiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinalizarTramiteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinalizarTramiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
