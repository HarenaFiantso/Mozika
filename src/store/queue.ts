import { create } from 'zustand';

type QueueStore = {
  activeQueueId: string | null;
  setActiveQueueId: (id: string) => void;
};

const useQueueStore = create<QueueStore>()(set => ({
  activeQueueId: null,
  setActiveQueueId: id => set({ activeQueueId: id }),
}));

export const queue = () => useQueueStore(state => state);
