export type ShopCategory = 'avatar' | 'frame' | 'badge' | 'theme' | 'food' | 'drink' | 'merch';

export type ShopItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: ShopCategory;
  symbol: string;
  kind: 'digital' | 'real';
  availability: 'digital' | 'partner-required';
};

export const SHOP_ITEMS: ShopItem[] = [
  { id: 'avatar-neon', name: 'Avatar neón', description: 'Un estilo brillante para tu perfil.', price: 80, category: 'avatar', symbol: '✦', kind: 'digital', availability: 'digital' },
  { id: 'frame-purple', name: 'Marco violeta', description: 'Destaca tu tarjeta de jugador.', price: 120, category: 'frame', symbol: '◈', kind: 'digital', availability: 'digital' },
  { id: 'badge-explorer', name: 'Insignia explorador', description: 'Presume tus búsquedas completadas.', price: 150, category: 'badge', symbol: '⌖', kind: 'digital', availability: 'digital' },
  { id: 'theme-night', name: 'Tema nocturno+', description: 'Una variante oscura con acentos especiales.', price: 200, category: 'theme', symbol: '☾', kind: 'digital', availability: 'digital' },
  { id: 'drink-soda', name: 'Bebida fría', description: 'Canjeable por una bebida en un comercio aliado participante.', price: 300, category: 'drink', symbol: '🥤', kind: 'real', availability: 'partner-required' },
  { id: 'snack-fries', name: 'Papas o snack', description: 'Un antojo para tu próxima salida, sujeto al menú del aliado.', price: 450, category: 'food', symbol: '🍟', kind: 'real', availability: 'partner-required' },
  { id: 'burger-basic', name: 'Hamburguesa', description: 'Una hamburguesa de un comercio aliado participante.', price: 900, category: 'food', symbol: '🍔', kind: 'real', availability: 'partner-required' },
  { id: 'merch-sticker', name: 'Pack de stickers geek', description: 'Stickers de videojuegos y cultura pop, según catálogo disponible.', price: 600, category: 'merch', symbol: '🎴', kind: 'real', availability: 'partner-required' },
  { id: 'merch-keychain', name: 'Llavero gamer', description: 'Un detalle para tu mochila o llaves, según catálogo disponible.', price: 1200, category: 'merch', symbol: '🕹️', kind: 'real', availability: 'partner-required' },
];
