export * from "./auth.atom";

// Delivery atoms
import { atom } from 'jotai';
import { OrderDelivery } from '@/data/interfaces';

export type TabValue = 'pending' | 'processing' | 'shipping' | 'delivered';

export const deliveryActiveTabAtom = atom<TabValue>('pending');
export const deliveryOrdersAtom = atom<OrderDelivery[]>([]);