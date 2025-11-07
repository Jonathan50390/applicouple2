import { render, fireEvent } from '@testing-library/react';
import SendChallengeForm from '@/components/SendChallengeForm';

test('submits challenge with selected category and difficulty', () => {
  const mockSendChallenge = jest.fn();
  const { getByText } = render(<SendChallengeForm sendChallenge={mockSendChallenge} />);

  fireEvent.click(getByText('Envoyer le défi'));
  expect(mockSendChallenge).toHaveBeenCalledWith('romantique', 'facile');
});