import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControlName, Validators, FormControl, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.compose([Validators.required, Validators.email])]],
      password: ['', Validators.required]

    });
  }
  onSubmit({value, valid}, event: Event) {
      event.preventDefault();
      this.form.controls['email'].setValidators(this.validate);
  }
  validate(c: FormControl): {[key: string]: any } {
      if (!c.value) {
        return null;
      }
  }
}
