export enum ActionStatus {
    None = "none",
    Fetching = "fetching",
    Refreshing = "refreshing",
    LoadMore = "loadmore",
    Done = "done",
}

export enum StoreKey {
    Test = "Test",
    User = "User",
}

export const DateTimeFormat = {
    FullDateTime: 'DD/MM/YYYY hh:mm:ss',
    DateTimeAmPm: 'DD/MM/YYYY hh A',
    DateTime24h: 'DD/MM/YYYY HH:mm',
    Time: 'hh:mm:ss',
    FullDate: 'DD MMM YYYY',
    TimeHourMinPM: 'HH:mm A',
    FullDateDash: 'DD-MM-YYYY',
    APIFormat: 'YYYY-MM-DD HH:mm:ss',
    FullDateShortMonth: 'MMM DD, YYYY'
};

export enum EmitType {
    AppReadyForAuth = 'AppReadyForAuth'
}