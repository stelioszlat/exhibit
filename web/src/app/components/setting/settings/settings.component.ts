import { Component, OnInit } from '@angular/core';
import { Setting } from 'src/app/models/setting.model';
import { AuthService } from 'src/app/services/auth.service';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  settings: Setting[] = [];

  constructor(private settingsService: SettingsService, private authService: AuthService) { }

  ngOnInit(): void {
    this.settingsService.getSettings().subscribe(response => {
      this.settings = response.settings
    })
  }

}
