import { Component, OnInit } from '@angular/core';
import { LoaderService } from './loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  private loading: boolean;
  constructor(
    public loaderService: LoaderService
  ) { }

  ngOnInit() {
    this.loading = false;
  }

  public setLoadingState(state: boolean) {
    this.loaderService.SetLoaderState(state);
  }

}
