import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocsIdentificationComponent } from './docs-identification.component';

describe('DocsIdentificationComponent', () => {
  let component: DocsIdentificationComponent;
  let fixture: ComponentFixture<DocsIdentificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocsIdentificationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocsIdentificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
