import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-comp-title',
  templateUrl: './comp-title.component.html',
  styleUrls: ['./comp-title.component.scss']
})
export class CompTitleComponent implements OnInit {
  // INPUTS
  @Input() title: string;

  constructor() { }

  ngOnInit(): void {
  }

}
