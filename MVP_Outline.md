# OneStudio MVP Outline

## Introduction
OneStudio is a platform that connects instructors with clients for booking lessons. The MVP aims to provide a functional system for user management, calendar management, booking, payment integration, and notifications.

## Features
1. **User Management**
   - User Registration
   - User Login
   - Profile Management

2. **Calendar Management**
   - Instructors can create and manage their availability.
   - Clients can view available time slots.

3. **Booking System**
   - Clients can book available time slots.
   - Instructors can confirm bookings.

4. **Payment Integration**
   - Process payments for bookings using Stripe.

5. **Notifications**
   - Send email notifications for bookings and cancellations.

## User Stories
1. **As a user, I want to register for an account so that I can use the platform.**
2. **As an instructor, I want to create and manage my availability so that clients can book lessons with me.**
3. **As a client, I want to view available time slots and book a lesson with an instructor.**
4. **As a client, I want to make a payment for a booking using my credit card.**
5. **As a user, I want to receive email notifications for bookings and cancellations.**

## API Endpoints
1. **User Registration**
   - `POST /api/register`
   - Registers a new user.

2. **User Login**
   - `POST /api/login`
   - Authenticates a user and returns a token.

3. **Create/Update/Delete Availability**
   - `POST /api/availability`
   - `PUT /api/availability/:id`
   - `DELETE /api/availability/:id`
   - Manages instructor availability.

4. **View Available Time Slots**
   - `GET /api/availability`
   - Returns a list of available time slots.

5. **Book Appointment**
   - `POST /api/bookings`
   - Books a time slot.

6. **Payment Processing**
   - `POST /api/payments`
   - Processes payments using Stripe.

7. **Send Notifications**
   - `POST /api/notifications`
   - Sends email notifications.

## Database Schema
1. **User**
   - `id`, `email`, `password`, `isSocialLogin`, `username`, `fullName`, `description`, `profileImage`, `isProfileInfoSet`, `createdAt`

2. **Gigs**
   - `id`, `title`, `description`, `category`, `deliveryTime`, `revisions`, `features`, `price`, `shortDesc`, `createdAt`, `images`, `userId`

3. **Orders**
   - `id`, `createdAt`, `buyerId`, `paymentIntent`, `isCompleted`, `gigId`, `price`

4. **Reviews**
   - `id`, `createdAt`, `rating`, `reviewText`, `gigId`, `reviewerId`

5. **Message**
   - `id`, `text`, `createdAt`, `isRead`, `senderId`, `recipientId`, `orderId`

## Technologies and Tools
- **Backend:** Node.js, Express, Prisma
- **Frontend:** React.js
- **Database:** PostgreSQL
- **Payment Integration:** Stripe
- **Notifications:** SendGrid or Twilio
- **Deployment:** AWS or Heroku

## Timeline
1. **Week 1-2:** User Management
2. **Week 3-4:** Calendar Management
3. **Week 5-6:** Booking System
4. **Week 7:** Payment Integration
5. **Week 8:** Notifications
6. **Week 9:** Testing and Bug Fixes
7. **Week 10:** Deployment and Launch
