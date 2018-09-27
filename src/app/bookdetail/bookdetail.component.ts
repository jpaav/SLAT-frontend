import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bookdetail',
  templateUrl: './bookdetail.component.html',
  styleUrls: ['./bookdetail.component.css']
})
export class BookdetailComponent implements OnInit {
  checkedIn = false;
  constructor() { }

  ngOnInit() {
  }

}
