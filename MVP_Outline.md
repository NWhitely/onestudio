# OneStudio MVP Outline

## Introduction
OneStudio is a platform that connects instructors with clients for booking lessons. The MVP aims to provide a functional system for user management, calendar management, booking, payment integration, and notifications.

> **Placeholder:** Add a short summary of the vision and goals of the platform. Why does it exist? What problem does it solve?

---

## Features
1. **User Management**
   - User Registration
   - User Login
   - Profile Management (e.g., username, bio, profile picture)

2. **Calendar Management**
   - Instructors can create and manage their availability.
   - Clients can view available time slots.

3. **Booking System**
   - Clients can book available time slots.
   - Instructors can view and manage bookings.

4. **Payment Integration**
   - Process payments for bookings using Stripe (or another payment gateway).

5. **Notifications**
   - Send email and/or SMS notifications for bookings, cancellations, and reminders.

---

## Non-Functional Requirements
1. **Performance:**
   - The system should support up to 1,000 concurrent users during peak hours.
   - Responses from the API should have a latency of less than 200ms.

2. **Scalability:**
   - The architecture should allow for easy scaling to support thousands of users globally.

3. **Security:**
   - Encrypt all sensitive data in transit using HTTPS.
   - Store passwords securely using bcrypt hashing.

4. **Reliability:**
   - The system should have 99.9% uptime.

---

## User Roles and Permissions
1. **Roles:**
   - **Instructor:** Can create gigs, manage bookings, and view reviews.
   - **Client:** Can book gigs, leave reviews, and message instructors.
   - **Admin:** Can manage all users, gigs, and bookings.

2. **Permissions:**
   - Instructors can only access and modify their own gigs and bookings.
   - Clients can only access their bookings and reviews.
   - Admins have full access to all data.

---

## User Stories
1. **User Management:**
   - As a user, I want to register for an account so that I can use the platform.
   - As an instructor, I want to manage my profile so that clients can see my qualifications.

2. **Calendar Management:**
   - As an instructor, I want to set my availability so that clients can book lessons with me.
   - As a client, I want to view available time slots so that I can book a lesson.

3. **Booking System:**
   - As a client, I want to book a lesson so that I can learn from an instructor.
   - As an instructor, I want to manage my bookings so that I can stay organized.

4. **Payment Integration:**
   - As a client, I want to pay securely for a lesson so that I can confirm my booking.

5. **Notifications:**
   - As a user, I want to receive reminders about my upcoming bookings so that I don’t miss them.

---

## API Endpoints
1. **User Registration**
   - `POST /api/register`
   - **Request:**
     ```json
     {
       "email": "user@example.com",
       "password": "securepassword",
       "username": "user123"
     }
     ```
   - **Response:**
     ```json
     {
       "id": 1,
       "email": "user@example.com",
       "username": "user123",
       "token": "jwt-token"
     }
     ```

2. **User Login**
   - `POST /api/login`

3. **Create/Update/Delete Availability**
   - `POST /api/availability`
   - `PUT /api/availability/:id`
   - `DELETE /api/availability/:id`

4. **View Available Time Slots**
   - `GET /api/availability`

5. **Book Appointment**
   - `POST /api/bookings`

6. **Payment Processing**
   - `POST /api/payments`

7. **Send Notifications**
   - `POST /api/notifications`

> **Placeholder:** Flesh out the request and response formats for all endpoints.

---

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

> **Placeholder:** Confirm if additional models (like Admin) or fields are needed.

---

## Technologies and Tools
- **Backend:** Node.js, Express, Prisma
- **Frontend:** React.js
- **Database:** PostgreSQL
- **Payment Integration:** Stripe
- **Notifications:** SendGrid or Twilio
- **Deployment:** AWS or Heroku

> **Placeholder:** Add any other tools or technologies you plan to use.

---

## Testing Requirements
1. **Unit Testing:**
   - Backend logic and API endpoints.

2. **Integration Testing:**
   - Test interactions between the database and API.

3. **User Acceptance Testing (UAT):**
   - Ensure the platform meets user expectations.

---

## Deployment Plan
1. **Hosting:** AWS or Heroku.
2. **CI/CD Pipelines:** Use GitHub Actions for testing and deployment.

> **Placeholder:** Add details about staging environments, database backups, etc.

---

## Monitoring and Maintenance
1. **Monitoring:**
   - Use New Relic or Datadog to monitor performance.
   - Use Sentry for error tracking.

2. **Maintenance:**
   - Schedule regular updates and backups.

---

## Future Features (Post-MVP)
1. Advanced analytics for instructors.
2. Mobile app support.
3. Multi-language support.

> **Placeholder:** List any other features you plan to add after the MVP launch.

---

## Revenue Model
> **Placeholder:** Add details about how the platform will generate revenue (e.g., subscription fees, booking fees).

---

## Timeline
1. **Week 1-2:** User Management
2. **Week 3-4:** Calendar Management
3. **Week 5-6:** Booking System
4. **Week 7:** Payment Integration
5. **Week 8:** Notifications
6. **Week 9:** Testing and Bug Fixes
7. **Week 10:** Deployment and Launch

> **Placeholder:** Adjust the timeline based on your development speed and team size.
