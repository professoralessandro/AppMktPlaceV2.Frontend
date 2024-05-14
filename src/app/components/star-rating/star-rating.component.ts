import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent implements OnInit {
  /**
  * CLASS ATRIBUTTES
   */

  public stars: number[] = [1, 2, 3, 4, 5];
  public selectedValue: number = 0;

  /**
   * CONSTRUCTOR
   */
  constructor(private commonService: CommonService) { }

  /**
   * PUBLIC METHOD
   */
  public ngOnInit(): void {
  }

  public countStar(star) {
    this.selectedValue = star;
  }

  public addClass(star) {
    let ab = "";
    for (let i = 0; i < star; i++) {
      ab = "starId" + i;
      document.getElementById(ab).classList.add("selected");
    }
  }

  public removeClass(star) {
    let ab = "";
    for (let i = star - 1; i >= this.selectedValue; i--) {
      ab = "starId" + i;
      document.getElementById(ab).classList.remove("selected");
    }
  }

  public enviarOpiniao(): void {
    // Lógica para enviar a opinião
    try {
      const alertType: string = 'success'
      const alertMessage: string = 'Seu voto foi salvo com sucesso';
      this.commonService.responseActionWithoutNavigation(alertType, alertMessage);
      debugger;
    }
    catch (ex) {
      const alertType: string = 'error';
      const errorMessage: string = 'Houve um erro ao tentar efetivar o pagamento: \n' + ex.error;
      this.commonService.responseActionWithoutNavigation(alertType, errorMessage);
    }
  }
}
