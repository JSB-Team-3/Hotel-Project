import { Elements } from '@stripe/react-stripe-js';

import { loadStripe } from '@stripe/stripe-js';
import Checkout from './Checkout';
import { useTheme } from '@mui/system';

export default function StripeElement() {
  const stripePromise = loadStripe(
    'pk_test_51OTjURBQWp069pqTmqhKZHNNd3kMf9TTynJtLJQIJDOSYcGM7xz3DabzCzE7bTxvuYMY0IX96OHBjsysHEKIrwCK006Mu7mKw8'
  );
  const theme = useTheme();
  const stripeTheme: "night" | "stripe" | "flat" = theme.palette.mode === 'dark' ? 'night' : 'stripe';

  const appearance = {
    theme: stripeTheme, 
    variables: {
      colorPrimary: theme.palette.primary.main,
      colorBackground: theme.palette.background.paper,
      colorText: theme.palette.text.primary,
      colorDanger: theme.palette.error.main,
    },
  };
  return (
    <Elements stripe={stripePromise} options={{ appearance }}>
      <Checkout />
    </Elements>
  );
}
