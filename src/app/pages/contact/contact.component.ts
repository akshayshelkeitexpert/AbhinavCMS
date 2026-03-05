import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
  contactForm: FormGroup;
  loading = false;
  submitted = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
  ) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    this.errorMessage = '';
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.api.createContact(this.contactForm.value).subscribe({
      next: (res) => {
        this.loading = false;
        if (res.statusCode === 201 || res.statusCode === 200) {
          this.submitted = true;
          this.contactForm.reset();
        } else {
          this.errorMessage = res.statusMessage || 'Something went wrong.';
        }
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err?.error?.statusMessage || err?.message || 'Failed to send message. Please try again.';
      },
    });
  }
}
