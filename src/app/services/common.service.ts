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

  /**
   * PUBLIC METHODS
   */

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
      case 'productTypeEnum'.toLocaleLowerCase():
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
      case 'productTypeEnum'.toLocaleLowerCase():
        return Object.values(ProductTypeMapping).filter(c => typeof (c) == 'string').indexOf(member);
      default:
        return null;
    }
  }

  public ReturnModalMessagErrorSuccess(messege: string, isSucsess: boolean = true) {
    this.alertService.showAlert(messege, isSucsess ? 'success' : 'error');
  }

  /**
   * 
   * @param value 
   * @returns RETURN CURRENCY BRASIL REAL FORMATED: R$ XX,XX
   */
  public currencyFormatterBRL(value: number): string {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  }

  /**
   * 
   * @param email 
   * @returns IF EMAIL IS VALID
   */
  public validatedEmail(email: string): boolean {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(email)) {
      this.ReturnModalMessagErrorSuccess("O email digitado e invalido.");
      return false;
    }
  }

  /**
   * 
   * @param senha 
   * @returns IF IS A PASSWORD VALID
   */
  public validatePassword(senha: string): boolean {
    // Verifica se a senha tem pelo menos seis caracteres
    if (senha.length < 6) {
      this.ReturnModalMessagErrorSuccess("A senha deve ter entre 6 e 30 caracteres.", false);
      return false;
    }

    // Verifica se a senha contém pelo menos uma letra maiúscula
    if (!/[A-Z]/.test(senha)) {
      this.ReturnModalMessagErrorSuccess("A senha deve conter um caractere maiusculo.");
      return false;
    }

    // Verifica se a senha contém pelo menos um caractere especial
    if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\-]/.test(senha)) {
      this.ReturnModalMessagErrorSuccess("A senha deve conter um caractere especial.");
      return false;
    }

    // Todas as condições foram atendidas
    return true;
  }

  /**
   * 
   * @param dateString 
   * @returns IF DATE IS MORE OLDER THAN 120 YEARS
   */
  public validateIsOver120YearsOld(dateString: string): boolean {
    // Converte a string para um objeto Date
    const birthDate = new Date(dateString);
    if (isNaN(birthDate.getTime())) {
      // Verifica se a data é inválida
      throw new Error("Data inválida");
    }

    // Obtém a data atual
    const currentDate = new Date();
    // Calcula a diferença em milissegundos
    const ageInMilliseconds = currentDate.getTime() - birthDate.getTime();
    // Converte a diferença para anos
    const ageInYears = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25);

    // Verifica se a idade é maior que 120 anos
    return ageInYears > 120;
  }

  /**
     * 
     * @param dateString 
     * @returns RETURN YEAR VALUE BY DATESTRING
     */
  public returnYearsByDateString(dateString: string): number {
    // Converte a string para um objeto Date
    const birthDate = new Date(dateString);
    if (isNaN(birthDate.getTime())) {
      // Verifica se a data é inválida
      throw new Error("Data inválida");
    }

    // Obtém a data atual
    const currentDate = new Date();
    // Calcula a diferença em milissegundos
    const ageInMilliseconds = currentDate.getTime() - birthDate.getTime();
    // Converte a diferença para anos
    const ageInYears = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25);

    // Verifica se a idade é maior que 120 anos
    return ageInYears;
  }
}
