import React, { useState, FormEvent } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { StripeCardElement } from '@stripe/stripe-js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, Button, Alert, CircularProgress, Paper } from '@mui/material';
import { useTranslation } from 'react-i18next';

const Checkout: React.FC = () => {
  const { t } = useTranslation();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'success' | 'error' | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const payBooking = async (bookingId: string, tokenId: string) => {
    try {
      // عنوان API المحدد - تم تعيينه على https://upskilling-egypt.com:3000
      const baseUrl = 'https://upskilling-egypt.com:3000';
      const apiUrl = `${baseUrl}/api/bookings/pay`;
      
      console.log('إرسال طلب الدفع إلى:', apiUrl);
      
      const response = await axios.post(apiUrl, { 
        bookingId, 
        tokenId 
      }, {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 10000 // مهلة 10 ثوانٍ
      });
      
      if (!response.data || response.status !== 200) {
        throw new Error(t('checkout.invalidResponse'));
      }
      
      return response.data;
    } catch (error: any) {
      console.error('تفاصيل خطأ الدفع:', error);
      if (error.response) {
        console.error('بيانات الاستجابة:', error.response.data);
        console.error('حالة الاستجابة:', error.response.status);
      }
      throw new Error(error.response?.data?.message || t('checkout.paymentError'));
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
    setSuccessMessage('');
    setPaymentStatus(null);

    try {
      // First, create the token
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
      
      // Then process the payment with the token
      const bookingId = '6812404566a988e02212298';
      const paymentResult = await payBooking(bookingId, token.id);
      
      console.log('Payment successful:', paymentResult);
      
      setPaymentStatus('success');
      setSuccessMessage(t('checkout.paymentSuccess'));

      setTimeout(() => {
        navigate('/booking-confirmation', {
          state: { bookingReference: bookingId },
        });
      }, 2500);
    } catch (err: any) {
      console.error('Payment processing error:', err);
      setPaymentStatus('error');
      setErrorMessage(err.message || t('checkout.paymentError'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      component="section"
      sx={{
        maxWidth: 500,
        mx: 'auto',
        mt: 4,
        p: 3,
        borderRadius: 2,
        boxShadow: 3,
        bgcolor: '#fff',
      }}
    >
      <Typography variant="h5" gutterBottom>
        {t('checkout.title')}
      </Typography>

      {paymentStatus === 'success' && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {successMessage}
        </Alert>
      )}

      {paymentStatus === 'error' && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errorMessage}
        </Alert>
      )}

      <form onSubmit={submitPaymentHandler}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            {t('checkout.cardDetails')}
          </Typography>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <CardElement id="card-element" />
          </Paper>
        </Box>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={!stripe || isLoading}
          sx={{ py: 1.5 }}
        >
          {isLoading ? <CircularProgress size={24} color="inherit" /> : t('checkout.confirmBooking')}
        </Button>
      </form>
    </Box>
  );
};

export default Checkout;