import { Component } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { MatSlideToggleChange } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private over: OverlayContainer) {}

  title = 'app';
  darkTheme = false;

  swichTheme(isDark: MatSlideToggleChange) {
    this.darkTheme = isDark.checked ;
    this.over.getContainerElement().classList.add("myapp-dark-theme");
  }
}