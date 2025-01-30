export interface CursosConvalidar {
  id: number; // Identificador único para la entrada
  idCurso: number; // Identificador del curso
  idCarrera: number; // Identificador de la carrera a la que pertenece el curso
  convalida: boolean; // Booleano que indica si el curso está convalidado
}
