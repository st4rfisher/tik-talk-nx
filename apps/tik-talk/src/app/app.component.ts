import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsExperimentComponent } from '@tt/experimental';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsExperimentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'tik-talk';
}
