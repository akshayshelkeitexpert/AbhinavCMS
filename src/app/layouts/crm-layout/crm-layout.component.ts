import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-crm-layout',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './crm-layout.component.html',
  styleUrl: './crm-layout.component.css'
})
export class CrmLayoutComponent {
  userMenuOpen = false;
  currentYear = new Date().getFullYear();

  constructor(public auth: AuthService) {}

  signOut(): void {
    this.userMenuOpen = false;
    this.auth.logout();
  }
}
