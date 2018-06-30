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
import { DateAdapter } from '@angular/material';

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
  // 表单初始化
  ngOnInit(): void {
    this.form = this.fb.group({
      birthday: ['', this.validateDate],
      age: this.fb.group({
        ageNum: [],
        ageUnit: [AgeUnit.Year]
      }, { validator: this.validateAge('ageNum', 'ageUnit')})
    });
    // 得到表单控件
    const birthday = this.form.get('birthday');
    const ageNum = this.form.get('age').get('ageNum');
    const ageUnit = this.form.get('age').get('ageUnit');
    // 生日流 选择日期可以组成天
    const birthday$ = birthday.valueChanges
      .map(d => {
        return {date: d, from: 'birthday'};
      })
      .filter(_ => birthday.valid)
      // 设置控件延迟触发时间
      .debounceTime(this.debounceTime)
      .distinctUntilChanged();
    //
    const ageNum$ = ageNum.valueChanges
      // 设置控件初始值
      .startWith(ageNum.value)
      // 设置控件延迟触发时间
      .debounceTime(this.debounceTime)
      .distinctUntilChanged();
    //
    const ageUnit$ = ageUnit.valueChanges.
        // 设置控件初始值
        startWith(ageUnit.value)
        // 设置控件延迟触发时间
        .debounceTime(this.debounceTime)
        // 忽略未改变的值
        .distinctUntilChanged();
    // ageNum ageUnit合并流组成年龄 改变日期 TOdate
    const age$ = Observable.combineLatest(ageNum$, ageUnit$, (_n, _u ) => {
        return this.toDate({age: _n, unit: _u});
      })
      .map(d => {
        return {date: d, from: 'age'};
       })
      .filter(_ => this.form.get('age').valid);
    // 流的合并
    const merged$ = Observable.merge(birthday$, age$).
        filter(_ => this.form.valid);
    // 判断数据流传入的方向
    this.sub = merged$.subscribe(d => {
      const age = this.toAge(d.date);
      if (d.from === 'birthday') {
          console.log('合并的输入流来自birthday');
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
        console.log('获取得到当前用户输入的日期:%s', ageToCompare.age );
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
      const date =  format(obj, 'YYYY-MM-DD');
      this.form.get('birthday').patchValue( date );
      const age = this.toAge(date);
      console.log('计算的age值为:%s,unit值为:%s', age.age, age.unit);
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
        };
    };
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {

  }
  toAge(dateStr: string): Age {
    const date = parse(dateStr);
    const now = Date.now();
    const age = isBefore(subDays(now, this.daysTop), date) ?
           {age: differenceInDays(now, date), unit: AgeUnit.Day} :
              isBefore(subMonths(now , this.monthsTop), date) ?
           {age: differenceInMonths(now, date), unit: AgeUnit.Month} :
           {age: differenceInYears(now , date), unit: AgeUnit.Year};
    return age;
  }

  toDate(age: Age): string {
    console.log('传入的时间日期为:%s,传入的时间单位为:%s', age.age, age.unit);
    let times = '';
    const now = Date.now();
    const dateFormt = 'YYYY-MM-DD';
    switch (age.unit) {
      case AgeUnit.Year: {
          times =  format(subYears(now, age.age), dateFormt);
          console.log('年:构造完成的日期为:%s', times);
          return times ;
      }
      case AgeUnit.Month: {
          times =  format(subYears(now, age.age), dateFormt);
          console.log('月:构造完成的日期为:%s', times);
          return times;
      }
      case AgeUnit.Day: {
          times =  format(subYears(now, age.age), dateFormt);
          console.log('日:构造完成的日期为:%s', times);
          return times;
      }
      default: {
        return null;
      }
    }
  }
}
