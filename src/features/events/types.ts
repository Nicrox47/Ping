export type EventStatus = 'draft' | 'published' | 'active' | 'finished' | 'cancelled';

export type EventLocation = {
  address: string;
  city: string;
  latitude?: number;
  longitude?: number;
  mapUrl?: string;
};

export type PingEvent = {
  id: string;
  organizerId: string;
  name: string;
  description: string;
  coverImageUrl?: string;
  location: EventLocation;
  startAt: string;
  endAt: string;
  status: EventStatus;
  isPromoted: boolean;
  capacity?: number;
  attendeeCount: number;
};
