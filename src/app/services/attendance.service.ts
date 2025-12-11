import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AttendanceRecord } from '../models/attendance.model';
import { AttendanceApi } from '../api/attendance.api';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private attendanceList: AttendanceRecord[] = [];
  private attendanceSubject = new BehaviorSubject<AttendanceRecord[]>([]);
  public attendance$: Observable<AttendanceRecord[]> = this.attendanceSubject.asObservable();

  constructor(private _api: AttendanceApi) {}

  addRecord(record: AttendanceRecord): void {
    // Atualização otimista: reflete na UI imediatamente
    const recordWithTimestamp: AttendanceRecord = {
      ...record,
      timestamp: new Date()
    };
    this.attendanceList = [...this.attendanceList, recordWithTimestamp];
    this.attendanceSubject.next([...this.attendanceList]);

    // Simulação de chamada HTTP (mantida como referência para futura integração):
    // this._api.create(record).subscribe();
  }

  updateRecord(index: number, record: AttendanceRecord): void {
    if (index >= 0 && index < this.attendanceList.length) {
      const previousTimestamp = this.attendanceList[index]?.timestamp ?? new Date();
      this.attendanceList[index] = {
        ...record,
        timestamp: previousTimestamp
      };
      this.attendanceSubject.next([...this.attendanceList]);

      // Simulação de chamada HTTP (mantida como referência para futura integração):
      // this._api.update(record).subscribe();
    }
  }

  removeRecord(index: number): void {
    if (index >= 0 && index < this.attendanceList.length) {
      this.attendanceList.splice(index, 1);
      this.attendanceSubject.next([...this.attendanceList]);

      // Simulação de chamada HTTP (mantida como referência para futura integração):
      // this._api.delete().subscribe();
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

