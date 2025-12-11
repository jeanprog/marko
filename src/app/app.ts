import { Component } from '@angular/core';
import { AttendanceComponent } from './components/attendance/attendance.component';

@Component({
  selector: 'app-root',
  imports: [AttendanceComponent],
  templateUrl: './app.html',
  standalone: true
})
export class App {}
