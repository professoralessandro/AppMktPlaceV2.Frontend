import { Injectable, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AlertModalService } from '../components/alert-modal/alert-modal.service';
import { LoaderService } from '../components/loader/loader.service';
import { QueryParameter } from '../models/query-parameter';
import { TipoBloqueioMapping } from '../Enums/tipo-bloqueio.enum';
import { TipoDocumentoMapping } from '../Enums/tipo-documento.enum';
import { AddressTypeMapping } from '../Enums/address-type.enum';
import { TipoEntregaMapping } from '../Enums/tipo-entrega.enum';
import { ProductTypeMapping } from '../Enums/product-type.enum';



@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private route: Router,
    private loaderService: LoaderService,
    private alertService: AlertModalService,
    private sanitizer: DomSanitizer
  ) { }

  public retornQuery(queryParams: QueryParameter[]): string {
    let istheFist = true;
    let query = '';
    if (queryParams.length > 0) {
      queryParams.forEach(param => {
        if (!this.isNullOrUndefined(param)) {
          if (this.isNullOrUndefined(param.value)) {
            param.value = '';
          }
          query += '&' + param.parameter + '=' + this.sanitizer.sanitize(SecurityContext.HTML, param.value.toString().trim().replace(/[^0-9a-zA-Z ]/g, ''));
          if (istheFist) {
            istheFist = false;
            query = query.replace('&', '');
            query = '?' + query;
          }
        }
      });
      return query;
    } else {
      return query;
    }
  }

  public isNullOrUndefined(value: any): boolean {
    if (value === null || value === undefined || value.toString() === 'undefined' || value.toString() === 'null') {
      return true;
    } else {
      return false;
    }
  }

  public isNull(value: any): boolean {
    if (value === null) {
      return true;
    } else {
      return false;
    }
  }

  public isUndefined(value: any): boolean {
    if (value === undefined) {
      return true;
    } else {
      return false;
    }
  }

  public responseActionWithNavigation(route: string, messege: string, isSucsess) {
    this.loaderService.SetLoaderState(true);
    this.route.navigate([route]).then(e => {
      this.loaderService.SetLoaderState(false);
      this.alertService.showAlert(messege, isSucsess ? 'success' : 'error');
    });
  }

  public responseActionWithoutNavigation(type: string, messege: string) {
    this.loaderService.SetLoaderState(false);
    this.alertService.showAlert(messege, type);
  }

  public NavigateOnly(route: string) {
    this.loaderService.SetLoaderState(true);
    this.route.navigate([route]).then(e => {
      this.loaderService.SetLoaderState(false);
    });
  }

  public ReturnEnumObjectByName(value: string, position): any {
    switch (value.toLocaleLowerCase()) {
      case 'TipoDocumentoEnum'.toLocaleLowerCase():
        return TipoDocumentoMapping[position];
      case 'blockTypeEnum'.toLocaleLowerCase():
        return TipoBloqueioMapping[position];
      case 'addressTypeEnum'.toLocaleLowerCase():
        return AddressTypeMapping[position];
      case 'deliveryTypeEnum'.toLocaleLowerCase():
        return TipoEntregaMapping[position];
      case 'producttypeenum'.toLocaleLowerCase():
          return ProductTypeMapping[position];
      default:
        return 'Unknow';
    }
  }

  public ReturnValueMyEnumDescription(value: string, member) {
    switch (value.toLocaleLowerCase()) {
      case 'TipoDocumentoEnum'.toLocaleLowerCase():
        return Object.values(TipoDocumentoMapping).filter(c => typeof (c) == 'string').indexOf(member);
      case 'blockTypeEnum'.toLocaleLowerCase():
        return Object.values(TipoBloqueioMapping).filter(c => typeof (c) == 'string').indexOf(member);
      case 'addressTypeEnum'.toLocaleLowerCase():
        return Object.values(AddressTypeMapping).filter(c => typeof (c) == 'string').indexOf(member);
      case 'producttypeenum'.toLocaleLowerCase():
        return Object.values(ProductTypeMapping).filter(c => typeof (c) == 'string').indexOf(member);
      default:
        return null;
    }
  }

  public ReturnModalMessagErrorSuccess(messege: string, isSucsess: boolean = true) {
    this.alertService.showAlert(messege, isSucsess ? 'success' : 'error');
  }
}
