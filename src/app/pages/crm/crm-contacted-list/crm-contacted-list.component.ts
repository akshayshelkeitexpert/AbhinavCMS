import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService, ContactRow } from '../../../core/services/api.service';

export interface ContactedItem {
  id: number;
  name: string;
  dateContacted: string;
  phone: string;
  email: string;
  status: string;
}

@Component({
  selector: 'app-crm-contacted-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crm-contacted-list.component.html',
  styleUrl: './crm-contacted-list.component.css'
})
export class CrmContactedListComponent implements OnInit {
  items: ContactedItem[] = [];
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
    this.api.getContacts().subscribe({
      next: (res) => {
        this.loading = false;
        if (res.statusCode === 200 && res.respData) {
          this.items = (res.respData as ContactRow[]).map((r) => ({
            id: r.id,
            name: r.name ?? '',
            dateContacted: this.formatDate(r.created_at),
            phone: r.subject ?? '—',
            email: r.email ?? '',
            status: r.is_active ? 'Active' : 'Inactive',
          }));
        } else {
          this.errorMessage = res.statusMessage || 'Failed to load contacts.';
          if (res.statusCode === 405) this.errorMessage = 'Please sign in to view contacts.';
        }
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err?.error?.statusMessage || err?.message || 'Failed to load contacts.';
        if (err?.status === 405) this.errorMessage = 'Please sign in to view contacts.';
      },
    });
  }

  private formatDate(s: string): string {
    if (!s) return '—';
    const d = new Date(s);
    return isNaN(d.getTime()) ? s : d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  get filteredItems(): ContactedItem[] {
    if (!this.searchText.trim()) return this.items;
    const q = this.searchText.toLowerCase();
    return this.items.filter(
      (i) =>
        i.name.toLowerCase().includes(q) ||
        i.email.toLowerCase().includes(q) ||
        (i.phone && i.phone.toLowerCase().includes(q))
    );
  }

  get totalPages(): number {
    return Math.ceil(this.filteredItems.length / this.itemsPerPage) || 1;
  }

  get currentItems(): ContactedItem[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredItems.slice(start, start + this.itemsPerPage);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) this.currentPage = page;
  }

  deleteContact(item: ContactedItem): void {
    if (this.deleteId !== null) return;
    if (!confirm(`Delete contact "${item.name}"?`)) return;
    this.deleteId = item.id;
    this.api.deleteContact(item.id).subscribe({
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
