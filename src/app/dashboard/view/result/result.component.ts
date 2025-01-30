import { Component, inject } from '@angular/core';
import { CommonModule, KeyValue, Location } from '@angular/common';
import { Router } from '@angular/router';
import { ListaGenericaService } from '../../../services/lista-generica.service';
import { Curso } from '../../../interfaces/cursos';
import { CursosConvalidar } from '../../../interfaces/cursos-convalidar';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './result.component.html',
  styleUrl: './result.component.css',
})
export default class ResultComponent {
  private ListaGenerica = inject(ListaGenericaService);

  logo = 'assets/logo.png';
  img = 'assets/img2.jpg';
  formDataEstudiante: any;
  formDataCarrera: any;
  listaConvalidar: CursosConvalidar[] = [];
  listaCursos: Curso[] = [];
  progressPercentage: number = 0;
  listaCursosPorCiclo: any;
  cursosAgrupados: { [ciclo: string]: Curso[] } = {};

  constructor(private location: Location, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (
      navigation &&
      navigation.extras.state &&
      navigation.extras.state['formDataEstudiante'] &&
      navigation.extras.state['formDataCarrera']
    ) {
      this.formDataEstudiante = navigation.extras.state['formDataEstudiante'];
      this.formDataCarrera = navigation.extras.state['formDataCarrera'];
    } else {
      console.log('No se encontraron datos de formulario.');
    }
  }

  ngOnInit() {
    this.listaCursos = this.ListaGenerica.getAllCursos();
    this.listaConvalidar = this.ListaGenerica.getCursosConvalida(
      this.formDataCarrera.institucion.id,
      this.formDataCarrera.carrera.id,
      this.formDataCarrera.carreraupla.id
    );
    if (!this.formDataEstudiante || !this.formDataCarrera) {
      this.goToDashboard();
    }

    this.calculateProgress();
    this.agruparCursosPorCiclo(this.listaCursos);
  }

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  calculateProgress() {
    const totalCursos = this.listaCursos.length;
    const cursosConvalidados = this.listaConvalidar.length;
    this.progressPercentage = (cursosConvalidados / totalCursos) * 100;
  }
  agruparCursosPorCiclo(cursos: Curso[]): void {
    this.cursosAgrupados = cursos
      .sort((a, b) => a.ciclo - b.ciclo)
      .reduce((acc: { [ciclo: number]: Curso[] }, curso: Curso) => {
        if (!acc[curso.ciclo]) {
          acc[curso.ciclo] = [];
        }
        acc[curso.ciclo].push(curso);
        return acc;
      }, {});
  }
  ordenarPorCiclo = (
    a: KeyValue<string, Curso[]>,
    b: KeyValue<string, Curso[]>
  ) => {
    return Number(a.key) - Number(b.key);
  };

  isConvalidar(cursoId: number): boolean {
    return this.listaConvalidar.some(
      (c) => c.idCurso === cursoId && c.convalida
    );
  }

  generarReporte(): void {
    const doc = new jsPDF();

    doc.addImage(this.logo, 'PNG', 14, 10, 50, 20);

    doc.setFillColor(255, 255, 255);
    doc.rect(135, 5, 150, 50, 'F');
    doc.setTextColor(0, 123, 187);
    doc.setFontSize(12);
    doc.text('PODRÍAS CONVALIDAR', 148, 18);

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);

    const texto = `${this.listaConvalidar.length} CURSOS DE ${this.listaCursos.length}`;

    doc.setFillColor(0, 123, 187);
    doc.rect(161, 20, doc.getTextWidth(texto) + 5, 6, 'F');
    doc.text(texto, 163, 24);

    doc.setTextColor(0, 0, 0);
    const sal = `Hola ${this.formDataEstudiante.nomape}, gracias por utilizar nuestro simulador de convalidaciones. A continuación te mostramos los detalles de tu simulación.`;
    const splitText = doc.splitTextToSize(sal, 80);

    const textHeight = splitText.length * 5;

    doc.setFillColor(207, 207, 207);
    doc.roundedRect(14, 35, 88, textHeight + 3, 5, 5, 'F');

    doc.text(splitText, 19, 41);

    doc.setDrawColor(207, 207, 207);
    doc.setFillColor(255, 255, 255);
    doc.rect(110, 35, 87, 32);

    doc.setFontSize(9);
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'bold');

    doc.text('Instituto procedencia:', 113, 40);
    doc.setFont('helvetica', 'normal');
    const instituto = this.formDataCarrera.institucion.nombre;
    const inst = doc.splitTextToSize(instituto, 40);
    doc.text(inst, 150, 40);

    doc.setFont('helvetica', 'bold');
    doc.text('Carrera procedencia:', 113, 50);
    doc.setFont('helvetica', 'normal');
    const carrera = this.formDataCarrera.carrera.nombre;
    const car = doc.splitTextToSize(carrera, 40);
    doc.text(car, 150, 50);

    doc.setFont('helvetica', 'bold');
    doc.text('Carrera UPLA:', 113, 60);
    doc.setFont('helvetica', 'normal');
    const carreraupla = this.formDataCarrera.carreraupla.nombre;
    const carupla = doc.splitTextToSize(carreraupla, 40);
    doc.text(carupla, 150, 60);

    doc.setFontSize(15);
    doc.setFont('helvetica', 'bold');
    doc.text('RESULTADO', 95, 80);

    let currentY = 75;
    for (let ciclo in this.cursosAgrupados) {
      doc.setFillColor(220, 220, 220);
      doc.rect(14, currentY, 180, 10, 'F');
      doc.setFontSize(15);
      doc.setTextColor(0, 0, 0);
      doc.setFont('helvetica', 'bold');
      doc.text(`CICLO ${ciclo}`, 20, currentY + 7);
      currentY += 15;

      const pageHeight = doc.internal.pageSize.height;
      const marginBottom = 15;

      this.cursosAgrupados[ciclo].forEach((curso) => {
        // Verificar si hay suficiente espacio para este curso
        if (currentY + 12 > pageHeight - marginBottom) {
          doc.addPage(); // Si no hay espacio, agregamos una nueva página
          currentY = 15; // Reiniciamos la posición Y para la nueva página
        }

        // Verificamos si el curso debe ser convalidado
        const isConvalidado = this.isConvalidar(curso.id);

        // Establecemos el color de fondo dependiendo de si el curso es convalidado
        if (isConvalidado) {
          doc.setTextColor(255, 255, 255);
          doc.setFillColor(0, 123, 187);
        } else {
          doc.setTextColor(0, 0, 0);
          doc.setFillColor(255, 255, 255);
        }

        // Dibuja los cursos con el color de fondo adecuado
        doc.setFont('helvetica', 'normal');
        doc.rect(14, currentY, 180, 10, 'F'); // Caja para el curso
        doc.setFontSize(10); // Texto en color negro
        doc.text(curso.nombre, 20, currentY + 7); // Nombre del curso
        currentY += 12; // Ajustamos la distancia entre cursos
      });

      // Agregar un espacio entre los ciclos
      currentY += 5;
    }

    window.open(doc.output('bloburl'), '_blank');
  }
}
