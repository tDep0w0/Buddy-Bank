import { Category } from '@/components/appTab/addExpense/SelectCategoriesModal';

export const DEFAULT_CATEGORIES: Category[] = [
  { id: 'general', name: 'General', icon: 'apps-outline', tint: 'rgba(148,163,184,0.25)' },
  { id: 'food', name: 'Food & Drink', icon: 'restaurant-outline', tint: 'rgba(16,185,129,0.25)' },
  { id: 'transport', name: 'Transport', icon: 'car-outline', tint: 'rgba(59,130,246,0.25)' },
  { id: 'shopping', name: 'Shopping', icon: 'bag-handle-outline', tint: 'rgba(168,85,247,0.25)' },
  { id: 'entertainment', name: 'Entertainment', icon: 'film-outline', tint: 'rgba(244,63,94,0.25)' },
];