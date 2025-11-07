import { useToast } from '@/hooks/useToast';

export default function Toast() {
  const { toast } = useToast();

  if (!toast) return null;

  return (
    <div className={`fixed bottom-4 right-4 p-4 rounded-lg ${toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
      {toast.message}
    </div>
  );
}