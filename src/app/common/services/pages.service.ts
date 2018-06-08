import { Injectable, Inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';


export interface IPage {
  'title': string;
  'htmlTitle': string;
  'link': string;
  'displayLink': string;
  'snippet': string;
  'htmlSnippet': string;
}

export interface IPageResponce {
  items: IPage[];
}

@Injectable({
  providedIn: 'root'
})
export class PagesService {
  public constructor(private _http: HttpClient, @Inject('pageServiceUrl') private _pageServiceUrl: string) {
  }

  public getPages(searchTerms: string): Observable<IPageResponce> {
    const response: Observable<IPageResponce> =
      this._http.get<IPageResponce>(`${this._pageServiceUrl.pageServiceUrl}${searchTerms}`); return response;
  }
}
