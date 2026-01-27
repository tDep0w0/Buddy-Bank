export type Split = {
  id: string;
  amount: number;
  user: {
    id: string;
    username: string;
    image_url: string | null;
  };
};
