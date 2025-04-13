import { Ticket } from "../models/ticket.js";

export const seedTickets = async () => {
  await Ticket.bulkCreate([
    {
      name: "Design landing page",
      status: "In Progress",
      description: "Create wireframes and mockups for the landing page.",
      assignedUserId: 1,
    },
    {
      name: "Set up project repository",
      status: "Done",
      description:
        "Create a new repository on GitHub and initialize it with a README file.",
      assignedUserId: 2,
    },
    {
      name: "Implement authentication",
      status: "Todo",
      description: "Set up user authentication using JWT tokens.",
      assignedUserId: 1,
    },
    {
      name: "Test the API",
      status: "Todo",
      description: "Test the API using Insomnia.",
      assignedUserId: 1,
    },
    {
      name: "Deploy to production",
      status: "Todo",
      description: "Deploy the application to Render.",
      assignedUserId: 2,
    },
    {
      name: "Refactor Navbar",
      status: "In Progress",
      description: "Simplify and declutter the navbar component.",
      assignedUserId: 2,
    },
    {
      name: "Fix login bug",
      status: "In Progress",
      description: "Resolve issue where login returns 500 error.",
      assignedUserId: 1,
    },
    {
      name: "Optimize DB queries",
      status: "Done",
      description: "Use indexes to speed up queries.",
      assignedUserId: 2,
    },
    {
      name: "Write unit tests",
      status: "Todo",
      description: "Add unit tests for the ticket controller.",
      assignedUserId: 1,
    },
    {
      name: "Style Kanban board",
      status: "In Progress",
      description: "Improve CSS and spacing for mobile view.",
      assignedUserId: 2,
    },
    {
      name: "Code cleanup",
      status: "Done",
      description: "Remove unused variables and dead code.",
      assignedUserId: 1,
    },
    {
      name: "Add sorting feature",
      status: "Done",
      description: "Allow tickets to be sorted by name.",
      assignedUserId: 2,
    },
    {
      name: "Filter by user",
      status: "Todo",
      description: "Implement ticket filtering based on assigned user.",
      assignedUserId: 1,
    },
    {
      name: "Implement logout",
      status: "Done",
      description: "Add logout button to Navbar.",
      assignedUserId: 1,
    },
    {
      name: "Fix redirect loop",
      status: "In Progress",
      description: "Resolve infinite useEffect loop in Navbar.",
      assignedUserId: 2,
    },
  ]);
};
