import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionalLinkSelectorComponent } from './regional-link-selector.component';

describe('RegionalLinkSelectorComponent', () => {
  let component: RegionalLinkSelectorComponent;
  let fixture: ComponentFixture<RegionalLinkSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegionalLinkSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegionalLinkSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
