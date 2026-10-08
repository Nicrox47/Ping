export const INTERESTS = [
  'Videojuegos',
  'Anime',
  'Música',
  'Películas',
  'Series',
  'Deportes',
  'Tecnología',
  'Fotografía',
  'Viajes',
  'Arte',
  'Libros',
  'Cocina',
] as const;

export type Interest = (typeof INTERESTS)[number];

export const MIN_INTERESTS = 3;
export const MAX_INTERESTS = 6;
