# Premium Developer Portfolio + Admin CMS

MERN portfolio with a black-and-yellow public site and a secure admin dashboard. All public content is stored in MongoDB and edited from `/admin`.

## Stack

- React, Vite, Tailwind CSS, React Router, Framer Motion, Lucide
- Node.js, Express, MongoDB/Mongoose, JWT, bcrypt
- Cloudinary for image/PDF uploads when credentials are set; otherwise files are stored in `server/uploads`

## Setup

1. Create a MongoDB Atlas database and copy the connection string.
2. Copy `server/.env.example` to `server/.env` and fill in:

```
PORT=5000
CLIENT_URL=http://localhost:5173
MONGODB_URI=your-atlas-uri
JWT_SECRET=a-long-random-secret
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=ChangeMe123!
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

3. Install and seed:

```bash
npm run install:all
npm run seed
```

4. Run API and client in two terminals:

```bash
npm run server
npm run dev
```

- Public site: http://localhost:5173
- Admin login: http://localhost:5173/admin/login

Change the seeded admin password after first login by re-seeding with a new `ADMIN_EMAIL` (new account) or by creating another admin in MongoDB.

## Security notes

- JWT secret and admin password live only in `server/.env`.
- Public visitors can read portfolio content and submit the contact form.
- Create/update/delete and uploads require a valid admin JWT.
- Uploads are limited to images and PDFs, max 8MB.

## Editing content

Use the dashboard to manage profile, skills, projects, education, experience, certifications, social links, messages, navigation, section visibility, and services. Saved changes appear on the public site after refresh.
