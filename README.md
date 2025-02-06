#1.**Project Name:**  **Blood Bond**🩸🩸
<p align="center">
  <img src="https://i.ibb.co.com/mCGFwrtw/Capture.png" alt="Project Preview" width="600" />
</p>

#2.**Live-Link=>** https://blood-donation-6ebb1.web.app

#3.**Description =>** The Blood Donation Application is designed to streamline the process of blood donation by connecting donors, volunteers, and recipients efficiently. As a volunteer, your role is crucial in managing donation requests and assisting with content creation while ensuring a smooth workflow within the platform.

----

#4. **key features of my project =>**

⁕ Role Mangement 
1.Adimn =>
 ⁕User Management
   1.View all users (Donors, Volunteers, Admins) in a table format.
   2.Filter users by status (Active, Blocked).
   3.Block/Unblock users with a single click.
   4.Promote users to Volunteer or Admin roles.
   
 ⁕Blood Donation Request Management:
  1.View and manage all blood donation requests.
  2.Change donation status (Pending → In Progress → Done/Canceled).
  3.Search and filter donation requests by status.
  4.Edit or delete any donation request.
 
 ⁕Content Management (Blogs):
  1.Add new blog posts with title, thumbnail, and rich text content.
  2.Manage blog posts (Publish/Unpublish/Delete).
  3.View all blog posts with filtering options (Draft/Published).

 ⁕ Role-Based Access Control:
  1.Manage user roles and permissions (Donor, Volunteer, Admin).
  2.Assign admin roles directly via database modification.


2.Donor Role=>
 ⁕User Registration & Profile Management:
 1. Easy registration with details such as name, email, blood group, location, and avatar upload via ImageBB.
 2. Update profile information (except email) with an edit/save functionality.
 3.View profile details including blood group, address, and contact info.
 4. Default user role set to "Donor" upon registration.


 ⁕Create Blood Donation Requests:
   1.Submit donation requests with recipient details, location, and preferred date/time.
   2.Provide a reason for the donation request.
   3.Status set to "Pending" by default.
   4.Validation to restrict blocked users from creating donation requests.

   ⁕Manage Donation Requests:
    1.View all donation requests made by the donor with filtering options (Pending, In Progress, Done, Canceled).
    2.Edit and update donation requests.
    3.Delete donation requests with a confirmation modal.
    4.Mark donations as "Done" or "Canceled" when status is "In Progress."

3.Volunteer Role =>
  ⁕Volunteer Dashboard Overview:
    1.Personalized welcome message displaying volunteer’s name.
    2.Responsive sidebar layout for easy navigation.
    3.Overview cards showing statistics like total users, total funding, and donation requests.


 ⁕Blood Donation Request Management:
  1.View all donation requests with pagination and filtering (Pending, In Progress, Done, Canceled).
  2.Update donation request statuses (Pending → In Progress → Done/Canceled).
  3.Restricted access to critical operations like editing or deleting requests (only for admin).

    
   ⁕Content Management System (CMS):
   1.Ability to create and publish blogs.
   2.Add blog posts with title, image, and rich text content using Jodit React editor.
   3.Volunteers cannot delete or publish/unpublish blogs; only admins have these privileges.
   
⁕ Private Routes for Personalized Experience

⁕ Seamless Authentication

⁕ Error-Free Navigation

⁕ Search Donars

⁕ Interactive UI

---

#5. **Technology used =>**
---

### Frontend:
- **React.js** 
- **Tailwind CSS** 
- **daisyUI**
-**React lottie**
-**react-fast-marquee**
-**@tanstack/react-query**
 -**axios**


### Backend:
- **Node.js**
- **Express.js** 
- **MongoDB** 

### Authentication:
- **Firebase Authentication** - Secure and easy authentication system for user login
-  **JWT Authentication** - For secure user login and authorization.
-  **strip** - For payment Method

---
### Frontend Dependencies:
- `react`
- `react-router-dom`
- `tailwindcss`
- `firebase`
- `daisyui`
- `react-awesome-reveal`
- `axios`
- `react-datepicker`
- `framer-motion`

 ### Backend Dependencies:
- `express`
- `mongodb`
- `cookie-parser`
- `jsonwebtoken`
- `cors`
- `strip`

  ---

### Getting Started
---
To run this project on your local machine, follow these steps:

### 2.Install dependencies:

npm install

### 3. Run the frontend

npm run dev or npm start

 
