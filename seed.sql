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

CREATE TABLE follows(
    follower_id INT NOT NULL,
    followee_id INT NOT NULL
)

rgb(0, 105, 234, 1)
npm install @radix-ui/react-separator
npm install @radix-ui/colors

SELECT profiles.username, profiles.id 
FROM profiles 
INNER JOIN posts ON profiles.id = posts.profile_id

SELECT posts.id, posts.content, posts.profile_id, posts.date, profiles.username  FROM posts INNER JOIN profiles ON profiles.id = posts.profile_id

