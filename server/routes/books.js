const express = require("express");
const router = express.Router();

const keycloak = require("../middlewares/keycloak");
const extractToken = require("../middlewares/extractToken");

const books = {
    admin: [
        {"name": "To Kill a Mockingbird", "author": "Harper Lee", "year": 1960},
        {"name": "1984", "author": "George Orwell", "year": 1949},
        {"name": "Pride and Prejudice", "author": "Jane Austen", "year": 1813},
        {"name": "The Great Gatsby", "author": "F. Scott Fitzgerald", "year": 1925},
        {"name": "Moby-Dick", "author": "Herman Melville", "year": 1851},
        {"name": "War and Peace", "author": "Leo Tolstoy", "year": 1869},
        {"name": "Crime and Punishment", "author": "Fyodor Dostoevsky", "year": 1866},
        {"name": "The Catcher in the Rye", "author": "J.D. Salinger", "year": 1951},
        {"name": "The Hobbit", "author": "J.R.R. Tolkien", "year": 1937},
        {"name": "Brave New World", "author": "Aldous Huxley", "year": 1932},
        {"name": "Jane Eyre", "author": "Charlotte Brontë", "year": 1847},
        {"name": "Wuthering Heights", "author": "Emily Brontë", "year": 1847},
        {"name": "The Odyssey", "author": "Homer", "year": -800},
        {"name": "Les Misérables", "author": "Victor Hugo", "year": 1862},
        {"name": "The Brothers Karamazov", "author": "Fyodor Dostoevsky", "year": 1880},
        {"name": "One Hundred Years of Solitude", "author": "Gabriel García Márquez", "year": 1967},
        {"name": "The Divine Comedy", "author": "Dante Alighieri", "year": 1320},
        {"name": "Anna Karenina", "author": "Leo Tolstoy", "year": 1877},
        {"name": "Madame Bovary", "author": "Gustave Flaubert", "year": 1857},
        {"name": "The Adventures of Huckleberry Finn", "author": "Mark Twain", "year": 1884},
        {"name": "Great Expectations", "author": "Charles Dickens", "year": 1861},
        {"name": "Ulysses", "author": "James Joyce", "year": 1922},
        {"name": "The Iliad", "author": "Homer", "year": -750},
    ],
    test: [
        {"name": "Don Quixote", "author": "Miguel de Cervantes", "year": 1615},
        {"name": "The Grapes of Wrath", "author": "John Steinbeck", "year": 1939},
        {"name": "In Search of Lost Time", "author": "Marcel Proust", "year": 1913},
        {"name": "Moby-Dick", "author": "Herman Melville", "year": 1851},
        {"name": "Lolita", "author": "Vladimir Nabokov", "year": 1955},
        {"name": "Catch-22", "author": "Joseph Heller", "year": 1961},
        {"name": "The Sound and the Fury", "author": "William Faulkner", "year": 1929},
        {"name": "The Stranger", "author": "Albert Camus", "year": 1942},
        {"name": "The Trial", "author": "Franz Kafka", "year": 1925},
        {"name": "Heart of Darkness", "author": "Joseph Conrad", "year": 1899},
        {"name": "The Sun Also Rises", "author": "Ernest Hemingway", "year": 1926},
        {"name": "Middlemarch", "author": "George Eliot", "year": 1871},
        {"name": "The Picture of Dorian Gray", "author": "Oscar Wilde", "year": 1890},
        {"name": "Beloved", "author": "Toni Morrison", "year": 1987},
        {"name": "Mrs Dalloway", "author": "Virginia Woolf", "year": 1925},
        {"name": "The Catcher in the Rye", "author": "J.D. Salinger", "year": 1951},
        {"name": "Mansfield Park", "author": "Jane Austen", "year": 1814},
        {"name": "The Old Man and the Sea", "author": "Ernest Hemingway", "year": 1952},
        {"name": "To the Lighthouse", "author": "Virginia Woolf", "year": 1927},
        {"name": "Fahrenheit 451", "author": "Ray Bradbury", "year": 1953},
        {"name": "Invisible Man", "author": "Ralph Ellison", "year": 1952},
        {"name": "Slaughterhouse-Five", "author": "Kurt Vonnegut", "year": 1969},
    ],
};

router.get("/books",
    [keycloak.protect(), extractToken],
    async (req, res, next) => {
        try {
            const username = req.tokenData?.preferred_username ?? '';
            res.json(books[username] ?? []);
        } catch (error) {
            return next(error);
        }
    });

module.exports = router;