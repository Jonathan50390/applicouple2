export interface Challenge {
  id: string;
  title: string;
  description: string;
  points: number;
  category: string;
  difficulty: string;
}

export interface SentChallenge {
  id: string;
  sender_id: string;
  receiver_id: string;
  challenge_id: string;
  status: 'pending' | 'accepted' | 'refused' | 'completed';
  challenge?: Challenge;
  sender?: {
    username: string;
  };
}

export interface CompletedChallenge {
  id: string;
  user_id: string;
  challenge_id: string;
}

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
