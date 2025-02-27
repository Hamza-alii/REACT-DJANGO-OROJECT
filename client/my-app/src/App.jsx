import { useState, useEffect } from 'react';
import "./App.css";

function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [editingTitles, setEditingTitles] = useState({});

  const fetchBooks = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/books/");
      if (!response.ok) throw new Error("Failed to fetch books");
      const data = await response.json();
      setBooks(data);
    } catch (err) {
      console.error("Error fetching books:", err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const addBook = async () => {
    if (!title.trim() || !releaseYear.trim()) {
      alert("Please enter both book title and release year!");
      return;
    }

    const year = parseInt(releaseYear, 10);
    if (isNaN(year) || year < 1000 || year > 9999) {
      alert("Please enter a valid release year (between 1000 and 9999).");
      return;
    }

    const bookData = { title, release_year: year };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/books/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookData),
      });

      if (!response.ok) throw new Error("Failed to add book");

      const data = await response.json();
      setBooks((prev) => [...prev, data]);
      setTitle("");
      setReleaseYear("");
    } catch (err) {
      console.error("Error adding book:", err);
    }
  };

  const updateTitle = async (pk, release_year) => {
    const newTitle = editingTitles[pk];

    if (!newTitle || !newTitle.trim()) {
      alert("Please enter a new title before updating!");
      return;
    }

    const bookData = { title: newTitle, release_year };

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/books/${pk}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookData),
      });

      if (!response.ok) throw new Error("Failed to update book");

      const data = await response.json();
      setBooks((prev) => prev.map((book) => (book.id === pk ? data : book)));

      setEditingTitles((prev) => {
        const updatedTitles = { ...prev };
        delete updatedTitles[pk];
        return updatedTitles;
      });
    } catch (err) {
      console.error("Error updating book:", err);
    }
  };

  const deleteBook = async (pk) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/books/${pk}/`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete book");

      setBooks((prev) => prev.filter((book) => book.id !== pk));
    } catch (err) {
      console.error("Error deleting book:", err);
    }
  };

  return (
    <div className="container">
      <h1>📚 Book Collection</h1>
      <div className="input-section">
        <input
          type="text"
          placeholder="Book Title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Release Year..."
          value={releaseYear}
          onChange={(e) => setReleaseYear(e.target.value)}
        />
        <button onClick={addBook} className="add-button">Add Book</button>
      </div>
      <div className="books-grid">
        {books.map((book) => (
          <div className="book-card" key={book.id}>
            <p><strong>Book Title:</strong> {book.title}</p>
            <p><strong>Release Year:</strong> {book.release_year}</p>
            <input
              type="text"
              placeholder="New title..."
              value={editingTitles[book.id] || ""}
              onChange={(e) =>
                setEditingTitles((prev) => ({ ...prev, [book.id]: e.target.value }))
              }
            />
            <button onClick={() => updateTitle(book.id, book.release_year)} className="edit-button">
              ✏️ Change Title
            </button>
            <button onClick={() => deleteBook(book.id)} className="delete-button">
              ❌ Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
