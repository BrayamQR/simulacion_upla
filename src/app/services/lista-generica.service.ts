import { Injectable } from '@angular/core';
import { Carrera, Institucion } from '../interfaces/institucion';
import { Curso } from '../interfaces/cursos';
import { CursosConvalidar } from '../interfaces/cursos-convalidar';

@Injectable({
  providedIn: 'root',
})
export class ListaGenericaService {
  private instituciones: Institucion[] = [
    { id: 1, nombre: 'Universidad Nacional Mayor de San Marcos' },
    { id: 2, nombre: 'Pontificia Universidad Católica del Perú' },
    { id: 3, nombre: 'Instituto Superior Tecnológico Cibertec' },
    { id: 4, nombre: 'Universidad de Lima' },
    { id: 5, nombre: 'Instituto de Educación Tecnológica del Perú' },
  ];

  private carreras: Carrera[] = [
    { id: 1, nombre: 'Ingeniería de Sistemas', idInstitucion: 1 },
    { id: 2, nombre: 'Medicina', idInstitucion: 1 },
    { id: 3, nombre: 'Derecho', idInstitucion: 1 },

    { id: 4, nombre: 'Arquitectura', idInstitucion: 2 },
    { id: 5, nombre: 'Ingeniería Industrial', idInstitucion: 2 },
    { id: 6, nombre: 'Psicología', idInstitucion: 2 },
    { id: 7, nombre: 'Negocios Internacionales', idInstitucion: 2 },

    { id: 8, nombre: 'Desarrollo de Software', idInstitucion: 3 },
    { id: 9, nombre: 'Redes y Comunicaciones', idInstitucion: 3 },
    { id: 10, nombre: 'Ciberseguridad', idInstitucion: 3 },

    { id: 11, nombre: 'Ingeniería Civil', idInstitucion: 4 },
    { id: 12, nombre: 'Economía', idInstitucion: 4 },
    { id: 13, nombre: 'Comunicación Social', idInstitucion: 4 },

    { id: 14, nombre: 'Técnico en Electrónica', idInstitucion: 5 },
    {
      id: 15,
      nombre: 'Técnico en Mantenimiento de Computadoras',
      idInstitucion: 5,
    },

    { id: 16, nombre: 'Ingeniería Civil', idInstitucion: 0 },
    { id: 17, nombre: 'Arquitectura', idInstitucion: 0 },
    { id: 18, nombre: 'Medicina', idInstitucion: 0 },
    { id: 19, nombre: 'Derecho', idInstitucion: 0 },
    { id: 20, nombre: 'Ingeniería de Sistemas', idInstitucion: 0 },
  ];

  private cursos: Curso[] = [
    // Ciclo 1
    { id: 1, nombre: 'INTRODUCCIÓN EMPRESARIAL', ciclo: 1 },
    { id: 2, nombre: 'MATEMÁTICA BÁSICA', ciclo: 1 },
    { id: 3, nombre: 'REALIDAD NACIONAL', ciclo: 1 },
    { id: 4, nombre: 'COMUNICACIÓN ORAL Y ESCRITA', ciclo: 1 },
    { id: 5, nombre: 'ENGLISH I', ciclo: 1 },

    // Ciclo 2
    { id: 6, nombre: 'FILOSOFÍA Y ÉTICA', ciclo: 2 },
    { id: 7, nombre: 'MATEMÁTICA APLICADA A LOS NEGOCIOS', ciclo: 2 },
    {
      id: 8,
      nombre: 'TÓPICOS GENERALES DE LA CIENCIA DE LA COMPUTACIÓN',
      ciclo: 2,
    },
    { id: 9, nombre: 'ENGLISH II', ciclo: 2 },

    // Ciclo 3
    { id: 10, nombre: 'ESTADÍSTICA DESCRIPTIVA E INFERENCIAL', ciclo: 3 },
    { id: 11, nombre: 'LIDERAZGO Y SOSTENIBILIDAD', ciclo: 3 },
    { id: 12, nombre: 'INTRODUCCIÓN AL MARKETING', ciclo: 3 },
    { id: 13, nombre: 'PRINCIPIOS DE ADMINISTRACIÓN', ciclo: 3 },
    { id: 14, nombre: 'ENGLISH III', ciclo: 3 },

    // Ciclo 4
    { id: 15, nombre: 'ECONOMÍA BÁSICA', ciclo: 4 },
    { id: 16, nombre: 'DISEÑO DE PROCESOS ORGANIZACIONALES', ciclo: 4 },
    { id: 17, nombre: 'METODOLOGÍA DE LA INVESTIGACIÓN', ciclo: 4 },
    { id: 18, nombre: 'ENGLISH IV', ciclo: 4 },

    // Ciclo 5
    { id: 19, nombre: 'CONTABILIDAD GENERAL', ciclo: 5 },
    { id: 20, nombre: 'INVESTIGACIÓN DE MERCADOS', ciclo: 5 },
    { id: 21, nombre: 'MICROECONOMÍA', ciclo: 5 },
    { id: 22, nombre: 'HABILIDADES GERENCIALES', ciclo: 5 },

    // Ciclo 6
    { id: 23, nombre: 'COMPORTAMIENTO ORGANIZACIONAL', ciclo: 6 },
    { id: 24, nombre: 'DERECHO EMPRESARIAL Y SOCIEDADES', ciclo: 6 },
    {
      id: 25,
      nombre: 'ANÁLISIS E INTERPRETACIÓN DE ESTADOS FINANCIEROS',
      ciclo: 6,
    },
    { id: 26, nombre: 'ADMINISTRACIÓN DE RECURSOS HUMANOS', ciclo: 6 },

    // Ciclo 7
    { id: 27, nombre: 'CONTABILIDAD DE COSTOS', ciclo: 7 },
    { id: 28, nombre: 'FINANZAS', ciclo: 7 },
    { id: 29, nombre: 'GERENCIA DE OPERACIONES Y LOGÍSTICA', ciclo: 7 },
    { id: 30, nombre: 'ELECTIVO 1', ciclo: 7 },

    // Ciclo 8
    { id: 31, nombre: 'PLANEAMIENTO ESTRATÉGICO', ciclo: 8 },
    { id: 32, nombre: 'CONTABILIDAD GERENCIAL', ciclo: 8 },
    { id: 33, nombre: 'DERECHO TRIBUTARIO Y LABORAL', ciclo: 8 },
    { id: 34, nombre: 'ELECTIVO 2', ciclo: 8 },

    // Ciclo 9
    { id: 35, nombre: 'EVALUACIÓN DE PROYECTOS', ciclo: 9 },
    { id: 36, nombre: 'GERENCIA ESTRATÉGICA', ciclo: 9 },
    { id: 37, nombre: 'SEMINARIO DE TESIS I', ciclo: 9 },
    { id: 38, nombre: 'ELECTIVO 3', ciclo: 9 },

    // Ciclo 10
    { id: 39, nombre: 'PROYECTO INTEGRADOR', ciclo: 10 },
    {
      id: 40,
      nombre: 'SISTEMAS INTEGRADOS DE INFORMACIÓN GERENCIAL',
      ciclo: 10,
    },
    { id: 41, nombre: 'SEMINARIO DE TESIS II', ciclo: 10 },
    { id: 42, nombre: 'ELECTIVO 4', ciclo: 10 },
  ];

  private listaCursosConvalida: CursosConvalidar[] = [
    {
      id: 1,
      idCurso: 2,
      idInstitucion: 1,
      idCarrera: 1,
      idCarreraUpla: 20,
      convalida: true,
    },
    {
      id: 2,
      idCurso: 5,
      idInstitucion: 1,
      idCarrera: 1,
      idCarreraUpla: 20,
      convalida: true,
    },
    {
      id: 3,
      idCurso: 8,
      idInstitucion: 1,
      idCarrera: 1,
      idCarreraUpla: 20,
      convalida: true,
    },
    {
      id: 4,
      idCurso: 13,
      idInstitucion: 1,
      idCarrera: 1,
      idCarreraUpla: 20,
      convalida: true,
    },
    {
      id: 5,
      idCurso: 3,
      idInstitucion: 1,
      idCarrera: 1,
      idCarreraUpla: 20,
      convalida: true,
    },
    {
      id: 6,
      idCurso: 10,
      idInstitucion: 1,
      idCarrera: 1,
      idCarreraUpla: 20,
      convalida: true,
    },
    {
      id: 7,
      idCurso: 6,
      idInstitucion: 1,
      idCarrera: 1,
      idCarreraUpla: 20,
      convalida: true,
    },
    {
      id: 8,
      idCurso: 12,
      idInstitucion: 1,
      idCarrera: 1,
      idCarreraUpla: 20,
      convalida: true,
    },
    {
      id: 9,
      idCurso: 4,
      idInstitucion: 1,
      idCarrera: 1,
      idCarreraUpla: 20,
      convalida: true,
    },
    {
      id: 10,
      idCurso: 14,
      idInstitucion: 1,
      idCarrera: 1,
      idCarreraUpla: 20,
      convalida: true,
    },
    {
      id: 11,
      idCurso: 7,
      idInstitucion: 1,
      idCarrera: 1,
      idCarreraUpla: 20,
      convalida: true,
    },
    {
      id: 12,
      idCurso: 16,
      idInstitucion: 1,
      idCarrera: 1,
      idCarreraUpla: 20,
      convalida: true,
    },
    {
      id: 13,
      idCurso: 11,
      idInstitucion: 1,
      idCarrera: 1,
      idCarreraUpla: 20,
      convalida: true,
    },
    {
      id: 14,
      idCurso: 9,
      idInstitucion: 1,
      idCarrera: 1,
      idCarreraUpla: 20,
      convalida: true,
    },
    {
      id: 15,
      idCurso: 15,
      idInstitucion: 1,
      idCarrera: 1,
      idCarreraUpla: 20,
      convalida: true,
    },
    {
      id: 16,
      idCurso: 42,
      idInstitucion: 1,
      idCarrera: 1,
      idCarreraUpla: 20,
      convalida: true,
    },
  ];

  getInstituciones(): Institucion[] {
    return this.instituciones;
  }

  getCarrerasByInstitucion(institucionId: number): Carrera[] {
    return this.carreras.filter(
      (carrera) => carrera.idInstitucion === institucionId
    );
  }

  getAllCursos() {
    return this.cursos.sort((a, b) => a.ciclo - b.ciclo);
  }

  getCursosConvalida(
    idInstitucion: number,
    idCarrera: number,
    idCarreraUpla: number
  ): CursosConvalidar[] {
    return this.listaCursosConvalida.filter(
      (curso) =>
        curso.idInstitucion === idInstitucion &&
        curso.idCarrera === idCarrera &&
        curso.idCarreraUpla === idCarreraUpla
    );
  }
}
