import { useEffect, useState, useLayoutEffect } from "react";
import { Link } from "react-router-dom";

import { retrieveTickets, deleteTicket } from "../api/ticketAPI";
import ErrorPage from "./ErrorPage";
import Swimlane from "../components/Swimlane";
import { TicketData } from "../interfaces/TicketData"; // Ensure this interface includes fields like name, createdAt etc.
import { ApiMessage } from "../interfaces/ApiMessage";

import auth from "../utils/auth";

const boardStates = ["Todo", "In Progress", "Done"];

// Define the possible fields to sort by (must exist in TicketData interface)
type SortableField = "name" | "createdAt" | "updatedAt" | "status"; // Add other sortable fields if needed

const Board = () => {
  // State for raw, unsorted tickets from API
  const [rawTickets, setRawTickets] = useState<TicketData[]>([]);
  // State for tickets that will be displayed (sorted)
  const [displayedTickets, setDisplayedTickets] = useState<TicketData[]>([]);
  // State for sorting criteria
  const [sortBy, setSortBy] = useState<SortableField | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const [error, setError] = useState(false);
  const [loginCheck, setLoginCheck] = useState(false);

  const checkLogin = () => {
    if (auth.loggedIn()) {
      setLoginCheck(true);
    }
  };

  const fetchTickets = async () => {
    try {
      const data = await retrieveTickets();
      setRawTickets(data); // Store the original, unsorted data
      // Initially display tickets as fetched (or apply default sort if desired)
      // setDisplayedTickets(data); // We let the useEffect handle this now
    } catch (err) {
      console.error("Failed to retrieve tickets:", err);
      setError(true);
    }
  };

  const deleteIndvTicket = async (ticketId: number): Promise<ApiMessage> => {
    try {
      const data = await deleteTicket(ticketId);
      // Refetch tickets after delete to update both raw and displayed lists
      fetchTickets();
      return data;
    } catch (err) {
      return Promise.reject(err);
    }
  };

  useLayoutEffect(() => {
    checkLogin();
  }, []);

  useEffect(() => {
    if (loginCheck) {
      fetchTickets();
    }
  }, [loginCheck]);

  // useEffect hook to handle sorting when rawTickets, sortBy, or sortOrder changes
  useEffect(() => {
    let sortedTickets = [...rawTickets]; // Start with a copy of the raw data

    if (sortBy) {
      // Only sort if a field is selected
      sortedTickets.sort((a, b) => {
        // Type assertion needed because sortBy is dynamic
        const valA = a[sortBy as keyof TicketData];
        const valB = b[sortBy as keyof TicketData];
        let comparison = 0;

        // Add comparisons based on expected data types
        if (sortBy === "createdAt" || sortBy === "updatedAt") {
          // Assuming date strings; adjust if they are Date objects or numbers
          comparison =
            new Date(valA as string).getTime() -
            new Date(valB as string).getTime();
        } else if (typeof valA === "string" && typeof valB === "string") {
          comparison = valA.localeCompare(valB);
        } else if (typeof valA === "number" && typeof valB === "number") {
          comparison = valA - valB;
        }

        // Apply ascending/descending order
        return sortOrder === "desc" ? comparison * -1 : comparison;
      });
    }
    // Update the state variable used for rendering
    setDisplayedTickets(sortedTickets);
  }, [rawTickets, sortBy, sortOrder]); // Dependencies: run when these change

  if (error) {
    return <ErrorPage />;
  }

  // Helper function to toggle sort order or set new sort field
  const handleSort = (field: SortableField) => {
    if (sortBy === field) {
      // If already sorting by this field, toggle order
      setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    } else {
      // If sorting by a new field, set it and default to ascending
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  return (
    <>
      {!loginCheck ? (
        <div className="login-notice">
          <h1>Login to create & view tickets</h1>
        </div>
      ) : (
        <div className="board">
          {/* --- SORT CONTROLS --- */}
          <div
            style={{
              marginBottom: "10px",
              padding: "10px",
              border: "1px solid #ccc",
            }}
          >
            <span>Sort by: </span>
            <button onClick={() => handleSort("name")}>
              Name {sortBy === "name" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
            </button>
            <button onClick={() => handleSort("createdAt")}>
              Date Created{" "}
              {sortBy === "createdAt" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
            </button>
            {sortBy && (
              <button
                onClick={() => setSortBy(null)}
                style={{ marginLeft: "10px" }}
              >
                Clear Sort
              </button>
            )}
          </div>
          {/* --- END SORT CONTROLS --- */}

          <button type="button" id="create-ticket-link">
            <Link to="/create">New Ticket</Link>
          </button>
          <div className="board-display">
            {boardStates.map((status) => {
              // Filter based on the DISPLAYED (potentially sorted) tickets
              const filteredTickets = displayedTickets.filter(
                (ticket) => ticket.status === status
              );
              return (
                <Swimlane
                  title={status}
                  key={status}
                  tickets={filteredTickets}
                  deleteTicket={deleteIndvTicket}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Board;
