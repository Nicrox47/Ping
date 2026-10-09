export type ShopItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'avatar' | 'frame' | 'badge' | 'theme';
  symbol: string;
};

export const SHOP_ITEMS: ShopItem[] = [
  { id: 'avatar-neon', name: 'Avatar neón', description: 'Un estilo brillante para tu perfil.', price: 80, category: 'avatar', symbol: '✦' },
  { id: 'frame-purple', name: 'Marco violeta', description: 'Destaca tu tarjeta de jugador.', price: 120, category: 'frame', symbol: '◈' },
  { id: 'badge-explorer', name: 'Insignia explorador', description: 'Presume tus búsquedas completadas.', price: 150, category: 'badge', symbol: '⌖' },
  { id: 'theme-night', name: 'Tema nocturno+', description: 'Una variante oscura con acentos especiales.', price: 200, category: 'theme', symbol: '☾' },
];
