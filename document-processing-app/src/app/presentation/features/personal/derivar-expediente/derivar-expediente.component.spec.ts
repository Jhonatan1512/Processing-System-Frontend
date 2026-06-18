import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DerivarExpedienteComponent } from './derivar-expediente.component';

describe('DerivarExpedienteComponent', () => {
  let component: DerivarExpedienteComponent;
  let fixture: ComponentFixture<DerivarExpedienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DerivarExpedienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DerivarExpedienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
