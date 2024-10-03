import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/BookManagement.css";
import { Card } from "semantic-ui-react";

const BookManagement = () => {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publicationYear, setPublicationYear] = useState("");
  const [isbn, setIsbn] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetchBooks();
    checkUser();
  }, []);

  const checkUser = () => {
    const role = localStorage.getItem("userRole");
    console.log("User role from local storage:", role);
    if (role == "ADMIN") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
    console.log("Is Admin:", isAdmin);
  };

  const fetchBooks = () => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:8080/api/admin/getAllBooks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching books!", error);
      });
  };

  const handleAddBook = (e) => {
    e.preventDefault();
    const book = {
      title,
      author,
      publicationYear: parseInt(publicationYear, 10),
    };
    const token = localStorage.getItem("token");

    axios
      .post("http://localhost:8080/api/admin/addNewBook", book, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        alert("Book added successfully");
        fetchBooks();
      })
      .catch((error) => {
        console.error("Error adding new book!", error);
      });
  };

  const handleDeleteBook = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    axios
      .delete(`http://localhost:8080/api/admin/deleteBook/${isbn}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        alert("Book removed successfully!");
        fetchBooks();
      })
      .catch((error) => {
        console.error("Error removing book.", error);
      });
  };

  const handleUpdateBook = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    axios
      .put(
        `http://localhost:8080/api/admin/updateBook/${isbn}/${newTitle}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        alert("Book updated successfully");
        fetchBooks();
      })
      .catch((error) => {
        console.error("Error updating book", error);
      });
  };

  return (
    <div className="book-management-container">
      <h2>Book List</h2>
      <Card.Group itemsPerRow={5}>
        {books.map((book) => (
          <Card key={book.isbn}>
            <Card.Content>
              <Card.Header>{book.title}</Card.Header>
              <Card.Meta>{book.author}</Card.Meta>
              <Card.Description>
                ISBN : {book.isbn}
                <br></br>
                Published : {book.publicationYear}
              </Card.Description>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
      <br></br>
      {isAdmin && (
        <>
          <h2>Book Management Section</h2>

          {/* Add a new book */}
          <div className="book-management-forms">
            <div className="book-form-section">
              <h4>Add New Book</h4>
              <form onSubmit={handleAddBook} className="book-form">
                <input
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <br />
                <input
                  type="text"
                  placeholder="Author"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />
                <br />
                <input
                  type="number"
                  placeholder="Publication Year"
                  value={publicationYear}
                  onChange={(e) => setPublicationYear(e.target.value)}
                />
                <br />
                <button type="submit">Add Book</button>
              </form>
            </div>

            {/* Remove a book */}
            <div className="book-form-section">
              <h4>Remove a Book</h4>
              <form onSubmit={handleDeleteBook} className="book-form">
                <input
                  type="number"
                  placeholder="ISBN"
                  value={isbn}
                  onChange={(e) => setIsbn(e.target.value)}
                />
                <br />
                <button type="submit">Remove Book</button>
              </form>
            </div>

            {/* Update the name of the book */}
            <div className="book-form-section">
              <h4>Update Book Title</h4>
              <form onSubmit={handleUpdateBook} className="book-form">
                <input
                  type="number"
                  placeholder="ISBN"
                  value={isbn}
                  onChange={(e) => setIsbn(e.target.value)}
                />
                <br />
                <input
                  type="text"
                  placeholder="New Title"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
                <br />
                <button type="submit">Update Book</button>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BookManagement;
