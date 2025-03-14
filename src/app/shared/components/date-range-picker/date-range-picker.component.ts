import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'shared-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrl: './date-range-picker.component.css',
})
export class DateRangePickerComponent implements OnInit {
  @Input() inputStartDate!: Date;
  @Input() inputEndDate!: Date;
  @Output() sendDateRange = new EventEmitter<{
    startDate: Date;
    endDate: Date;
  }>();

  public startDate = new FormControl();
  public endDate = new FormControl();
  public errorMessage: string = '';

  ngOnInit(): void {
    this.startDate.setValue(this.inputStartDate);
    this.endDate.setValue(this.inputEndDate);

    this.startDate.valueChanges.subscribe((starDate) => {
      this.sendData(starDate, this.endDate.value);
    });

    this.endDate.valueChanges.subscribe((endDate) => {
      this.sendData(this.startDate.value, endDate);
    });
  }

  sendData(startDate: Date, endDate: Date) {
    if (startDate <= endDate) {
      this.sendDateRange.emit({ startDate, endDate });
      this.errorMessage = '';
    }

    if (startDate > endDate)
      this.errorMessage =
        'La fecha inicial no puede se mayor a la fecha final.';
  }
}
