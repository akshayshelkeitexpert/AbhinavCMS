import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-crm-redirect',
  standalone: true,
  template: `<p class="text-center py-5 text-muted">Redirecting...</p>`,
})
export class CrmRedirectComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/crm/dashboard']);
    } else {
      this.router.navigate(['/crm/signin']);
    }
  }
}
