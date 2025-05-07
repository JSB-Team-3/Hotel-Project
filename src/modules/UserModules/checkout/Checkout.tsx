import React, { useState, FormEvent } from 'react';
import { useStripe, useElements, CardElement, AddressElement } from '@stripe/react-stripe-js';
import { StripeCardElement } from '@stripe/stripe-js';
import { useNavigate, useParams } from 'react-router-dom';
import paymentImage from '../../../assets/images/payment.png';
import {
  Box,
  Typography,
  Button,
  Alert,
  CircularProgress,
  Paper,
  Stepper,
  Step,
  StepLabel,
  useTheme,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { privateAxiosInstance } from '../../../services/api/apiInstance';
import { PORTAL_PAYMENT_URLS } from '../../../services/api/apiConfig';
import { useSnackbar } from 'notistack';
import RoomBreadcrumbs from '../../../shared/UserComponent/Breadcrumb/Breadcrumb';
import { style } from '@mui/system';

const Checkout = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { id: bookingId } = useParams<{ id: string }>();
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'success' | 'error' | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
 
  const cardElementStyle = {
    base: {
      fontSize: '16px',
      fontFamily: 'Roboto, sans-serif',
      color: theme.palette.mode === 'dark' ? theme.palette.text.primary : theme.palette.text.secondary,
      '::placeholder': {
        color: theme.palette.mode === 'dark' ? theme.palette.text.secondary : theme.palette.text.primary,
      },
    },
    invalid: {
      color: theme.palette.error.main,
    },
  };

  const breadCrumbsLinks = [
    { label: t('sidebar.home'), to: '/home' },
    { label: t('checkout.title'), to: `/rooms/${bookingId}` },
  ];
  const steps = [
    t('checkout.steps.address', 'Billing Address'),
    t('checkout.steps.payment', 'Payment Details'),
    t('checkout.steps.confirmation', 'Confirmation'),
  ];

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const payBooking = async (bookingId: string, tokenId: string) => {
    try {
      const response = await privateAxiosInstance.post(PORTAL_PAYMENT_URLS.PAY_BOOKING(bookingId), {
        token: tokenId,
      });
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error && error.message) {
        throw new Error(error.message);
      } else {
        throw new Error(t('checkout.paymentError'));
      }
    }
  };


  const submitPaymentHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      setErrorMessage(t('checkout.stripeNotLoaded'));
      setPaymentStatus('error');
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setErrorMessage(t('checkout.cardElementMissing'));
      setPaymentStatus('error');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    setPaymentStatus(null);

    try {
      const { token, error } = await stripe.createToken(cardElement as StripeCardElement);

      if (error) {
        console.error('Stripe token error:', error);
        throw new Error(error.message);
      }

      if (!token) {
        console.error('Token creation failed but no error was returned');
        throw new Error(t('checkout.tokenError'));
      }

      console.log('Token created successfully:', token.id);

      if (bookingId) {
        const paymentResult = await payBooking(bookingId, token.id);

        console.log('Payment successful:', paymentResult);

        setPaymentStatus('success');
        enqueueSnackbar(t('checkout.paymentSuccess'), { variant: 'success' });
      }
      handleNext(); // Move to confirmation step
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error('Payment processing error:', err);
        setErrorMessage(err.message);
      } else {
        console.error('Unexpected error:', err);
        setErrorMessage(t('checkout.paymentError'));
      }
      setPaymentStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              {t('checkout.cardAddress')}
            </Typography>
            <Paper variant="outlined"  sx={{
          p: 2,
          backgroundColor: theme.palette.background.paper,
          boxShadow: theme.shadows[1], // Add some box shadow to make it look consistent
        }}>
  <Box sx={{ borderRadius: 1, overflow: 'hidden' }}>
          <AddressElement options={{ mode: 'billing' }} />
        </Box>            </Paper>
          </Box>
        );
      case 1:
        return (
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              {t('checkout.cardDetails')}
            </Typography>
            <Paper variant="outlined" sx={{ p: 2 }}>
          <CardElement id="card-element"   options={{
            style: cardElementStyle,
          }} />
            </Paper>
          </Box>
        );
      case 2:
        return (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h6" gutterBottom>
              {t('checkout.thankYou', 'Thank you for your payment!')}
            </Typography>
            <Typography variant="body1">
              {t('checkout.processingOrder', 'Your order is being processed.')}
            </Typography>
            <Box component="img" src={paymentImage} sx={{ width: '362px', height: '330px' }} />
          </Box>
        );
      default:
        return <Box>Unknown step</Box>;
    }
  };

  return (
    <Box
      component="section"
      sx={{
        mx: 'auto',
        mt: 4,
        p: 3,
      }}
    >
      <Typography variant="h5" gutterBottom sx={{ mb: 3, textAlign: 'center' }}>
        {t('checkout.Payment')}
      </Typography>
      <RoomBreadcrumbs links={breadCrumbsLinks} />

      <Stepper
        activeStep={activeStep}
        alternativeLabel
        sx={{ mb: 4, maxWidth: '500px', m: 'auto', direction: 'ltr' }}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {paymentStatus === 'error' && (
        <Alert severity="error" sx={{ mb: 2, maxWidth: '600px', m: 'auto' }}>
          {errorMessage}
        </Alert>
      )}
      <Box sx={{ maxWidth: '600px', m: 'auto' }}>
        <form onSubmit={activeStep === 1 ? submitPaymentHandler : undefined}>
          {renderStepContent(activeStep)}

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            <Button
              variant="outlined"
              disabled={activeStep === 0 || activeStep === 2}
              onClick={handleBack}
            >
              {t('checkout.back', 'Back')}
            </Button>

            {activeStep === 0 && (
              <Button variant="contained" onClick={handleNext}>
                {t('checkout.next', 'Next')}
              </Button>
            )}

            {activeStep === 1 && (
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={!stripe || isLoading}
              >
                {isLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  t('checkout.confirmBooking', 'Confirm & Pay')
                )}
              </Button>
            )}

            {activeStep === 2 && (
              <Button variant="contained" onClick={() => navigate('/user-booking')}>
                {t('checkout.goToYourBooking', 'Go to your Booking')}
              </Button>
            )}
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Checkout;
