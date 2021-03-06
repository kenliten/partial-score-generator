import { Component, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';

@Component({
  selector: 'app-average-calculator',
  templateUrl: './average-calculator.component.html',
  styleUrls: ['./average-calculator.component.scss']
})
export class AverageCalculatorComponent implements OnInit {

  partial: UntypedFormControl = new UntypedFormControl(85);
  record: number[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  onKeyUp(event: any) {
    if (event.key == 'Enter') {
      this.addPartial();
    }
  }

  addPartial() {
    this.record.push(this.partial.value);
    this.partial.reset();
  }

  get average() {
    return this.record.length > 0 ? this.record.reduce((l, n) => l + n, 0) / this.record.length : 0;
  }

  clear() {
    this.partial.setValue(85);
    this.record = [];
  }

}
