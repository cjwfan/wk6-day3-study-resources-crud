# Study Library CRUD App

This app manages study notes/resources. Users can view saved study notes, add a new note, update an existing note, and delete a note.

## Data

The app stores study resources in a Supabase table named `study_resources`.

Table columns:
- `id`: integer, primary key
- `created_at`: timestamp
- `title`: text
- `description`: text
- `category`: text

## Backend

The backend is a Flask API.

Working routes:
- `GET /` - health check
- `GET /api/study-library` - returns all study resources
- `POST /api/study-library` - creates a new study resource
- `PATCH /api/study-library/<id>` - updates one study resource
- `DELETE /api/study-library/<id>` - deletes one study resource

To run the backend:

```bash
cd backend
source .venv/Scripts/activate
flask run --debug
```

## Frontend

The frontend is a React app. It displays saved study notes and lets the user add, update, and delete notes without refreshing the page.

To run the frontend:

```bash
cd frontend
npm install
npm run dev
```

## Database Setup

This project uses Supabase.

Create a table named `study_resources` with these columns:
- `id`: integer, primary key
- `created_at`: timestamp
- `title`: text
- `description`: text
- `category`: text

The backend reads the Supabase URL and key from `backend/.env`.
