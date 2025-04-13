# Krazy Kanban Board

## Description

Krazy Kanban Board is a web application designed to help teams manage their workflow using the Kanban methodology. It provides a visual representation of tasks, allowing users to organize and track their progress through different stages (Todo, In Progress, Done). The application includes user authentication to secure access and ensure that only authorized users can view and modify project tickets.

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [Features](#features)
* [Deployed Link](#deployed-link)
* [Screenshot](#screenshot)
* [License](#license)
* [Contributors and Questions](#contributors-and-questions)

## Installation

To get the Krazy Kanban Board up and running, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd <repository_name>
    ```

2.  **Install dependencies:**
    Navigate to the project's root directory, which contains the `package.json` file, and run:
    ```bash
    npm install
    ```
    This command will install both the client-side and server-side dependencies.

3.  **Set up the database:**
    * Ensure you have PostgreSQL installed and running.
    * Create a database named `kanban_db` (or as specified in your `.env` file):
        ```bash
        psql -c 'CREATE DATABASE kanban_db;'
        ```
    * Configure your database connection by creating a `.env` file in the `server` directory.  Include the following, adjusting the values as necessary for your PostgreSQL setup:
        ```
        DB_NAME=kanban_db
        DB_USER=<your_db_username>
        DB_PASSWORD=<your_db_password>
        DB_HOST=localhost # Or the address of your database server
        DB_PORT=5432     # Or the port your database server is listening on
        ```
        If you are using a database URL, you can set the `DB_URL` variable instead.
    * Run the database schema:
        ```bash
        psql -f server/db/schema.sql -d kanban_db
        ```

4.  **Seed the database:**
    To populate the database with initial user and ticket data, navigate to the `server` directory and run:
    ```bash
    cd server
    npm run build # Ensure server code is built
    npm run seed
    cd ..
    ```

5.  **Set up Environment Variables:**
     In the `server` directory, create a `.env` file with the following variables:
    ```
    JWT_SECRET_KEY=<your_jwt_secret_key> # Replace with a strong, random string
    ```
    * Replace `<your_jwt_secret_key>` with a secret key used for signing JSON Web Tokens. This should be a strong, random string.

6.  **Run the application:**
    From the project's root directory, start the development server:
    ```bash
    npm run start:dev
    ```
    This will start both the client-side (React) development server and the server-side (Node.js/Express) server.

## Usage

Once the application is running, you can access it in your web browser at `http://localhost:5173` (or the appropriate port if configured differently).

1.  **Login:** Users must log in to view and manage tickets.  Use the login page to authenticate.  Initial user credentials are created by the seed script.
2.  **View the Kanban Board:** After logging in, you'll be presented with the Kanban board, displaying tickets organized by their status (Todo, In Progress, Done).
3.  **Manage Tickets:**
    * **View Tickets:** Tickets are displayed in their respective swimlanes.
    * **Create Tickets:** Click the Create Ticket button to navigate to a form to create new tickets.
    * **Edit Tickets:** Each ticket has an Edit button to modify the data and status of the ticket.
    * **Delete Tickets** The Delete button will remove the ticket from the database

## Features

* **Kanban Board Visualization:** Organizes tasks into columns representing different stages of completion.
* **User Authentication:** Secures the application, requiring users to log in to access and manipulate tickets.
* **Ticket Management:**
    * Create, view, edit, and delete tickets.
* **Responsive Design:** The application is designed to be responsive and adapt to different screen sizes.
* **Modern Technologies:** Built using React for the frontend and Node.js/Express for the backend.
* **Database Integration:** Uses PostgreSQL for persistent data storage.

## Deployed Link

[Link to deployed site on Render](https://kanbanboard-tiwe.onrender.com/)

## Screenshot

![Kanban Board Main](https://github.com/user-attachments/assets/90be6dac-88d0-4b01-bc24-0c8064899409)
![Add Ticket](https://github.com/user-attachments/assets/7d7efe92-fc98-49b5-864e-be147e783b8c)
![Edit Ticket](https://github.com/user-attachments/assets/71ff9ce5-3aed-436a-8171-f22ac5693b42)

## License

This project is licensed under the MIT License.

## Contributors and Questions

- [Abel Gutierrez](https://github.com/abelgtzrs)
- **Contact**: If you have questions, reach out via GitHub issues or email: [abelgtzrs](mailto:abelgtzrs@gmail.com)
