import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-button-back',
  standalone: true,
  imports: [CommonModule, ],
  templateUrl: './button-back.component.html',
  styleUrl: './button-back.component.scss'
})
export class ButtonBackComponent {
  @Input() routeBack = "";

  constructor(private router: Router) {}

  back() {
    localStorage.removeItem("componentId")
    this.router.navigate([this.routeBack]);
  }

}
