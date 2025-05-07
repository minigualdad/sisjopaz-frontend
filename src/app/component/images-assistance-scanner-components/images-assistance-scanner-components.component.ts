import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-images-assistance-scanner-components',
  standalone: false,
  templateUrl: './images-assistance-scanner-components.component.html',
  styleUrl: './images-assistance-scanner-components.component.scss'
})
export class ImagesAssistanceScannerComponentsComponent {
  @Input() groupedUrls: any[] = [];
  
  currentComponentIndex = 0;
  currentImageIndex = 0;
  
  currentComponentName = '';
  currentOriginalImages: string[] = [];
  currentProcessedImages: string[] = [];
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['groupedUrls'] && this.groupedUrls.length > 0) {
      this.loadComponentData(0);
    }
  }
  
  loadComponentData(index: number) {
    this.currentComponentIndex = index;
    const currentGroup = this.groupedUrls[index];
    this.currentComponentName = Object.keys(currentGroup)[0];
    
    const componentData = currentGroup[this.currentComponentName];
    this.currentOriginalImages = componentData.urlFileImageOriginal || [];
    this.currentProcessedImages = componentData.urlFileImageProcessed || [];
    
    // Reset image index when changing component
    this.currentImageIndex = 0;
  }
  
  get currentOriginalImage(): string {
    return this.currentOriginalImages[this.currentImageIndex];
  }
  
  get currentProcessedImage(): string {
    return this.currentProcessedImages[this.currentImageIndex];
  }
  
  get maxLength(): number {
    return Math.max(this.currentOriginalImages.length, this.currentProcessedImages.length);
  }
  
  prevComponent() {
    const newIndex = (this.currentComponentIndex - 1 + this.groupedUrls.length) % this.groupedUrls.length;
    this.loadComponentData(newIndex);
  }
  
  nextComponent() {
    const newIndex = (this.currentComponentIndex + 1) % this.groupedUrls.length;
    this.loadComponentData(newIndex);
  }
  
  prevImage() {
    this.currentImageIndex = (this.currentImageIndex - 1 + this.maxLength) % this.maxLength;
  }
  
  nextImage() {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.maxLength;
  }
}
