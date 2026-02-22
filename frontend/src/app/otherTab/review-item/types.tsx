// app/review-items/types.ts

export type Member = {
  id: string;
  name: string;
  avatarUrl?: string; // tuỳ chọn, để sẵn nếu sau này backend có url ảnh
};

export type Item = {
  id: string;
  name: string;
  price: number;
  sharedWith: string[]; 
};

export type SplitShare = {
  memberId: string;
  amount: number;
};

export type ReviewSplitResult = {
  total: number;            
  items: Item[];          
  perMember: SplitShare[]; 
};
