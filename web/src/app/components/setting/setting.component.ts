import { Component, Input, OnInit } from '@angular/core';
import { Setting } from 'src/app/models/setting.model';

@Component({
  selector: 'setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  @Input() setting!: Setting;
  
  constructor() { }

  ngOnInit(): void {
  }

}
