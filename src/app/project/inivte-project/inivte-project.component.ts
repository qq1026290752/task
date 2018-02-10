import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inivte-project',
  templateUrl: './inivte-project.component.html',
  styleUrls: ['./inivte-project.component.scss']
})
export class InivteProjectComponent implements OnInit {
  items = [
    {
      id: '1',
      name: 'zhangsan'
    }, {
      id: '2',
      name: 'lisi'
    }, {
      id: '3',
      name: 'wangwu'
    }
  ];
  constructor() { }

  ngOnInit() {
  }
  displayUser(user: {id: String, name: String}) {
    return user.name;
  }

}
