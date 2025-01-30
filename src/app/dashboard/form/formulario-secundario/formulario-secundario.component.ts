import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { ListaGenericaService } from '../../../services/lista-generica.service';
import { Carrera, Institucion } from '../../../interfaces/institucion';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-formulario-secundario',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AutocompleteLibModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './formulario-secundario.component.html',
  styleUrl: './formulario-secundario.component.css',
})
export default class FormularioSecundarioComponent {
  private fb = inject(FormBuilder);
  private ListaGenerica = inject(ListaGenericaService);
  formData: any;
  form: FormGroup = this.createForm();
  instituciones: Institucion[] = [];
  selectedInstitucion: Institucion | null = null;
  carreras: Carrera[] = [];
  keyword: string = 'nombre';
  CarrerasByInstitucion: Carrera[] = [];
  CarreraUpla: Carrera[] = [];
  plcarrera = 'Elija un instituto para cargar carreras';

  ngOnInit(): void {
    if (!this.formData) this.goBack();
    this.instituciones = this.ListaGenerica.getInstituciones();
    this.CarreraUpla = this.ListaGenerica.getCarrerasByInstitucion(0);
  }

  constructor(private router: Router, private location: Location) {
    const navigation = this.router.getCurrentNavigation();

    if (
      navigation &&
      navigation.extras.state &&
      navigation.extras.state['formData']
    ) {
      this.formData = navigation.extras.state['formData'];
    } else {
      console.log('No se encontraron datos de formulario.');
    }
  }
  private createForm(): FormGroup {
    return this.fb.group({
      institucion: ['', Validators.required],
      carrera: ['', Validators.required],
      carreraupla: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.router.navigate(['/result'], {
        state: {
          formDataEstudiante: this.formData,
          formDataCarrera: this.form.value,
        },
      });
    } else {
      console.log('Formulario inválido');
    }
  }

  selectEvent(item: Institucion): void {
    this.selectedInstitucion = item;
    if (this.selectedInstitucion) this.plcarrera = 'Elegir carrera';
    this.CarrerasByInstitucion = this.ListaGenerica.getCarrerasByInstitucion(
      item.id
    );
  }

  // Método que se activa cuando el texto de búsqueda cambia
  onChangeSearch(event: any): void {}

  getCarrerasByInstitucion(institucionId: number): Carrera[] {
    return this.carreras.filter(
      (carrera) => carrera.idInstitucion === institucionId
    );
  }

  // Método que se activa cuando el input recibe el enfoque
  onFocused(event: any): void {}
  onChangeSearchCarrera(event: any): void {}
  goBack(): void {
    this.location.back();
  }
}
