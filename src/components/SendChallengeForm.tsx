import { useChallenges } from '@/hooks/useChallenges';
import { CATEGORIES, DIFFICULTIES } from '@/lib/types';

export default function SendChallengeForm() {
  const { sendChallenge } = useChallenges();
  const [category, setCategory] = useState('romantique');
  const [difficulty, setDifficulty] = useState('facile');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendChallenge(category, difficulty);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Catégorie</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setCategory(cat.id)}
              className={`p-3 rounded-lg font-semibold transition-all border-2 ${
                category === cat.id
                  ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white border-transparent'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-pink-300'
              }`}
            >
              <div className="text-2xl mb-1">{cat.icon}</div>
              <div className="text-xs">{cat.name}</div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Difficulté</label>
        <div className="grid grid-cols-3 gap-2">
          {DIFFICULTIES.map((diff) => (
            <button
              key={diff.id}
              type="button"
              onClick={() => setDifficulty(diff.id)}
              className={`p-3 rounded-lg font-semibold transition-all border-2 ${
                difficulty === diff.id
                  ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white border-transparent'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-pink-300'
              }`}
            >
              {diff.name}
            </button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-3 px-4 rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all"
      >
        Envoyer le défi
      </button>
    </form>
  );
}