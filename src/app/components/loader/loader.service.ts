import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  loading = false;

  constructor() { }

  SetLoaderState(state: boolean) {
    this.loading = state;
  }

  GetLoaderState() {
    return this.loading;
  }
}
