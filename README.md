# Coffey Communications Coding Test

An application to fetch and filter pets and toys, built for an interview at Coffey Communications.

## Diagram

The Entity Relationship Diagram I created for this project can be found at `erd/erd.html`.

## How to run

### Installing the repository and dependencies

```bash
# Clone this repository
git clone https://github.com/pnm122/coding-test

# Go into the repository
cd coding-test

# Install dependencies
npm install
```

### Getting the database running

You'll need a Postgres database to run this project. Once you have one, in a root `.env` file, you'll need to put a URL for the database:

```sh
DATABASE_URL=postgresql://[USER]:[PASSWORD]@[HOST]:[PORT]/[DATABASE]?schema=[SCHEMA] # i.e. DATABASE_URL=postgresql://pnm122:abc123@localhost:5432/coding-test?schema=public
```

After creating the `.env`, you'll need to update the database to match the schema. You can do so by running `npx prisma migrate dev`.

Finally, you'll want to seed the database with the data I've provided. You can do this by running `npm run seed`.

### Running the app

After you've installed the dependencies and linked a database, the project is ready to run! You can run the app with the command `npm run dev`.

---

Pierce Martin
