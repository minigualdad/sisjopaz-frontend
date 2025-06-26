import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageGroupComponentComponent } from './image-group-component.component';

describe('ImageGroupComponentComponent', () => {
  let component: ImageGroupComponentComponent;
  let fixture: ComponentFixture<ImageGroupComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageGroupComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageGroupComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
