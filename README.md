# Wanderlust

Wanderlust is a web application designed to help users discover and review travel listings. Users can explore various listings, leave reviews, and interact with other users.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js and npm installed on your machine
- MongoDB installed and running locally

### Installing

1. Clone the repository:

```
git clone https://github.com/KashifKhn/WanderLust.git
```

2. Install dependencies:

```
npm install
```

3. Set up environment variables:

you can create the `.env` file by copying from `.env.sample` or renaming `.env.sample` to `.env`:

### Running the Application

Start the server:

```
npm start

npm run dev
```

Access the application at `http://localhost:3000`.

## Built With

- Node.js
- Express.js
- MongoDB
- EJS (Embedded JavaScript)
- Passport.js (authentication middleware for Node.js)
- Other dependencies listed in `package.json`

## Features

- User authentication with Passport.js
- CRUD operations for listings and reviews
- Error handling with custom error classes
- Flash messages for user feedback
- Responsive design using Bootstrap (not mentioned in the code provided, but you can add it if used)

## Contributing

Contributions are welcome! Please feel free to open a pull request or submit an issue.

## Authors

- [Kashif Khan](https://github.com/KashifKhn) - Initial work

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

- Hat tip to anyone whose code was used
- Inspiration
- etc.