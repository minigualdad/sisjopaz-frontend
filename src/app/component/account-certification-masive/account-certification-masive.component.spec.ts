import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountCertificationMasiveComponent } from './account-certification-masive.component';

describe('AccountCertificationMasiveComponent', () => {
  let component: AccountCertificationMasiveComponent;
  let fixture: ComponentFixture<AccountCertificationMasiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountCertificationMasiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountCertificationMasiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
