# OneStudio MVP Outline

## Introduction
OneStudio is a platform that connects instructors with clients for booking live, one-on-one lessons. For launch, OneStudio will focus on the **dance instruction market**. The MVP aims to provide a functional system for user management, calendar coordination, booking and payments, notifications, and instructor-client communication. 

> **Vision & Problem Statement:** Dance instructors often rely on in-person lessons, inconsistent schedules, and fragmented tech tools. OneStudio solves this by enabling live, online dance lessons with built-in scheduling, payment, and communication tools. The MVP focuses on providing all core functionality for dance instructors to start earning right away.

---

## Features
1. **User Management**
   - User Registration/Login (with JWT)
   - Instructor/Client profile setup with bios, tags, and profile photos
   - Instructor onboarding wizard to complete availability and pricing

2. **Calendar Management**
   - Instructors manage weekly availability (calendar UI)
   - Clients browse instructor schedules and see open time slots

3. **Booking System**
   - Clients request and confirm bookings based on availability
   - Instructors accept or auto-confirm requests
   - Booking status updates, cancellations, and history

4. **Payment Integration**
   - Use **Stripe** for secure, per-session transactions
   - Instructors are paid after lessons (minus platform fee)
   - Clients can save payment methods

5. **Notifications**
   - Email confirmations (via SendGrid)
   - SMS reminders (via Twilio)
   - Optional push notifications (post-MVP)

---

## Non-Functional Requirements
1. **Performance:**
   - API response under 200ms; optimized DB queries
2. **Scalability:**
   - Horizontally scalable backend (Node.js + PostgreSQL)
3. **Security:**
   - HTTPS; bcrypt for password hashing
   - Stripe for PCI-compliant payments
4. **Reliability:**
   - 99.9% uptime with CI/CD and server monitoring

---

## User Roles and Permissions
1. **Roles:**
   - **Instructor:** Can create/edit gigs, manage bookings, receive payments
   - **Client:** Can book sessions, review instructors
   - **Admin:** Manages platform-wide settings, escalations

2. **Permissions:**
   - Role-based access (RBAC) on endpoints
   - Instructors/Clients only see their data
   - Admin sees all data

---

## User Stories
- **As a user**, I want to register and log in securely.
- **As an instructor**, I want to manage my calendar so clients can book sessions.
- **As a client**, I want to pay for a lesson and receive a confirmation.
- **As an instructor**, I want to get notified when someone books a session.

---

## API Endpoints
- `POST /api/register` – User registration
- `POST /api/login` – JWT-based login
- `GET /api/instructors` – Public instructor profiles
- `POST /api/availability` – Add calendar slots
- `GET /api/availability` – View open slots
- `POST /api/bookings` – Book a lesson
- `POST /api/payments` – Stripe integration
- `POST /api/notifications` – Send emails/SMS

---

## Database Schema
1. **User** – `id`, `email`, `password`, `role`, `username`, `bio`, `profileImage`, `createdAt`
2. **Gig** – `id`, `title`, `category`, `price`, `description`, `userId`, `createdAt`
3. **Availability** – `id`, `userId`, `startTime`, `endTime`, `isBooked`
4. **Booking** – `id`, `clientId`, `instructorId`, `timeSlotId`, `status`, `price`, `createdAt`
5. **Payment** – `id`, `bookingId`, `paymentIntentId`, `amount`, `status`
6. **Message** – `id`, `senderId`, `recipientId`, `text`, `createdAt`

---

## Technologies and Tools
- **Backend:** Node.js + Express
- **Frontend:** React.js
- **Database:** PostgreSQL + Prisma ORM
- **Payments:** Stripe
- **Email/SMS:** SendGrid, Twilio
- **Hosting:** AWS, Render, or Heroku
- **Auth:** JWT tokens + bcrypt

---

## Testing Requirements
- **Unit Tests** for all API routes (Jest)
- **Integration Tests** for booking/payment flow
- **UAT**: Walkthroughs for instructors and clients

---

## Deployment Plan
- Deploy PostgreSQL DB and Node API on Render or AWS
- GitHub Actions for automated builds/tests
- Enable auto-backups and staging database

---

## Monitoring and Maintenance
- Use **Sentry** for backend error logging
- Use **New Relic** or **Datadog** for performance monitoring
- Weekly backups and monthly patch cycles

---

## Future Features (Post-MVP)
- Instructor dashboards with analytics
- Mobile app (React Native)
- Multi-language and multi-currency support
- AI-powered instructor matching and learning feedback

---

## Revenue Model
- OneStudio takes **10% or $5 per lesson**, whichever is greater
- Future plans: subscription for premium instructor tools, analytics, and marketing boosts

---

## Timeline
1. **Weeks 1–2:** User management & auth
2. **Weeks 3–4:** Calendar and availability
3. **Weeks 5–6:** Booking + messaging
4. **Week 7:** Stripe payments
5. **Week 8:** Email/SMS notifications
6. **Weeks 9–10:** Testing, QA, and deployment

