import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  items: string[];
  form: FormGroup;
  private readonly avatarName = 'avatars';
  constructor(private fb: FormBuilder) { }
  ngOnInit() {
    const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    this.items = nums.map(num => `avatars:svg-${num}`);
    const img = `${this.avatarName}:svg-${Math.floor(Math.random() * nums.length ).toFixed(0)}`;
    this.form = this.fb.group({
      email : ['',  [Validators.compose([Validators.required, Validators.email])]],
      nikeName: ['', Validators.required],
      password: [],
      repeat: [],
      avatar: [img],
      dateOfBirth : ['2018-01-01']
    });
    console.log(this.form.get('dateOfBirth').value);
  }

  onSubmit({value, valid}, event: Event) {
    // 防止表单默认行为
    event.preventDefault();
    if (!valid) {
      return ;
    }
    console.log(valid);
  }
}
