import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TimezoneService {
  constructor() {}

  convertDateToLocalTime(date: Date): string {
    const convertedDate = new Date(date);
    const currentTime = new Date();

    convertedDate.setHours(currentTime.getHours());
    convertedDate.setMinutes(currentTime.getMinutes());
    convertedDate.setSeconds(currentTime.getSeconds());
    convertedDate.setMilliseconds(currentTime.getMilliseconds());

    convertedDate.setMinutes(
      convertedDate.getMinutes() - convertedDate.getTimezoneOffset()
    );

    return convertedDate.toISOString();
  }
}
