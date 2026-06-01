import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalAdminComponent } from './personal-admin.component';

describe('PersonalAdminComponent', () => {
  let component: PersonalAdminComponent;
  let fixture: ComponentFixture<PersonalAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonalAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
