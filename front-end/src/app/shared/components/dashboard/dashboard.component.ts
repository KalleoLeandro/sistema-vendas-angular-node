import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { Router } from '@angular/router';
import { ConsultasService } from '../../services/consultas.service';
import { LoginService } from '../../services/login.service';
import { PdfService } from '../../services/pdf.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('areaChartCanvas') areaChartCanvas?: ElementRef<HTMLCanvasElement>;
  @ViewChild('pieChartCanvas') pieChartCanvas?: ElementRef<HTMLCanvasElement>;

  public chart: any;
  public chart2: any;
  public nomeProduto: string = 'Nenhum';
  public lucroMes: number = 0;
  public lucroAnual: number = 0;
  public produtosEmFalta: number = 0;
  public token = sessionStorage.getItem('authorization');

  public labels: string[] = [];
  public valoresPorMes: number[] = [];
  public categorias: string[] = [];
  public estoquePorCategoria: number[] = [];

  private viewReady = false;

  constructor(
    private loginService: LoginService,
    private consultaService: ConsultasService,
    private pdfService: PdfService,
    private router: Router
  ) {
    if (this.token === null) {
      this.router.navigate(['/']);
    } else {
      this.loginService.validarToken(sessionStorage.getItem('authorization') as string).subscribe({
        next: () => {
        },
        error: (err) => {
          console.log(err);
          sessionStorage.removeItem("authorization");
          this.router.navigate(['/']);
        }
      });
    }
  }

  ngOnInit(): void {
    this.carregarDashboard();
  }

  ngAfterViewInit(): void {
    this.viewReady = true;
    this.renderCharts();
  }

  ngOnDestroy(): void {
    this.chart?.destroy();
    this.chart2?.destroy();
  }

  public carregarDashboard(): void {
    this.consultaService.consultaDashboard(this.token || '').subscribe({
      next: (res) => {
        this.lucroMes = Number(res.lucroMes || 0);
        this.lucroAnual = Number(res.lucroAnual || 0);
        this.produtosEmFalta = Number(res.produtosEmFalta || 0);
        this.nomeProduto = res.produtoMaisVendido || 'Nenhum';
        this.labels = (res.vendasPorMes || []).map((item: any) => item.label);
        this.valoresPorMes = (res.vendasPorMes || []).map((item: any) => Number(item.valor || 0));
        this.categorias = (res.estoquePorCategoria || []).map((item: any) => item.label);
        this.estoquePorCategoria = (res.estoquePorCategoria || []).map((item: any) => Number(item.valor || 0));
        this.renderCharts();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  public gerarPdfDashboard(): void {
    const dadosDashboard = {
      lucroMes: this.lucroMes,
      lucroAnual: this.lucroAnual,
      produtosEmFalta: this.produtosEmFalta,
      produtoMaisVendido: this.nomeProduto,
      vendasPorMes: this.labels.map((label, index) => ({
        label,
        valor: this.valoresPorMes[index]
      })),
      estoquePorCategoria: this.categorias.map((label, index) => ({
        label,
        valor: this.estoquePorCategoria[index]
      }))
    };

    this.pdfService.gerarPdfDashboard(this.token || '', dadosDashboard).subscribe({
      next: (res) => {
        const blob = new Blob([res], { type: 'application/pdf' });
        const downloadUrl = window.URL.createObjectURL(blob);
        window.open(downloadUrl, '_blank');
        window.URL.revokeObjectURL(downloadUrl);
      },
      error: (err) => {
        console.error('Erro ao gerar PDF do dashboard:', err);
      }
    });
  }

  private renderCharts(): void {
    if (!this.viewReady || !this.areaChartCanvas || !this.pieChartCanvas) {
      return;
    }

    this.createAreaChart();
    this.createPieChart();
  }

  private createAreaChart(): void {
    this.chart?.destroy();

    const canvas = this.areaChartCanvas?.nativeElement;
    if (!canvas) {
      return;
    }

    this.chart = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: [{
          label: 'Valores das vendas por mes',
          data: this.valoresPorMes,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(141, 156, 179, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)',
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        aspectRatio: 3.5
      }
    });
  }

  private createPieChart(): void {
    this.chart2?.destroy();

    const canvas = this.pieChartCanvas?.nativeElement;
    if (!canvas) {
      return;
    }

    this.chart2 = new Chart(canvas, {
      type: 'doughnut',
      data: {
        labels: this.categorias,
        datasets: [{
          label: 'Quantidade de produtos no estoque por tipo',
          data: this.estoquePorCategoria,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(141, 156, 179, 0.2)'
          ],
          hoverOffset: 4
        }]
      },
      options: {
        aspectRatio: 2
      }
    });
  }
}
