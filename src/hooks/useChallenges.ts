import { useChallenges as useChallengeContext } from '@/contexts/ChallengeContext';

export const useChallenges = () => {
  const context = useChallengeContext();
  return context;
};