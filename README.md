# Book Management App

## Overview
This is a simple Book Management App built with React and a Django backend. The app allows users to:
- Add new books with a title and release year.
- View a list of books.
- Edit the title of existing books.
- Delete books.

## Features
- **React Frontend**: A user-friendly interface for managing books.
- **Django Backend**: A REST API to handle book data.
- **CRUD Operations**: Create, Read, Update, and Delete books.
- **Responsive Design**: Works on different screen sizes.

## Technologies Used
- **Frontend:** React, Vite, CSS
- **Backend:** Django, Django REST Framework (DRF)
- **Database:** SQLite (or PostgreSQL/MySQL based on configuration)

## Installation and Setup

### Prerequisites
Make sure you have the following installed on your system:
- Node.js & npm
- Python & pip
- Virtual environment (optional but recommended)

### Backend Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/book-management-app.git
   cd book-management-app
   ```
2. Navigate to the backend directory and create a virtual environment:
   ```sh
   cd backend
   python -m venv env
   source env/bin/activate  # On Windows use `env\Scripts\activate`
   ```
3. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```
4. Run migrations and start the backend server:
   ```sh
   python manage.py migrate
   python manage.py runserver
   ```
   The Django server will start at `http://127.0.0.1:8000/`.

### Frontend Setup
1. Navigate to the frontend directory:
   ```sh
   cd ../frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```
   The React app will be available at `http://localhost:5173/`.

## API Endpoints
- **GET /api/books/** - Retrieve all books.
- **POST /api/books/** - Add a new book.
- **PUT /api/books/{id}/** - Update a book's title.
- **DELETE /api/books/{id}/** - Delete a book.

## Usage
1. Open the frontend in your browser.
2. Enter a book title and release year, then click "Add Book".
3. View the list of books, update titles, or delete books as needed.

## Contributing
If you'd like to contribute, feel free to fork the repo and submit a pull request.

## License
This project is licensed under the MIT License.

