import { Component, OnInit } from '@angular/core';
import { Observable, Observer, fromEvent, of } from 'rxjs';
import { PagesService, IPage, IPageResponce } from './common/services/pages.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  public pageList: Observable<IPage[]>;

  public constructor(private _pagesService: PagesService) {
  }

  public initPageListByTearm(searchTerms: string) {
    const pageSequence$: Observable<IPageResponce> = this._pagesService.getPages(searchTerms);
    pageSequence$.subscribe((responce) => {
       this.pageList = of (responce.items);
    } );
  }

  public ngOnInit(): void {
    const input = document.querySelector('#input');
    const sequence$ = fromEvent(input, 'input');
    let timer;

    sequence$.subscribe((event: Event) => {
      const searchTerms = event.target.value;

      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        this.initPageListByTearm(searchTerms);
      }, 500);
    });

  }
}
