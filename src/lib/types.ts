export interface Event {
  id: string;
  title: string;
  description: string;
  dates: string[];
  createdAt: string;
}

export interface Response {
  id: string;
  eventId: string;
  name: string;
  availability: Record<string, 'ok' | 'maybe' | 'ng'>;
}

export interface ShopVote {
  shopId: string;
  count: number;
}

export interface Shop {
  id: string;
  name: string;
  area: string;
  genre: string;
  budget: string;
  address: string;
  url?: string;
  imageUrl?: string;
}

export interface Area {
  id: string;
  name: string;
}
