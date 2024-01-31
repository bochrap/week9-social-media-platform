CREATE TABLE profiles(
    id SERIAL PRIMARY KEY,
    clerk_user_id TEXT,
    username TEXT,
    bio TEXT
)

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    profile_id INTEGER REFERENCES profiles(id),
    date TIMESTAMP
)