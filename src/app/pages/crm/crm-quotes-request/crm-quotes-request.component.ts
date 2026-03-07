import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService, QuoteRow } from '../../../core/services/api.service';

export interface QuoteItem {
  id: number;
  customer: string;
  requestDate: string;
  projectType: string;
  description: string;
  status: string;
}

@Component({
  selector: 'app-crm-quotes-request',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crm-quotes-request.component.html',
  styleUrl: './crm-quotes-request.component.css'
})
export class CrmQuotesRequestComponent implements OnInit {
  items: QuoteItem[] = [];
  searchText = '';
  loading = true;
  errorMessage = '';
  deleteId: number | null = null;

  currentPage = 1;
  itemsPerPage = 10;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadList();
  }

  loadList(): void {
    this.loading = true;
    this.errorMessage = '';
    this.api.getQuotes().subscribe({
      next: (res) => {
        this.loading = false;
        if (res.statusCode === 200 && res.respData) {
          this.items = (res.respData as QuoteRow[]).map((r) => ({
            id: r.id,
            customer: r.name ?? '',
            requestDate: this.formatDate(r.created_at),
            projectType: r.type ?? '—',
            description: (r.message && r.message.length > 80) ? r.message.slice(0, 80) + '…' : (r.message ?? '—'),
            status: r.is_active ? 'Pending' : 'Inactive',
          }));
        } else {
          this.errorMessage = res.statusMessage || 'Failed to load quotes.';
          if (res.statusCode === 405) this.errorMessage = 'Please sign in to view quotes.';
        }
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err?.error?.statusMessage || err?.message || 'Failed to load quotes.';
        if (err?.status === 405) this.errorMessage = 'Please sign in to view quotes.';
      },
    });
  }

  private formatDate(s: string): string {
    if (!s) return '—';
    const d = new Date(s);
    return isNaN(d.getTime()) ? s : d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  get filteredItems(): QuoteItem[] {
    if (!this.searchText.trim()) return this.items;
    const q = this.searchText.toLowerCase();
    return this.items.filter(
      (i) =>
        i.customer.toLowerCase().includes(q) ||
        (i.projectType && i.projectType.toLowerCase().includes(q)) ||
        (i.description && i.description.toLowerCase().includes(q))
    );
  }

  get totalPages(): number {
    return Math.ceil(this.filteredItems.length / this.itemsPerPage) || 1;
  }

  get currentItems(): QuoteItem[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredItems.slice(start, start + this.itemsPerPage);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) this.currentPage = page;
  }

  deleteQuote(item: QuoteItem): void {
    if (this.deleteId !== null) return;
    if (!confirm(`Delete quote request from "${item.customer}"?`)) return;
    this.deleteId = item.id;
    this.api.deleteQuote(item.id).subscribe({
      next: (res) => {
        this.deleteId = null;
        if (res.statusCode === 200) this.loadList();
        else this.errorMessage = res.statusMessage || 'Delete failed.';
      },
      error: (err) => {
        this.deleteId = null;
        this.errorMessage = err?.error?.statusMessage || err?.message || 'Delete failed.';
      },
    });
  }
}
