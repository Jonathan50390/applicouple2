import { createContext, useContext, useState, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import { Challenge, SentChallenge, CompletedChallenge } from '@/lib/types';

interface ChallengeContextType {
  sentChallenges: SentChallenge[];
  completedChallenges: CompletedChallenge[];
  loadSentChallenges: () => Promise<void>;
  loadCompletedChallenges: () => Promise<void>;
  sendChallenge: (category: string, difficulty: string) => Promise<void>;
  completeChallenge: (challengeId: string) => Promise<void>;
  acceptChallenge: (challengeId: string) => Promise<void>;
  refuseChallenge: (challengeId: string) => Promise<void>;
}

const ChallengeContext = createContext<ChallengeContextType | undefined>(undefined);

export const ChallengeProvider = ({ children, userId, partnerId }: {
  children: ReactNode;
  userId: string;
  partnerId: string | null;
}) => {
  const [sentChallenges, setSentChallenges] = useState<SentChallenge[]>([]);
  const [completedChallenges, setCompletedChallenges] = useState<CompletedChallenge[]>([]);

  const loadSentChallenges = async () => {
    const { data } = await supabase
      .from('sent_challenges')
      .select('*, challenge:challenges(*), sender:profiles(*)')
      .eq('receiver_id', userId)
      .eq('status', 'accepted');
    if (data) setSentChallenges(data as SentChallenge[]);
  };

  const loadCompletedChallenges = async () => {
    const { data } = await supabase
      .from('completed_challenges')
      .select('*')
      .eq('user_id', userId);
    if (data) setCompletedChallenges(data);
  };

  const sendChallenge = async (category: string, difficulty: string) => {
    if (!partnerId) throw new Error('No partner associated');

    const { error } = await supabase.from('sent_challenges').insert({
      sender_id: userId,
      receiver_id: partnerId,
      category,
      difficulty,
      status: 'pending',
    });

    if (!error) await loadSentChallenges();
  };

  const completeChallenge = async (challengeId: string) => {
    const challenge = sentChallenges.find(sc => sc.challenge_id === challengeId);
    if (!challenge?.challenge) return;

    const { error } = await supabase.from('completed_challenges').insert({
      user_id: userId,
      challenge_id: challengeId,
    });

    if (!error) {
      await supabase
        .from('sent_challenges')
        .update({ status: 'completed' })
        .eq('id', challenge.id);
      await loadSentChallenges();
      await loadCompletedChallenges();
    }
  };

  const acceptChallenge = async (challengeId: string) => {
    const { error } = await supabase
      .from('sent_challenges')
      .update({ status: 'accepted' })
      .eq('id', challengeId);

    if (!error) await loadSentChallenges();
  };

  const refuseChallenge = async (challengeId: string) => {
    const { error } = await supabase
      .from('sent_challenges')
      .update({ status: 'refused' })
      .eq('id', challengeId);

    if (!error) await loadSentChallenges();
  };

  return (
    <ChallengeContext.Provider
      value={
        sentChallenges,
        completedChallenges,
        loadSentChallenges,
        loadCompletedChallenges,
        sendChallenge,
        completeChallenge,
        acceptChallenge,
        refuseChallenge,
      }
    >
      {children}
    </ChallengeContext.Provider>
  );
};

export const useChallenges = () => {
  const context = useContext(ChallengeContext);
  if (!context) throw new Error('useChallenges must be used within a ChallengeProvider');
  return context;
};