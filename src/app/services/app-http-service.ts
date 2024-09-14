import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { QueryParameter } from '../models/query-parameter';
import { CommonService } from './common.service';
import { BaseResponse } from '../models/base.response';

@Injectable({
  providedIn: 'root'
})
export class HttpCommonService {

    constructor(
      private http: HttpClient,
      private commonService: CommonService
    ) { }

    getAll(api_url: string, endPoint: string, parameters?: QueryParameter[]) {
      return this.http.get<any[]>
      (`${environment[api_url]}/api/${endPoint}${ !this.commonService.isNullOrUndefined(parameters) && parameters.length > 0 ?
        this.commonService.retornQuery(parameters) : ''}`);
    }

    getSingle(api_url: string, endPoint: string, parameters?: QueryParameter[]) {
      return this.http.get<any>
      (`${environment[api_url]}/api/${endPoint}${ !this.commonService.isNullOrUndefined(parameters) && parameters.length > 0 ?
        this.commonService.retornQuery(parameters) : ''}`);
    }

    insert(api_url: string, endPoint: string, model: any) {
      return this.http.post<any>(`${environment[api_url]}/api/${endPoint}`, model);
    }

    delete(api_url: string, endPoint: string, id: number | string) {
      return this.http.delete<void>(`${environment[api_url]}/api/${endPoint}?id=${id}`);
    }

    edit(api_url: string, endPoint: string, model: any) {
      return this.http.put<any>(`${environment[api_url]}/api/${endPoint}/`, model);
    }

    getAllNew(api_url: string, endPoint: string, parameters?: QueryParameter[]) {
      return this.http.get<BaseResponse>
      (`${environment[api_url]}/api/${endPoint}${ !this.commonService.isNullOrUndefined(parameters) && parameters.length > 0 ?
        this.commonService.retornQuery(parameters) : ''}`);
    }
}
