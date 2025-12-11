import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { AttendanceService } from '../../services/attendance.service';
import { AttendanceRecord } from '../../models/attendance.model';
import { AttendanceListComponent } from '../attendance-list/attendance-list.component';

@Component({
  selector: 'app-attendance',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AttendanceListComponent],
  templateUrl: './attendance.component.html'
})
export class AttendanceComponent implements OnInit, OnDestroy {
  attendanceForm!: FormGroup;
  attendanceList: AttendanceRecord[] = [];
  showError = false;
  errorMessage = '';
  editingIndex: number | null = null;
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private attendanceService: AttendanceService
  ) {}

  ngOnInit(): void {
    this.attendanceForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]]
    });

    this.attendanceService.attendance$
      .pipe(takeUntil(this.destroy$))
      .subscribe(records => {
        this.attendanceList = records;
      });

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit(): void {
    if (this.attendanceForm.valid) {
      const record: AttendanceRecord = {
        name: this.attendanceForm.value.name,
        email: this.attendanceForm.value.email
      };

      if (this.editingIndex !== null) {
        this.attendanceService.updateRecord(this.editingIndex, record);
        this.editingIndex = null;
      } else {
        this.attendanceService.addRecord(record);
      }

      this.attendanceForm.reset();
      this.showError = false;
      this.errorMessage = '';
    } else {
      this.showError = true;
      this.errorMessage = 'Por favor, preencha todos os campos corretamente.';
    }
  }

  onEdit(index: number): void {
    const record = this.attendanceService.getRecord(index);
    if (record) {
      this.attendanceForm.patchValue({
        name: record.name,
        email: record.email
      });
      this.editingIndex = index;
      this.showError = false;
    }
  }

  onRemove(index: number): void {
    if (confirm('Deseja realmente remover este registro?')) {
      this.attendanceService.removeRecord(index);
      if (this.editingIndex === index) {
        this.cancelEdit();
      }
    }
  }

  cancelEdit(): void {
    this.editingIndex = null;
    this.attendanceForm.reset();
    this.showError = false;
  }

  hasError(fieldName: string): boolean {
    const field = this.attendanceForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getErrorMessage(fieldName: string): string {
    const field = this.attendanceForm.get(fieldName);
    
    if (field?.hasError('required')) {
      return 'Este campo é obrigatório.';
    }
    
    if (field?.hasError('minlength')) {
      return 'Mínimo de 3 caracteres.';
    }
    
    if (field?.hasError('email')) {
      return 'Email inválido.';
    }
    
    return '';
  }
}

