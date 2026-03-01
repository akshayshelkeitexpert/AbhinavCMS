import { Component, HostListener } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <app-header></app-header>
    <main class="main">
      <router-outlet></router-outlet>
    </main>
    <app-footer></app-footer>
    <button type="button" id="scroll-top" class="scroll-top d-flex align-items-center justify-content-center" [class.active]="showScrollTop" (click)="scrollToTop()" aria-label="Scroll to top">
      <i class="bi bi-arrow-up-short"></i>
    </button>
    <div id="preloader"></div>
  `,
  styles: [`
    .scroll-top {
      position: fixed;
      visibility: hidden;
      opacity: 0;
      right: 15px;
      bottom: 15px;
      z-index: 99999;
      width: 40px;
      height: 40px;
      border-radius: 4px;
      border: none;
      cursor: pointer;
      transition: all 0.4s;
      background-color: var(--accent-color, #e03a3c);
      color: #fff;
    }
    .scroll-top i {
      font-size: 24px;
      line-height: 0;
    }
    .scroll-top:hover {
      opacity: 0.9;
      transform: translateY(-2px);
    }
    .scroll-top.active {
      visibility: visible;
      opacity: 1;
    }
  `]
})
export class AppComponent {
  showScrollTop = false;

  constructor(private router: Router) {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe(() => {
      window.scrollTo(0, 0);
    });
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.showScrollTop = window.scrollY > 100;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
