import { Component, OnInit, ElementRef } from '@angular/core';
import { of } from 'rxjs';
import { Observable, Observer, BehaviorSubject } from 'rxjs/Rx';
import { PagesService, IPage, IPageResponce } from './common/services/pages.service';
import { debounceTime } from 'rxjs/operator/debounceTime';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public pageList: Observable<IPage[]>;
  private searchTearmSequence$$: BehaviorSubject<string>;

  public constructor(private _pagesService: PagesService, private _elementRef: ElementRef) {
  }

  public inputSearchTearmListener(event: KeyboardEvent) {
    this.searchTearmSequence$$.next((<HTMLInputElement>event.target).value);
  }

  public initPageListByTearm(searchTerms: string) {
    const pageSequence$: Observable<IPageResponce> = this._pagesService.getPages(searchTerms);
    pageSequence$.subscribe((responce) => {
      this.pageList = of(responce.items);
    });
  }

  public ngOnInit(): void {
    const delayTime = 300;
    this.searchTearmSequence$$ = new BehaviorSubject('');
    this.searchTearmSequence$$.debounceTime(delayTime)
      .subscribe((searchTerms: string) => this.initPageListByTearm(searchTerms));
  }

  public OnDestroy(): void {
    this.searchTearmSequence$$.unsubscribe();
  }
}
