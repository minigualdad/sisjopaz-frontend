import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';

@Component({
    selector: 'app-drawer',
    standalone: true,
    imports: [],
    templateUrl: './drawer.component.html',
    styleUrl: './drawer.component.scss'
})
export class DrawerComponent {
  @ViewChild('signaturePad', { static: false }) signaturePad!: ElementRef<HTMLCanvasElement>;
  @Output() signatureListen: EventEmitter<any> = new EventEmitter();

  private ctx!: CanvasRenderingContext2D;
  private drawing = false;

  ngAfterViewInit(): void {
    const canvas = this.signaturePad.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Event listeners para el mouse
    canvas.addEventListener('mousedown', this.startDrawing.bind(this));
    canvas.addEventListener('mousemove', this.draw.bind(this));
    canvas.addEventListener('mouseup', this.endDrawing.bind(this));
    canvas.addEventListener('mouseleave', this.endDrawing.bind(this));

    // Event listeners para pantallas táctiles
    canvas.addEventListener('touchstart', (e) => this.startDrawing(e.touches[0]));
    canvas.addEventListener('touchmove', (e) => this.draw(e.touches[0]));
    canvas.addEventListener('touchend', this.endDrawing.bind(this));
  }

  private startDrawing(event: MouseEvent | Touch): void {
    this.drawing = true;
    this.ctx.beginPath();
    this.ctx.moveTo(
      (event as MouseEvent).offsetX || (event as Touch).clientX - this.signaturePad.nativeElement.getBoundingClientRect().left,
      (event as MouseEvent).offsetY || (event as Touch).clientY - this.signaturePad.nativeElement.getBoundingClientRect().top
    );
  }

  private draw(event: MouseEvent | Touch): void {
    if (!this.drawing) return;
    this.ctx.lineTo(
      (event as MouseEvent).offsetX || (event as Touch).clientX - this.signaturePad.nativeElement.getBoundingClientRect().left,
      (event as MouseEvent).offsetY || (event as Touch).clientY - this.signaturePad.nativeElement.getBoundingClientRect().top
    );
    this.ctx.strokeStyle = '#000';
    this.ctx.lineWidth = 2;
    this.ctx.stroke();
  }

  private endDrawing(): void {
    this.drawing = false;
    this.ctx.closePath();
  }

  clearSignature(): void {
    this.ctx.clearRect(0, 0, this.signaturePad.nativeElement.width, this.signaturePad.nativeElement.height);
  }

  downloadSignature(): void {
    // Obtener la imagen en formato base64
    const base64Data = this.signaturePad.nativeElement.toDataURL('image/png');
    
    // Convertir base64 a Blob
    const byteString = atob(base64Data.split(',')[1]);
    const mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
  
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
  
    const blob = new Blob([ab], { type: mimeString });
  
    // Crear un archivo a partir del Blob
    const file = new File([blob], 'firma.png', { type: 'image/png' });
  
    // Emitir el archivo
    this.signatureListen.emit(file);
  
    // Descargar el archivo (opcional)
    // const link = document.createElement('a');
    // link.download = 'firma.png';
    // link.href = URL.createObjectURL(file);
    // link.click();
  }
  
  
}
