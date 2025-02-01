import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountCertificationComponent } from './account-certification.component';

describe('AccountCertificationComponent', () => {
  let component: AccountCertificationComponent;
  let fixture: ComponentFixture<AccountCertificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountCertificationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountCertificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
