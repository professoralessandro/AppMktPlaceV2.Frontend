import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  chart1 = {
    data: {
      labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      datasets: [{
        label: 'Premium',
        data: [50, 80, 60, 120, 80, 100, 60],
        backgroundColor: 'transparent',
        borderColor: '#5b6582',
        borderWidth: 2
      },
      {
        label: 'Free',
        data: [100, 60, 80, 50, 140, 60, 100],
        backgroundColor: 'transparent',
        borderColor: '#36a2eb',
        borderWidth: 2
      }
      ]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            fontColor: 'rgba(0,0,0,.6)',
            fontStyle: 'bold',
            beginAtZero: true,
            maxTicksLimit: 8,
            padding: 10
          }
        }]
      },
      responsive: true,
      legend: {
        position: 'bottom',
        display: false
      },
    }
  };
  chart2 = {
    data: {
      labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      datasets: [{
        label: 'Premium',
        data: [50, 80, 60, 120, 80, 100, 60],
        backgroundColor: '#5b6582',
        borderColor: '#5b6582',
        borderWidth: 2
      },
      {
        label: 'Free',
        data: [100, 60, 80, 50, 140, 60, 100],
        backgroundColor: '#36a2eb',
        borderColor: '#36a2eb',
        borderWidth: 2
      }
      ]
    },
    options: {
      barValueSpacing: 1,
      scales: {
        yAxes: [{
          ticks: {
            fontColor: 'rgba(0,0,0,.6)',
            fontStyle: 'bold',
            beginAtZero: true,
            maxTicksLimit: 8,
            padding: 10
          }
        }],
        xAxes: [{
          barPercentage: 0.4
        }]
      },
      responsive: true,
      legend: {
        position: 'bottom',
        display: false
      },
    }
  };
  chart3 = {
    data: {
      datasets: [{
        data: [6, 12, 10],
        backgroundColor: ['#5b6582', '#98a4c7', '#36a2eb'],
      }],
      labels: [
        'html',
        'css',
        'javascript'
      ]
    },
    options: {
      legend: {
        position: 'bottom',
        display: false
      },
      cutoutPercentage: 80
    }
  };

  constructor() { }

  ngOnInit() {
    // tslint:disable-next-line:no-unused-expression
    new Chart('chart-line', {
      type: 'line',
      data: this.chart1.data,
      options: this.chart1.options
    });
    // tslint:disable-next-line:no-unused-expression
    new Chart('chart-bar', {
      type: 'bar',
      data: this.chart2.data,
      options: this.chart2.options
    });
    // tslint:disable-next-line:no-unused-expression
    new Chart('chart-doughnut', {
      type: 'doughnut',
      data: this.chart3.data,
      options: this.chart3.options
    });

    // TODO: REMOVER MOCK
    this.initializeComponent();
  }

  /**
   * PRIVATE METHOD
   */

  // TODO: REMOVER ESTE METODO DE CARREGAMENTO DE USUARIO
  private initializeComponent() {

    // THIS METOD GET THE USER
    const user = this.loadUserByUserIdToSetOnLocalStorage("d2a833de-5bb4-4931-a3c2-133c8994072a");

    // THIS METOD SET THE USER ON LOCAL STORAGE
    this.returnUserToLoadLocalStorage(user);
  }

  // TODO: REMOVER MOCK
  /**
   * SET USER ON LOCAL STORAGE
   * TO MOCK A USER STILL HAVENT ANY LOGIN METHOD
   * @param user 
   */
  private returnUserToLoadLocalStorage(user): void {
    //ADD PRODUCT TO SHOPCART
    localStorage.removeItem('user');
    localStorage.setItem('user', JSON.stringify(user));
  }

  // TODO: REMOVER MOCK
  /**
   * 
   * @param userId THIS HETHOD RECEIVE THE USER ID AND RETURN THE USER TO SET ON LOCAL STORAGE
   * @returns 
   */
  private loadUserByUserIdToSetOnLocalStorage(userId) {
    return {
      identifier: "d2a833de-5bb4-4931-a3c2-133c8994072a",
      userName: "ALESSANDRO2010",
      userGroup: "Master",
      userProfileImage: './assets/img/user.jpg',
      nmrDocumento: "00000000000",
      documentTypeEnum: 0,
      senha: "@DASDFsdfksdofksdofksdfffff",
      nome: "master",
      dataNascimento: "2024-06-08T14:20:21.657",
      sexo: "N",
      estadoCivil: "N",
      email: "system@appmkt.com.br",
      trocaSenha: false,
      bloqueado: false,
      usuarioInclusaoId: "9a5f0c64-8103-4ee1-8acd-84b28090d898",
      usuarioUltimaAlteracaoId: "9a5f0c64-8103-4ee1-8acd-84b28090d898",
      dataInclusao: "2024-06-08T14:20:21.657",
      dataUltimaAlteracao: "2024-06-08T14:20:21.657",
      dataUltimaTrocaSenha: "2024-06-08T14:20:21.657",
      dataUltimoLogin: "2024-06-08T14:20:21.657",
      nmrTelefone: "(13)99612-4445",
      ativo: true
    }
  }
}
