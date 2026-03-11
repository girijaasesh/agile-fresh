'use client';
import { useState } from 'react';
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
console.log('Stripe key loaded:', key ? 'YES' : 'NO - KEY MISSING');
const stripePromise = loadStripe(key);

function CheckoutForm({ amount, currency, onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!stripe || !elements) return;
    setLoading(true);
    setError('');

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setError(submitError.message);
      setLoading(false);
      return;
    }

    const { error: confirmError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/registration-success`,
      },
      redirect: 'if_required',
    });

    if (confirmError) {
      setError(confirmError.message);
      setLoading(false);
    } else {
      onSuccess();
    }
  };

  return (
    <div>
      <PaymentElement />
      {error && (
        <div style={{
          background: '#FEE2E2',
          color: '#991B1B',
          padding: '12px',
          borderRadius: '8px',
          marginTop: '16px',
          fontSize: '14px',
        }}>
          {error}
        </div>
      )}
      <button
        onClick={handleSubmit}
        disabled={loading || !stripe}
        style={{
          width: '100%',
          padding: '14px',
          background: loading ? '#9CA3AF' : '#0B1629',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: 'bold',
          cursor: loading ? 'not-allowed' : 'pointer',
          marginTop: '24px',
        }}
      >
        {loading ? 'Processing...' : `Pay ${currency} ${amount}`}
      </button>
    </div>
  );
}

export default function PaymentForm({ amount, currency, name, email, courseTitle, onSuccess }) {
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const initializePayment = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, currency, name, email, courseTitle }),
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        setClientSecret(data.clientSecret);
      }
    } catch (err) {
      setError('Failed to initialize payment. Please try again.');
    }
    setLoading(false);
  };

  if (!clientSecret) {
    return (
      <div style={{ textAlign: 'center', padding: '24px' }}>
        <p style={{ marginBottom: '16px', color: '#374151' }}>
          Course: <strong>{courseTitle}</strong>
        </p>
        <p style={{ marginBottom: '24px', fontSize: '24px', fontWeight: 'bold', color: '#0B1629' }}>
          {currency} {amount}
        </p>
        {error && (
          <div style={{
            background: '#FEE2E2',
            color: '#991B1B',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '16px',
            fontSize: '14px',
          }}>
            {error}
          </div>
        )}
        <button
          onClick={initializePayment}
          disabled={loading}
          style={{
            width: '100%',
            padding: '14px',
            background: loading ? '#9CA3AF' : '#0B1629',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? 'Loading...' : 'Proceed to Payment'}
        </button>
        <p style={{ marginTop: '12px', fontSize: '12px', color: '#9CA3AF' }}>
          🔒 256-bit SSL encrypted · Powered by Stripe
        </p>
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm
        amount={amount}
        currency={currency}
        onSuccess={onSuccess}
      />
    </Elements>
  );
}