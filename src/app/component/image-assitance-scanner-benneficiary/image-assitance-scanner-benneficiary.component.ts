import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-assitance-scanner-benneficiary',
  standalone: false,
  templateUrl: './image-assitance-scanner-benneficiary.component.html',
  styleUrl: './image-assitance-scanner-benneficiary.component.scss'
})
export class ImageAssitanceScannerBenneficiaryComponent implements OnInit{
  @Input() originalImages: string[] = [];
  @Input() processedImages: string[] = [];
  
  currentIndex: number = 0;

  constructor(){
  }
  ngOnInit(): void {
  }
  
    get maxLength(): number {
      return Math.max(this.originalImages.length, this.processedImages.length);
    }
  
    nextImage() {
      this.currentIndex = (this.currentIndex + 1) % this.maxLength;
    }
  
    prevImage() {
      this.currentIndex = (this.currentIndex - 1 + this.maxLength) % this.maxLength;
    }
  
    get currentOriginalImage(): string | null {
      return this.originalImages.length > this.currentIndex ? this.originalImages[this.currentIndex] : null;
    }
  
    get currentProcessedImage(): string | null {
      return this.processedImages.length > this.currentIndex ? this.processedImages[this.currentIndex] : null;
    }
}
