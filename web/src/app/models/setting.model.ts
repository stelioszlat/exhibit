export interface Setting {
    settingType: SettingType,
    settingValue: string | number | boolean
}

export enum SettingType {
    EXHIBITS_PER_PAGE,
    CATALOGS_PER_PAGE,
    CATEGORIES_PER_PAGE
}