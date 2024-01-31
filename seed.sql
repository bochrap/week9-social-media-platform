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

rgb(0, 105, 234, 1)
npm install @radix-ui/react-separator
npm install @radix-ui/colors