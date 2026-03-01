import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  mobileNavActive = false;

  toggleMobileNav(): void {
    this.mobileNavActive = !this.mobileNavActive;
    document.body.classList.toggle('mobile-nav-active', this.mobileNavActive);
  }

  closeMobileNav(): void {
    this.mobileNavActive = false;
    document.body.classList.remove('mobile-nav-active');
  }

  toggleDropdown(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    const a = (event.target as HTMLElement).closest('a');
    if (!a) return;
    const ul = a.nextElementSibling;
    if (ul) ul.classList.toggle('dropdown-active');
    a.parentElement?.classList.toggle('active');
  }
}
