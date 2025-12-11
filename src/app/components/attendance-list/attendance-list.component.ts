import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendanceRecord } from '../../models/attendance.model';

@Component({
  selector: 'app-attendance-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './attendance-list.component.html'
})
export class AttendanceListComponent {
  @Input() attendanceList: AttendanceRecord[] = [];
  @Output() edit = new EventEmitter<number>();
  @Output() remove = new EventEmitter<number>();

  onEdit(index: number): void {
    this.edit.emit(index);
  }

  onRemove(index: number): void {
    this.remove.emit(index);
  }
}

