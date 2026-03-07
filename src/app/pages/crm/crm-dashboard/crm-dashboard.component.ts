import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-crm-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './crm-dashboard.component.html',
  styleUrl: './crm-dashboard.component.css'
})
export class CrmDashboardComponent implements OnInit {
  contactedCount = 0;
  quotesRequestedCount = 0;
  loading = true;
  errorMessage = '';

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadAnalytics();
  }

  loadAnalytics(): void {
    this.loading = true;
    this.errorMessage = '';
    this.api.getDashboardAnalytics().subscribe({
      next: (res) => {
        this.loading = false;
        if (res.statusCode === 200 && res.respData) {
          this.contactedCount = res.respData.contactedCount ?? 0;
          this.quotesRequestedCount = res.respData.quotesRequestedCount ?? 0;
        } else {
          this.errorMessage = res.statusMessage || 'Failed to load dashboard.';
        }
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err?.error?.statusMessage || err?.message || 'Failed to load dashboard.';
      },
    });
  }
}
