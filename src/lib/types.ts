export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface Difficulty {
  id: string;
  name: string;
}

export const CATEGORIES: Category[] = [
  { id: 'romantique', name: 'Romantique', icon: '❤️' },
  { id: 'aventure', name: 'Aventure', icon: '🌄' },
  { id: 'créatif', name: 'Créatif', icon: '🎨' },
  { id: 'quotidien', name: 'Quotidien', icon: '🏠' },
  { id: 'gourmand', name: 'Gourmand', icon: '🍽️' },
  { id: 'sportif', name: 'Sportif', icon: '🏋️' },
];

export const DIFFICULTIES: Difficulty[] = [
  { id: 'facile', name: 'Facile' },
  { id: 'moyen', name: 'Moyen' },
  { id: 'difficile', name: 'Difficile' },
];