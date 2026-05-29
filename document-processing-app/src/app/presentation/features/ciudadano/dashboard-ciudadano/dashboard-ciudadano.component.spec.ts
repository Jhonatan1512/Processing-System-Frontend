import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCiudadanoComponent } from './dashboard-ciudadano.component';

describe('DashboardCiudadanoComponent', () => {
  let component: DashboardCiudadanoComponent;
  let fixture: ComponentFixture<DashboardCiudadanoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardCiudadanoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardCiudadanoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
