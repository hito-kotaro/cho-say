import type { Event, Response, ShopVote } from './types';

const events = new Map<string, Event>();
const responses = new Map<string, Response[]>();
// eventId -> shopId -> vote count
const shopVotes = new Map<string, Map<string, number>>();

function generateId(): string {
  return crypto.randomUUID();
}

export function createEvent(data: {
  title: string;
  description: string;
  dates: string[];
}): Event {
  const event: Event = {
    id: generateId(),
    title: data.title,
    description: data.description,
    dates: data.dates,
    createdAt: new Date().toISOString(),
  };
  events.set(event.id, event);
  responses.set(event.id, []);
  shopVotes.set(event.id, new Map());
  return event;
}

export function getEvent(id: string): Event | undefined {
  return events.get(id);
}

export function addResponse(
  eventId: string,
  data: { name: string; availability: Record<string, 'ok' | 'maybe' | 'ng'> },
): Response {
  const response: Response = {
    id: generateId(),
    eventId,
    name: data.name,
    availability: data.availability,
  };
  const eventResponses = responses.get(eventId) ?? [];
  eventResponses.push(response);
  responses.set(eventId, eventResponses);
  return response;
}

export function getResponses(eventId: string): Response[] {
  return responses.get(eventId) ?? [];
}

export function voteForShop(eventId: string, shopId: string): ShopVote | undefined {
  const eventVotes = shopVotes.get(eventId);
  if (!eventVotes) return undefined;

  const current = eventVotes.get(shopId) ?? 0;
  eventVotes.set(shopId, current + 1);
  return { shopId, count: current + 1 };
}

export function getShopVotes(eventId: string): ShopVote[] {
  const eventVotes = shopVotes.get(eventId);
  if (!eventVotes) return [];
  const result: ShopVote[] = [];
  for (const [shopId, count] of eventVotes) {
    if (count > 0) {
      result.push({ shopId, count });
    }
  }
  return result;
}
