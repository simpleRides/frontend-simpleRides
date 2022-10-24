import { render } from '@testing-library/react-native';
import App from '../App';

// Silence the warning: Animated: `useNativeDriver` is not supported...
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

it('App is alive', async () => {
  const app = render(<App />);
  expect(app).toBeTruthy();
});
