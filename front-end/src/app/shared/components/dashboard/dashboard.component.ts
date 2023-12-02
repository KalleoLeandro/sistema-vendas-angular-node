import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public chart: any;
  public chart2: any;  
  public nomeProduto:string= 'Teste';

  constructor() {

  }

  ngOnInit(): void {
    this.createAreaChart();
    this.createPieChart();
  }

  public labels = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho'];
  public data = {
    labels: this.labels,
    datasets: [{
      label: 'Valores das vendas por mês',
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(141, 156, 179, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
      ],
      borderWidth: 1
    }]
  };

  public config: any = {
    type: 'bar',
    data: this.data,
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    },
  };

  public data2 = {
    labels: [
      'Auto',
      'Vida',
      'Funenário'
    ],
    datasets: [{
      label: 'Quantidade de Produtos no Estoque por Tipo',
      data: [300, 50, 100],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)'
      ],
      hoverOffset: 4
    }]
  };

  public config2 = {
    type: 'doughnut',
    data: this.data2,
  };

  createAreaChart() {

    this.chart = new Chart("myAreaChart", {
      type: 'bar', //this denotes tha type of chart

      data: this.data,
      options: {
        aspectRatio: 3.5
      }
    });
  }


  createPieChart() {

    this.chart2 = new Chart("myPieChart", {
      type: 'doughnut', //this denotes tha type of chart

      data: this.data2,
      options: {
        aspectRatio: 2
      }
    });
  }
}