import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-image-viewer',
  standalone: false,
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.scss']
})
export class ImageViewerComponent implements OnInit, OnChanges {
  @Input() imageUrl: any;
  isValidImage: boolean = true;

    constructor(private sanitizer: DomSanitizer,
                ) {  
    }
  ngOnInit(): void {
    if (this.imageUrl) {
      this.onFetchImage();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['imageUrl'] && changes['imageUrl'].currentValue) {
      this.onFetchImage();
    }
  }

  onFetchImage(): void {
    this.imageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.imageUrl);
    if (this.imageUrl) {
      this.isValidImage = true;
    } else {
      this.isValidImage = false;
    }
  }

  onImageError(): void {
    this.isValidImage = false;
  }
}
