import { Component, Input} from '@angular/core';
import { IPage } from '../common/services/pages.service';

@Component({
  selector: 'app-page-card',
  templateUrl: './page-card.component.html',
  styleUrls: ['./page-card.component.css']
})
export class PageCardComponent {
  @Input()
  public page: IPage;
}
