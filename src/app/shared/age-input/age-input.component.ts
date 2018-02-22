import { Component, Input, forwardRef, OnInit, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS,  FormControl,
    FormBuilder, FormGroup } from '@angular/forms';
import { combineLatest} from 'rxjs/observable/combineLatest';
import { merge } from 'rxjs/observable/merge';
import {
  subYears,
  subMonths,
  subDays,
  differenceInYears,
  differenceInDays,
  differenceInMonths,
  isBefore,
  parse,
  format,
  isDate,
  isFuture
} from 'date-fns';
import { isValidDate } from '../../utlis/date.util';
import { Subscriber } from 'rxjs/Subscriber';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
export enum AgeUnit {
  Year = 0,
  Month = 1,
  Day = 2
}
export interface Age {
  age: number;
  unit: AgeUnit ;
}


@Component({
  selector: 'app-age-input',
  templateUrl: './age-input.component.html',
  styleUrls: ['./age-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AgeInputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AgeInputComponent),
      multi: true
    }
  ]
})
export class AgeInputComponent implements ControlValueAccessor, OnDestroy , OnInit {
  form: FormGroup;
  constructor(private fb: FormBuilder) { }
  selectedUnit = AgeUnit.Year ;
  sub: Subscription ;
  @Input() daysTop = 90;
  @Input() daysBottom = 0;
  @Input() monthsTop = 24;
  @Input() monthsBottom = 1;
  @Input() yearsBottom = 1;
  @Input() yearsTop = 150;
  @Input() debounceTime = 300;
  ageUnits = [
    {value: AgeUnit.Year, label: '岁' },
    {value: AgeUnit.Month, label: '月' },
    {value: AgeUnit.Day, label: '天' }
  ];
  ngOnInit(): void {
    this.form = this.fb.group({
      birthday: ['', this.validateDate],
      age: this.fb.group({
        ageNum: [],
        ageUnit: [AgeUnit.Year]
      }, { validator: this.validateAge('ageNum', 'ageUnit')}),
    });
    const birthday = this.form.get('birthday');
    const ageNum = this.form.get('age').get('ageNum');
    const ageUnit = this.form.get('age').get('ageUnit');
    const birthday$ = birthday.valueChanges
      .map(d => {
        return {date: d, from: 'birthday'};
      })
      .filter(_ => birthday.valid)
      .debounceTime(this.debounceTime)
      .distinctUntilChanged();
    const ageNum$ = ageNum.valueChanges
      .startWith(ageNum.value)
      .debounceTime(this.debounceTime)
      .distinctUntilChanged();
    const ageUnit$ = ageUnit.valueChanges.
        startWith(ageUnit.value)
        .debounceTime(this.debounceTime)
        .distinctUntilChanged();
    const age$ = Observable.combineLatest(ageNum$, ageUnit$, (_n, _u ) => {
        return this.toDate({age: _n, unit: _u});
      }).map(d => {
        return {date: d, from: 'age'};
      }).filter(_ => this.form.get('age').valid);
    const merged$ = Observable.merge(birthday$, age$).
        filter(_ => this.form.valid);
    this.sub = merged$.subscribe(d => {
      const age = this.toAge(d.date);
      if (d.from === 'birthday') {
          if (age.age !== ageNum.value) {
              ageNum.patchValue(age.age, {emitEvent: false});
          }
          if (age.unit !== ageUnit.value) {
            this.selectedUnit = age.unit;
            ageUnit.patchValue(age.unit, {emitEvent: false});
        }
        this.propagateChange(d.date);
      } else {
        const ageToCompare = this.toAge(birthday.value);
        if (age.age !== ageToCompare.age || age.unit !== ageToCompare.unit) {
          birthday.patchValue( d.date , { emitEvent: false});
          this.propagateChange(d.date);
        }
      }
    });
  }
  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
  private propagateChange = (_: any) => {};
  writeValue(obj: any): void {
    if (obj) {
      const date =  format(obj, 'YYYY-MM-dd');
      this.form.get('birthday').patchValue( date );
      const age = this.toAge(date);
      this.form.get('age').get('ageNum').patchValue(age.age);
      this.form.get('age').get('ageUnit').patchValue(age.unit);
    }
  }
  validate(c: FormControl): { [key: string]: any} {
    const val = c.value ;
    if (!val) {
      return null ;
    }
    if (isValidDate(val)) {
      return null;
    }
    return {
      dateOfBirthdayInvalid: true
    };
  }
  validateDate(c: FormControl): { [key: string]: any} {
    const value = c.value;
    return  isValidDate(value) ? null : {
               birthdayInvalid: true
            };
  }
  validateAge(ageNumKey: string, ageUnitKey: string) {
    return (group: FormGroup): {[key: string]: any} => {
        const ageNum = group.controls[ageNumKey];
        const ageUnit = group.controls[ageUnitKey];
        let result = false;
        const ageNumValue = ageNum.value;
        switch (ageUnit.value) {
          case AgeUnit.Year: {
            result = ageNumValue >= this.yearsBottom && ageNumValue < this.yearsTop ;
            break;
          }
          case AgeUnit.Month: {
            result = ageNumValue >= this.monthsBottom && ageNumValue < this.monthsTop ;
            break;
          }
          case AgeUnit.Day: {
            result = ageNumValue >= this.daysBottom && ageNumValue < this.daysTop ;
            break;
          }
          default: {
            break;
          }
        }
        return result ? null : {
          ageInvalid: true
        }
    };
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {

  }
  toAge(dateStr: string): Age {
    const newDate = parse(dateStr);
    const now = Date.now();
    return isBefore(subDays(now, this.daysTop), newDate) ?
           {age: differenceInDays(now, newDate), unit: AgeUnit.Day} :
              isBefore(subMonths(now , this.monthsTop), newDate) ?
           {age: differenceInMonths(now, newDate), unit: AgeUnit.Day} :
          {
            age: differenceInYears(now , newDate),
            unit: AgeUnit.Year
          };
  }

  toDate(age: Age): string {
    const now = Date.now();
    const dateFormt = 'yyyy-MM-dd';
    switch (age.unit) {
      case AgeUnit.Year: {
          return format(subYears(now, age.age), dateFormt);
      }
      case AgeUnit.Month: {
        return format(subMonths(now, age.age), dateFormt);
      }
      case AgeUnit.Day: {
        return format(subDays(now, age.age), dateFormt);
      }
      default: {
        return null;
      }
    }
  }
}
