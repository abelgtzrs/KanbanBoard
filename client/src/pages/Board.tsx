// Add these imports at the top
import { DragDropContext, DropResult } from "react-beautiful-dnd";

// ... (other imports remain the same)
import { useEffect, useState, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import { retrieveTickets, deleteTicket } from "../api/ticketAPI";
import ErrorPage from "./ErrorPage";
import Swimlane from "../components/Swimlane";
import { TicketData } from "../interfaces/TicketData";
import { ApiMessage } from "../interfaces/ApiMessage";
import auth from "../utils/auth";

const boardStates = ["Todo", "In Progress", "Done"];
type SortableField = "name" | "createdAt" | "updatedAt" | "status";

const Board = () => {
  const [rawTickets, setRawTickets] = useState<TicketData[]>([]);
  const [displayedTickets, setDisplayedTickets] = useState<TicketData[]>([]);
  const [sortBy, setSortBy] = useState<SortableField | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [error, setError] = useState(false);
  const [loginCheck, setLoginCheck] = useState(false);

  // ... (checkLogin, fetchTickets, deleteIndvTicket functions remain the same) ...
  const checkLogin = () => {
    if (auth.loggedIn()) {
      setLoginCheck(true);
    }
  };

  const fetchTickets = async () => {
    try {
      const data = await retrieveTickets();
      setRawTickets(data);
    } catch (err) {
      console.error("Failed to retrieve tickets:", err);
      setError(true);
    }
  };

  const deleteIndvTicket = async (ticketId: number): Promise<ApiMessage> => {
    try {
      const data = await deleteTicket(ticketId);
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

  useEffect(() => {
    let sortedTickets = [...rawTickets];
    if (sortBy) {
      sortedTickets.sort((a, b) => {
        const valA = a[sortBy as keyof TicketData];
        const valB = b[sortBy as keyof TicketData];
        let comparison = 0;
        if (sortBy === "createdAt" || sortBy === "updatedAt") {
          comparison =
            new Date(valA as string).getTime() -
            new Date(valB as string).getTime();
        } else if (typeof valA === "string" && typeof valB === "string") {
          comparison = valA.localeCompare(valB);
        } else if (typeof valA === "number" && typeof valB === "number") {
          comparison = valA - valB;
        }
        return sortOrder === "desc" ? comparison * -1 : comparison;
      });
    }
    setDisplayedTickets(sortedTickets);
  }, [rawTickets, sortBy, sortOrder]);

  if (error) {
    return <ErrorPage />;
  }

  const handleSort = (field: SortableField) => {
    if (sortBy === field) {
      setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  // --- Define the onDragEnd handler ---
  const handleOnDragEnd = (result: DropResult) => {
    // Log the result to see what information it provides
    console.log("Drag ended:", result);

    // Basic checks:
    // - If dropped outside any droppable context
    // - If dropped back into the same position it started
    if (
      !result.destination ||
      (result.destination.droppableId === result.source.droppableId &&
        result.destination.index === result.source.index)
    ) {
      return; // Do nothing
    }

    // ** TODO: Add logic here later to:**
    // 1. Identify the dragged ticket.
    // 2. Identify the source and destination columns (droppableId).
    // 3. Update the ticket's status in the client state (rawTickets/displayedTickets).
    // 4. Make an API call to update the ticket status on the server.
  };

  return (
    <>
      {!loginCheck ? (
        <div className="login-notice">
          <h1>Login to create & view tickets</h1>
        </div>
      ) : (
        <div className="board">
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
            <button onClick={() => handleSort("status")}>
              Status{" "}
              {sortBy === "status" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
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

          <button type="button" id="create-ticket-link">
            <Link to="/create">New Ticket</Link>
          </button>

          <DragDropContext onDragEnd={handleOnDragEnd}>
            <div className="board-display">
              {boardStates.map((status) => {
                const filteredTickets = displayedTickets.filter(
                  (ticket) => ticket.status === status
                );
                return (
                  <Swimlane
                    title={status}
                    status={status}
                    key={status}
                    tickets={filteredTickets}
                    deleteTicket={deleteIndvTicket}
                  />
                );
              })}
            </div>
          </DragDropContext>
        </div>
      )}
    </>
  );
};

export default Board;
