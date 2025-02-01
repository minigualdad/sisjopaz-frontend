import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersAdminCreateComponent } from './users-admin-create.component';

describe('UsersAdminCreateComponent', () => {
  let component: UsersAdminCreateComponent;
  let fixture: ComponentFixture<UsersAdminCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersAdminCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersAdminCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
