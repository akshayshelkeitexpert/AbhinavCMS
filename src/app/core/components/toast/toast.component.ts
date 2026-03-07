import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ToastService, Toast, ToastType, ToastPosition, TOAST_POSITIONS } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css',
})
export class ToastComponent implements OnInit, OnDestroy {
  toasts: Toast[] = [];
  positions = TOAST_POSITIONS;
  private sub?: Subscription;

  constructor(public toast: ToastService) {}

  ngOnInit(): void {
    this.sub = this.toast.toasts$.subscribe((list) => (this.toasts = list));
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  toastsAt(position: ToastPosition): Toast[] {
    return this.toasts.filter((t) => t.position === position);
  }

  close(id: string): void {
    this.toast.remove(id);
  }

  iconFor(type: ToastType): string {
    switch (type) {
      case 'success':
        return 'bi-check-circle-fill';
      case 'error':
        return 'bi-exclamation-triangle-fill';
      case 'warning':
        return 'bi-exclamation-circle-fill';
      case 'info':
        return 'bi-info-circle-fill';
      default:
        return 'bi-info-circle-fill';
    }
  }
}
