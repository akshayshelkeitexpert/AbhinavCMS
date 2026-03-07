import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

/** Position of the toast on screen */
export type ToastPosition =
  | 'right-top'
  | 'right-bottom'
  | 'left-top'
  | 'left-bottom'
  | 'center'
  | 'center-top'
  | 'center-bottom';

export const TOAST_POSITIONS: ToastPosition[] = [
  'right-top',
  'right-bottom',
  'left-top',
  'left-bottom',
  'center',
  'center-top',
  'center-bottom',
];

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration: number;
  createdAt: number;
  position: ToastPosition;
}

const DEFAULT_DURATION_MS = 5000;
const DEFAULT_POSITION: ToastPosition = 'right-top';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private toastsSubject = new BehaviorSubject<Toast[]>([]);
  toasts$ = this.toastsSubject.asObservable();

  private generateId(): string {
    return `toast-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  }

  private add(
    type: ToastType,
    message: string,
    durationMs = DEFAULT_DURATION_MS,
    position: ToastPosition = DEFAULT_POSITION
  ): void {
    const toast: Toast = {
      id: this.generateId(),
      type,
      message,
      duration: durationMs,
      createdAt: Date.now(),
      position,
    };
    const current = this.toastsSubject.value;
    this.toastsSubject.next([...current, toast]);

    if (durationMs > 0) {
      setTimeout(() => this.remove(toast.id), durationMs);
    }
  }

  /** Show a toast with optional position and duration */
  show(
    type: ToastType,
    message: string,
    durationMs?: number,
    position?: ToastPosition
  ): void {
    this.add(type, message, durationMs ?? DEFAULT_DURATION_MS, position ?? DEFAULT_POSITION);
  }

  success(message: string, durationMs?: number, position?: ToastPosition): void {
    this.add('success', message, durationMs, position ?? DEFAULT_POSITION);
  }

  error(message: string, durationMs?: number, position?: ToastPosition): void {
    this.add('error', message, durationMs ?? 7000, position ?? DEFAULT_POSITION);
  }

  warning(message: string, durationMs?: number, position?: ToastPosition): void {
    this.add('warning', message, durationMs, position ?? DEFAULT_POSITION);
  }

  info(message: string, durationMs?: number, position?: ToastPosition): void {
    this.add('info', message, durationMs, position ?? DEFAULT_POSITION);
  }

  /** Login/auth related messages – shown at center-bottom */
  loginSuccess(message: string, durationMs?: number): void {
    this.add('success', message, durationMs ?? 3000, 'center-bottom');
  }

  loginError(message: string, durationMs?: number): void {
    this.add('error', message, durationMs ?? 7000, 'center-bottom');
  }

  loginWarning(message: string, durationMs?: number): void {
    this.add('warning', message, durationMs, 'center-bottom');
  }

  remove(id: string): void {
    this.toastsSubject.next(this.toastsSubject.value.filter((t) => t.id !== id));
  }

  clear(): void {
    this.toastsSubject.next([]);
  }
}
