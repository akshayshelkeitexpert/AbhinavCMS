import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-quote',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './quote.component.html',
  styleUrl: './quote.component.css',
})
export class QuoteComponent {
  quoteForm: FormGroup;
  loading = false;
  submitted = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
  ) {
    this.quoteForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      type: ['', [Validators.required]],
      timeline: ['', [Validators.required]],
      budget: [''],
      message: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    this.errorMessage = '';
    if (this.quoteForm.invalid) {
      this.quoteForm.markAllAsTouched();
      return;
    }
    this.loading = true;
    const payload = { ...this.quoteForm.value };
    if (!payload.budget) delete payload.budget;
    this.api.createQuote(payload).subscribe({
      next: (res) => {
        this.loading = false;
        if (res.statusCode === 201 || res.statusCode === 200) {
          this.submitted = true;
          this.quoteForm.reset();
        } else {
          this.errorMessage = res.statusMessage || 'Something went wrong.';
        }
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err?.error?.statusMessage || err?.message || 'Failed to submit quote request. Please try again.';
      },
    });
  }
}
