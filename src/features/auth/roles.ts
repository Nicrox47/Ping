export type AccountRole = 'customer' | 'organizer' | 'admin';

export const ACCOUNT_ROLES: Array<{
  id: AccountRole;
  title: string;
  description: string;
}> = [
  {
    id: 'customer',
    title: 'Usuario',
    description: 'Busca eventos, participa, encuentra conexiones y gana puntos.',
  },
  {
    id: 'organizer',
    title: 'Organizador',
    description: 'Crea y promociona eventos, gestiona asistentes y consulta resultados.',
  },
  {
    id: 'admin',
    title: 'Administrador',
    description: 'Administra la plataforma, usuarios, eventos, métricas y configuraciones.',
  },
];

export function isAccountRole(value: string): value is AccountRole {
  return ACCOUNT_ROLES.some((role) => role.id === value);
}
