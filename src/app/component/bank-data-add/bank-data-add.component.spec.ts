import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankDataAddComponent } from './bank-data-add.component';

describe('BankDataAddComponent', () => {
  let component: BankDataAddComponent;
  let fixture: ComponentFixture<BankDataAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankDataAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankDataAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
