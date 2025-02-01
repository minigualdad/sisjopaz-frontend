import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionalLinkAddComponent } from './regional-link-add.component';

describe('RegionalLinkAddComponent', () => {
  let component: RegionalLinkAddComponent;
  let fixture: ComponentFixture<RegionalLinkAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegionalLinkAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegionalLinkAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
