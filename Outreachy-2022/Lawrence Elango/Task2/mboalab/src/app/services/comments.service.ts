import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import { UrlsService } from "../core/urls.service";
import { CoreService } from "../core/core.service";
import { CustomHttpParamEncoder } from "../core/custom-http-param-encoder";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/x-www-form-urlencoded",
  }),
};


@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  public apiUrl: string;
  public httpOptions;

  constructor(
    private http: HttpClient,
    private urlService: UrlsService,
    public core: CoreService
  ) {

    this.apiUrl = `${this.urlService.apiUrl}` + 'comments/';
    this.httpOptions = this.core.httpOptions;
  }

  getComments(dataObject: any
  ): Promise<any> {
    let url = this.apiUrl + '?';

    if (!this.core.isEmptyOrNull(dataObject.post)) {
      url += `&post=${encodeURIComponent(dataObject.post)}`
    }

    return this.core.makeRemoteRequest(url, "get", null, httpOptions);
  }


  /** PUT: update a currenciess basic data  */
  addComment(dataObject: any, id: any): Promise<any> {
    let url = this.apiUrl + 'create-comment/' + id;

    let params = new FormData();

    if (!this.core.isEmptyOrNull(dataObject.text)) {
      params.append("text", dataObject.text);
    }

    return this.core.makeRemoteRequest(url, "post", params, this.httpOptions);
  }


  getSingleComment(id: any
  ): Promise<any> {
    let url = this.apiUrl + '' + id;

    return this.core.makeRemoteRequest(url, "get", null, httpOptions);
  }



  /** PUT: update a currenciess basic data  */
  updateComment(dataObject: any, id: any): Promise<any> {
    let url = this.apiUrl + 'update-comment/' + id;

    let params = new FormData();

    // These parameters are always passed
    if (!this.core.isEmptyOrNull(dataObject.title)) {
      params.append("text", dataObject.title);
    }


    return this.core.makeRemoteRequest(url, "put", params, null);
  }


  /** DELETE: delete a currencies  */
  deleteComment(id: any): Promise<any> {
    let url = '';

    // let params = new HttpParams({ encoder: new CustomHttpParamEncoder() });
    if (!this.core.isEmptyOrNull(id)) {
      url = this.apiUrl + 'delete-comment/' + id;
    }

    return this.core.makeRemoteRequest(url, "delete", null, this.httpOptions);
  }

}
