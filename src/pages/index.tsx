import { useAuth } from '@/contexts/AuthContext';
import { useChallenges } from '@/hooks/useChallenges';
import SendChallengeForm from '@/components/SendChallengeForm';
import ChallengeCard from '@/components/ChallengeCard';
import PointsDisplay from '@/components/PointsDisplay';
import PartnerStats from '@/components/PartnerStats';
import Navigation from '@/components/Navigation';

export default function Home() {
  const { user, profile } = useAuth();
  const { sentChallenges, completedChallenges, loadSentChallenges, loadCompletedChallenges, completeChallenge } = useChallenges();

  useEffect(() => {
    if (user) {
      loadSentChallenges();
      loadCompletedChallenges();
    }
  }, [user]);

  if (!profile) return <div>Chargement...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 pb-24">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Bienvenue {profile.username} 👋</h1>
        {profile.partner_id && <PartnerStats />}
        <PointsDisplay points={profile.points} level={profile.level} className="mt-3" />

        {!profile.partner_id ? (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-xl p-6 mb-6">
            <p className="font-semibold mb-2 text-center">Aucun partenaire connecté</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">📤 Envoyer un défi</h2>
            <SendChallengeForm />
          </div>
        )}

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-800">Mes défis à réaliser</h2>
          {sentChallenges.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl">
              <p className="text-gray-600 font-semibold mb-2">Aucun défi à réaliser</p>
            </div>
          ) : (
            sentChallenges.map((sentChallenge) => {
              const isCompleted = completedChallenges.some(cc => cc.challenge_id === sentChallenge.challenge_id);
              return sentChallenge.challenge ? (
                <div key={sentChallenge.id}>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-2">
                    <p className="text-sm text-blue-800">
                      <strong>👤 Défi de {sentChallenge.sender?.username}</strong>
                    </p>
                  </div>
                  <ChallengeCard
                    challenge={sentChallenge.challenge}
                    onComplete={() => completeChallenge(sentChallenge.challenge_id!)}
                    isCompleted={isCompleted}
                  />
                </div>
              ) : null;
            })
          )}
        </div>
      </div>
      <Navigation />
    </div>
  );
}
