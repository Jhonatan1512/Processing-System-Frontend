import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecibirExpedienteComponent } from './recibir-expediente.component';

describe('RecibirExpedienteComponent', () => {
  let component: RecibirExpedienteComponent;
  let fixture: ComponentFixture<RecibirExpedienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecibirExpedienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecibirExpedienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
