# Todo Application

This is a full-stack Todo application with a Go backend and a React TypeScript frontend.

# Live Website

The live version of this application can be viewed here: [Todo App](https://go-react-todo-production-622d.up.railway.app/)

# Demo 

### Installation and Setup

1. Clone the repository:
   ```
   git clone https://github.com/Nithin1729S/Go-React-TODO.git
   cd Go-React-TODO
   ```

2. Install Go dependencies:
   ```
   go mod tidy
   ```

3. Create a `.env` file in the root directory:
   ```
   MONGODB_URI=your_mongodb_uri_here
   PORT=5000
   ENV=development
   ```

4. Run the backend server :
   ```
   go run main.go
   ```

The server will start on `http://127.0.0.1:5000`.


5. Navigate to the client directory:
   ```
   cd client
   ```

6. Install dependencies:
   ```
   npm install
   ```

7. Start the development server:
   ```
   npm run dev
   ```

The frontend development server will start, typically on `http://localhost:5173`.

## API Endpoints

- `GET /api/todos`: Fetch all todos
- `POST /api/todos`: Create a new todo
- `PATCH /api/todos/:id`: Update a todo (mark as completed)
- `DELETE /api/todos/:id`: Delete a todo

