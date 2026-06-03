import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterFormExpedienteComponent } from './register-form-expediente.component';

describe('RegisterFormExpedienteComponent', () => {
  let component: RegisterFormExpedienteComponent;
  let fixture: ComponentFixture<RegisterFormExpedienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterFormExpedienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterFormExpedienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
