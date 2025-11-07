import SendChallengeForm from '@/components/SendChallengeForm';
import Navigation from '@/components/Navigation';

export default function SendChallengePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 pb-24">
      <div className="max-w-2xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Envoyer un Défi</h1>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <SendChallengeForm />
        </div>
      </div>
      <Navigation />
    </div>
  );
}