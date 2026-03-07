import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/auth/auth.service';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-crm-signin',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './crm-signin.component.html',
  styleUrl: './crm-signin.component.css'
})
export class CrmSigninComponent {
  signinForm: FormGroup;
  showPassword = false;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toast: ToastService
  ) {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  get emailControl() {
    return this.signinForm.get('email');
  }

  get passwordControl() {
    return this.signinForm.get('password');
  }

  private showError(message: string): void {
    this.errorMessage = message;
    this.toast.loginError(message);
  }

  onSignIn(): void {
    this.errorMessage = '';
    this.signinForm.markAllAsTouched();

    if (this.signinForm.invalid) {
      if (this.emailControl?.hasError('required')) {
        this.showError('Please enter email id.');
      } else if (this.passwordControl?.hasError('required')) {
        this.showError('Please enter password.');
      } else {
        this.showError('Please fill in all required fields.');
      }
      return;
    }

    const username = (this.emailControl?.value as string)?.trim() ?? '';
    const password = this.passwordControl?.value ?? '';
    if (!username || !password) {
      this.showError('Please enter email id and password.');
      return;
    }

    this.loading = true;
    this.auth.login(username, password).subscribe({
      next: (res) => {
        this.loading = false;
        if (res.statusCode === 200) {
          this.toast.loginSuccess('Signed in successfully.');
          this.router.navigate(['/crm/dashboard']);
        } else {
          const msg = res.statusMessage || 'Sign in failed.';
          this.showError(msg);
        }
      },
      error: (err) => {
        this.loading = false;
        const msg =
          err?.error?.statusMessage ||
          err?.error?.message ||
          err?.message ||
          (err?.status === 0 ? 'Network error. Please check your connection.' : 'Sign in failed. Please try again.');
        this.showError(msg);
      },
    });
  }
}
