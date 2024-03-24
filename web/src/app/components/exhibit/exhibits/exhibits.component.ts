import { Component, OnInit } from '@angular/core';
import { Exhibit, ExhibitService } from 'src/app/services/exhibit.service';

@Component({
  selector: 'exhibits',
  templateUrl: './exhibits.component.html',
  styleUrls: ['./exhibits.component.css']
})
export class ExhibitsComponent implements OnInit {

  exhibits: Exhibit[] = [];

  constructor(private exhibitService: ExhibitService) { }

  ngOnInit(): void {
    this.exhibitService.getExhibits().subscribe(response => {
      this.exhibits = response.exhibits;
    });
  }
}
