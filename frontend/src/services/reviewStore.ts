import { useState, useEffect } from "react";

// ─── Types ───────────────────────────────────────────────────────────
export type ReviewItem = {
  id: string;
  name: string;
  price: number;
  sharedWith: string[];
};

export type ReviewMember = {
  id: string;
  name: string;
};

// ─── Module-level state (singleton) ──────────────────────────────────
let _items: ReviewItem[] = [];
let _members: ReviewMember[] = [];
let _receiptImageUrl = "";
let _totalBill = 0;

const _listeners = new Set<() => void>();
function emit() {
  _listeners.forEach((fn) => fn());
}

// ─── Public API ──────────────────────────────────────────────────────
export const reviewStore = {
  /**
   * Initialize the store with data from the receipt scan.
   * Call this before navigating to the review-item screen.
   */
  init(data: {
    items: ReviewItem[];
    members: ReviewMember[];
    receiptImageUrl: string;
    totalBill: number;
  }) {
    _items = [...data.items];
    _members = [...data.members];
    _receiptImageUrl = data.receiptImageUrl;
    _totalBill = data.totalBill;
    emit();
  },

  // ── Getters ──
  getItems: () => _items,
  getMembers: () => _members,
  getReceiptImageUrl: () => _receiptImageUrl,
  getTotalBill: () => _totalBill,

  // ── Mutators ──
  addItem(item: ReviewItem) {
    _items = [..._items, item];
    emit();
  },

  updateItem(id: string, updates: Partial<ReviewItem>) {
    _items = _items.map((i) => (i.id === id ? { ...i, ...updates } : i));
    emit();
  },

  removeItem(id: string) {
    _items = _items.filter((i) => i.id !== id);
    emit();
  },

  /** Reset store (optional cleanup). */
  reset() {
    _items = [];
    _members = [];
    _receiptImageUrl = "";
    _totalBill = 0;
    emit();
  },
};

// ─── React Hook ──────────────────────────────────────────────────────
/**
 * Subscribe to reviewStore changes.
 * Components using this hook re-render whenever the store is mutated.
 */
export function useReviewStore() {
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    const listener = () => forceUpdate((n) => n + 1);
    _listeners.add(listener);
    return () => {
      _listeners.delete(listener);
    };
  }, []);

  return {
    items: reviewStore.getItems(),
    members: reviewStore.getMembers(),
    receiptImageUrl: reviewStore.getReceiptImageUrl(),
    totalBill: reviewStore.getTotalBill(),
  };
}
