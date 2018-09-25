import {Component} from '@angular/core';
import * as $ from 'jquery';
import * as M from 'materialize-css';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Library';

  ngOnInit() {
    M.AutoInit();
  }
}
