import { Component } from '@angular/core';
import { SvgComponent } from "../../common-ui/svg/svg.component";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [SvgComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})

export class SidebarComponent {

}
