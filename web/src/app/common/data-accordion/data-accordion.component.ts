import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'data-accordion',
  templateUrl: './data-accordion.component.html',
  styleUrls: ['./data-accordion.component.css']
})
export class DataAccordionComponent implements OnInit {

  @Input() data: any[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
