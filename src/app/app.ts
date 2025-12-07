import { Component, signal,NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import {AdUnit} from './ad-unit/ad-unit';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,FormsModule,NgxJsonViewerModule,AdUnit],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  userJson: string = '';
  parsedJson: any = null;
  error: string = '';
  copySuccess: string = '';

  parseJson() {
    try {
      this.parsedJson = JSON.parse(this.userJson);
      this.error = '';
    } catch (e) {
      this.error = 'Invalid JSON!';
      this.parsedJson = null;
    }
  }

    copyJson() {
    if (this.parsedJson) {
      const formattedJson = JSON.stringify(this.parsedJson, null, 2);
      navigator.clipboard.writeText(formattedJson).then(() => {
        this.copySuccess = 'JSON copied to clipboard!';
        setTimeout(() => (this.copySuccess = ''), 3000);
      });
    }
  }
}
