import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';
import { Setting } from '../models/setting.model';

@Injectable({
    providedIn: 'root'
})
export class SettingsService implements OnInit {

    settings: BehaviorSubject<Setting[]> = new BehaviorSubject<Setting[]>([]);

    constructor (private httpClient: HttpClient, private authService: AuthService) {}

    ngOnInit() {}

    getSettings() {
        return this.httpClient.get<{ settings: Setting[] }>('http://localhost:8080/api/setting');
    }

    getSettingsByUser(userId: string) {
        return this.httpClient.get<{ settings: Setting[] }>('http://localhost:8080/api/settings/user/' + userId);
    }

    createSettingForUser(userId: string, setting: Setting) {
        return this.httpClient.post<Setting>('http://localhost:8080/api/settings/user/' + userId, setting);
    }

    updateSetting(setting: Setting) {
        return this.httpClient.put<Setting>('http://localhost:8080/api/setting', setting);
    }

    updateSettingForUser(userId: string, setting: Setting) {
        return this.httpClient.put<Setting>('http://localhost:8080/api/settings/' + userId, setting);
    }
}