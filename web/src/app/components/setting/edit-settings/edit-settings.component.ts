import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Setting } from 'src/app/models/setting.model';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'edit-settings',
  templateUrl: './edit-settings.component.html',
  styleUrls: ['./edit-settings.component.css']
})
export class EditSettingsComponent implements OnInit {

  settings: Setting[] = [];

  newSettingForm: UntypedFormGroup = this.fb.group({
    settingType: ['', Validators.required],
    settingValue: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, private settingsService: SettingsService) { }

  ngOnInit(): void {
    this.settingsService.getSettings().subscribe(response => {
      this.settings = response.settings;
    })
  }

  selectSettingType(event: MatAutocompleteSelectedEvent ): void {
    this.newSettingForm.controls['settingValue'].setValue(this.settings.find(setting => { 
      return setting.settingType == this.newSettingForm.controls['settingType'].value;
    })?.settingValue);
  }

  updateSetting(event: any): void {
    const newSetting: Setting = {
      settingType: this.newSettingForm.controls['settingType'].value,
      settingValue: this.newSettingForm.controls['settingValue'].value
    } as Setting
    this.settingsService.updateSetting(newSetting).subscribe({
      next: (response) => {},
      error: (error) => {
        console.log(error);
      },
      complete: () => {}
    });
  }
}
