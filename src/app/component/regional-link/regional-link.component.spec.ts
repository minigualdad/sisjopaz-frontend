import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionalLinkComponent } from './regional-link.component';

describe('RegionalLinkComponent', () => {
  let component: RegionalLinkComponent;
  let fixture: ComponentFixture<RegionalLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegionalLinkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegionalLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
