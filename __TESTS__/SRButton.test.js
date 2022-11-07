import { fireEvent, render, screen } from '@testing-library/react-native';
import SrButton from '../components/core/SrButton';

// Silence the warning: Animated: `useNativeDriver` is not supported...
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

const label = 'Connection';

it('Should contain a connection label', async () => {
  render(<SrButton label={label} />);

  expect(screen.queryByText(label)).toBeTruthy();
});

it('Should fire a function on pressed', async () => {
  const handlePressed = jest.fn();
  render(<SrButton label={label} handlePressed={handlePressed} />);
  const button = screen.queryByText(label);

  fireEvent.press(button);

  expect(handlePressed).toHaveBeenCalledTimes(1);
});
