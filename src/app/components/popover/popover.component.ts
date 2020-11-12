import {Component, Renderer2} from '@angular/core';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent {

  checked = localStorage.getItem('dark-mode');

  constructor(
    private renderer: Renderer2
  ) {
  }

  darkMode(event) {
    if (event.detail.checked) {
      localStorage.setItem('dark-mode', 'true');
      this.renderer.setAttribute(document.body, 'color-theme', 'dark');
    } else {
      localStorage.setItem('dark-mode', 'false');
      this.renderer.setAttribute(document.body, 'color-theme', 'light');
    }
  }

}
