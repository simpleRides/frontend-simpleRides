import { fireEvent, render, screen } from '@testing-library/react-native';
import SrInput from '../components/core/SrInput';

// Silence the warning: Animated: `useNativeDriver` is not supported...
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

const label = 'Connexion';

it('Should contains a label and a placeholder', async () => {
  render(<SrInput label={label} placeholder="Type something..." />);

  expect(screen.queryByText(label)).toBeTruthy();
});
