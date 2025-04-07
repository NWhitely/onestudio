import express from 'express';
import { PrismaClient } from '@prisma/client';
import Stripe from 'stripe';
import axios from 'axios';

const prisma = new PrismaClient();
const stripe = new Stripe('your_stripe_secret_key', { apiVersion: '2020-08-27' });
const app = express();

app.use(express.json());

// User registration and login (simplified)
app.post('/register', async (req, res) => {
  const { email, password, role } = req.body;
  const user = await prisma.user.create({
    data: { email, password, role },
  });
  res.json(user);
});

// Set availability
app.post('/availability', async (req, res) => {
  const { userId, startTime, endTime, price } = req.body;
  const availability = await prisma.availability.create({
    data: { userId, startTime, endTime, price },
  });

  // Create event type in Calendly
  const accessToken = await getCalendlyAccessToken(); // Implement this function to get the OAuth token
  const response = await axios.post(
    'https://api.calendly.com/event_types',
    {
      name: `1-Hour Lesson with ${availability.userId}`,
      duration: 60,
      price: availability.price,
      // Other event type configurations
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  res.json({ availability, calendlyEventType: response.data });
});

// List availability
app.get('/availability/:userId', async (req, res) => {
  const { userId } = req.params;
  const availability = await prisma.availability.findMany({ where: { userId: parseInt(userId) } });
  res.json(availability);
});

// Create booking and initiate payment
app.post('/bookings', async (req, res) => {
  const { sellerId, buyerId, startTime, endTime, price } = req.body;
  const booking = await prisma.booking.create({
    data: { sellerId, buyerId, startTime, endTime, price },
  });

  const paymentIntent = await stripe.paymentIntents.create({
    amount: price,
    currency: 'usd',
    metadata: { bookingId: booking.id.toString() },
  });

  res.json({ booking, clientSecret: paymentIntent.client_secret });
});

// Webhook to handle payment confirmation
app.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const event = stripe.webhooks.constructEvent(req.body, req.headers['stripe-signature'], 'your_webhook_secret');

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    const bookingId = paymentIntent.metadata.bookingId;

    await prisma.booking.update({
      where: { id: parseInt(bookingId) },
      data: { paymentStatus: 'confirmed' },
    });
  }

  res.json({ received: true });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
