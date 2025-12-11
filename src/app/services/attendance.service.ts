import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AttendanceRecord } from '../models/attendance.model';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private attendanceList: AttendanceRecord[] = [];
  private attendanceSubject = new BehaviorSubject<AttendanceRecord[]>([]);

  public attendance$: Observable<AttendanceRecord[]> = this.attendanceSubject.asObservable();

  constructor() {}

  addRecord(record: AttendanceRecord): void {
    const recordWithTimestamp: AttendanceRecord = {
      ...record,
      timestamp: new Date()
    };
    
    this.attendanceList.push(recordWithTimestamp);
    this.attendanceSubject.next([...this.attendanceList]);
  }

  updateRecord(index: number, record: AttendanceRecord): void {
    if (index >= 0 && index < this.attendanceList.length) {
      this.attendanceList[index] = {
        ...record,
        timestamp: this.attendanceList[index].timestamp
      };
      this.attendanceSubject.next([...this.attendanceList]);
    }
  }

  removeRecord(index: number): void {
    if (index >= 0 && index < this.attendanceList.length) {
      this.attendanceList.splice(index, 1);
      this.attendanceSubject.next([...this.attendanceList]);
    }
  }

  getRecord(index: number): AttendanceRecord | null {
    if (index >= 0 && index < this.attendanceList.length) {
      return { ...this.attendanceList[index] };
    }
    return null;
  }

  getRecords(): AttendanceRecord[] {
    return [...this.attendanceList];
  }

  clearRecords(): void {
    this.attendanceList = [];
    this.attendanceSubject.next([]);
  }
}

