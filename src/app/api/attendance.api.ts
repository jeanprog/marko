import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { AttendanceRecord } from '../models/attendance.model';

@Injectable({
  providedIn: 'root'
})
export class AttendanceApi {
  // Simulação de endpoints HTTP. Somente retorna observables com delay.

  getAll(): Observable<AttendanceRecord[]> {
    return of([]).pipe(delay(1000));
  }

  create(record: AttendanceRecord): Observable<AttendanceRecord> {
    return of({ ...record }).pipe(delay(1000));
  }

  update(record: AttendanceRecord): Observable<AttendanceRecord> {
    return of({ ...record }).pipe(delay(1000));
  }

  delete(): Observable<void> {
    return of(void 0).pipe(delay(1000));
  }
}


