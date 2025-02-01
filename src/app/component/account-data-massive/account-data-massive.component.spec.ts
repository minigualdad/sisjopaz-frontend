import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountDataMassiveComponent } from './account-data-massive.component';

describe('AccountDataMassiveComponent', () => {
  let component: AccountDataMassiveComponent;
  let fixture: ComponentFixture<AccountDataMassiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountDataMassiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountDataMassiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
