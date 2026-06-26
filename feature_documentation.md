# Feature Documentation: Admin Dashboard & User Ratings

Here is a simple guide on what we built for the Admin Dashboard and how users can rate services.

## 1. Admin Login Details

To access the admin area, use these details:
*   **Login Page:** Go to `/auth/login`
*   **Email:** `admin@haven.com`
*   **Password:** You can type **any password** (it will let you in as an admin).

## 2. Admin Dashboard

We built a secure area just for the people who manage the website.

### What We Built
*   **Dashboard Layout:** A clean page with a menu on the side so you can easily move around.
*   **Overview Tab:** Shows simple numbers like how many users and bookings the site has.
*   **Requests Tab:** Admins can see all the new service requests from users. Admins can click **Approve** or **Decline**. When you approve a request, the system automatically creates a test booking for you.
*   **Providers Tab:** Admins can check the people providing services. You can click a button to say they are **Verified**, and you can choose if their profile should be **Published** (visible to others) or hidden.
*   **Users Tab:** Admins can see all the people using the app and can choose to **Activate** or **Suspend** their accounts.

### How to Get There
1. Go to the login page (`/auth/login`).
2. Log in using the admin email (`admin@haven.com`) and any password.
3. The system will automatically take you to the admin dashboard (`/admin/dashboard`).

---

## 3. User Ratings: How to Rate Past Services

We added a way for customers to see what they booked and leave a review.

### How Users See Past Bookings
1. The customer logs in.
2. They go to their **Bookings** page (`/customer/bookings`).
3. They click on any booking they want to see more about.

### How Users Leave a Review
1. If the job is marked as completed, they will see a "Leave a Review" button on the booking details page.
2. Clicking that button takes them to a review page.
3. They can click on stars (1 to 5) to rate the service (like "Poor" or "Excellent").
4. They can also type a comment if they want.
5. When they click submit, the worker's average star rating goes up or down depending on the score.

> **How to Test This:** 
> First, log in as the admin and approve a request (this creates a booking). 
> Second, log in as a regular customer, find that booking, and leave a 5-star review!
