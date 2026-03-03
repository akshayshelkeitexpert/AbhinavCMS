import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PROJECTS } from '../../data/projects.data';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [RouterLink]
})
export class HomeComponent {
  /** First 4 projects for home page showcase */
  featuredProjects = PROJECTS.slice(0, 4);
}
