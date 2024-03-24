import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from 'express';
import { Exhibit, ExhibitService } from 'src/app/services/exhibit.service';

@Component({
  selector: 'exhibit',
  templateUrl: './exhibit.component.html',
  styleUrls: ['./exhibit.component.css']
})
export class ExhibitComponent implements OnInit {
  
  @Input() exhibit!: Exhibit;

  constructor() { }

  ngOnInit(): void {
  }

}
