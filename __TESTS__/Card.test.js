import { render, screen } from '@testing-library/react-native';
import Card from '../components/RidesScreen/Card';

// Silence the warning: Animated: `useNativeDriver` is not supported...
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

const pickupAddress = '55 Rue du Faubourg Saint-Honoré, 78008 Paris';

it('Should contains the pickupAddress'),
  async () => {
    render(<Card pickupAddress={pickupAddress} />);

    expect(screen.queryByText(pickupAddress)).toBeTruthy();
  };
