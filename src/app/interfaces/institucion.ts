export interface Institucion {
  id: number;
  nombre: string;
}

export interface Carrera {
  id: number;
  nombre: string;
  idInstitucion: number;
}
