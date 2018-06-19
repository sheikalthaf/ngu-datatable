import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  dataSource = MyTableData;
}

export const MyTableData = [
  {
    name: 'Althaf',
    des: 'angular developer',
    location: 'chennai',
    project: 'llwr',
    exper: 2
  },
  {
    name: 'Haider',
    des: 'software developer',
    location: 'chennai',
    project: 'llwr',
    exper: 4
  }
];
