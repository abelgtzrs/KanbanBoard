import { Draggable } from "react-beautiful-dnd";

import { Link } from "react-router-dom";
import { TicketData } from "../interfaces/TicketData";
import { ApiMessage } from "../interfaces/ApiMessage";
import { MouseEventHandler } from "react";

interface TicketCardProps {
  ticket: TicketData;
  index: number; // Add index prop, required by Draggable
  deleteTicket: (ticketId: number) => Promise<ApiMessage>;
}

// Pass index down from props
const TicketCard = ({ ticket, index, deleteTicket }: TicketCardProps) => {
  const handleDelete: MouseEventHandler<HTMLButtonElement> = async (event) => {
    const ticketId = Number(event.currentTarget.value);
    if (!isNaN(ticketId)) {
      try {
        const data = await deleteTicket(ticketId);
        return data;
      } catch (error) {
        console.error("Failed to delete ticket:", error);
      }
    }
  };

  return (
    // Wrap with Draggable
    // draggableId must be a string, index is the item's position in the list
    <Draggable draggableId={String(ticket.id)} index={index}>
      {(
        provided,
        snapshot // Draggable uses render props pattern
      ) => (
        <div
          // Apply props from 'provided' to the DOM element
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps} // Makes the whole card draggable
          // Apply conditional styling based on dragging state
          className={`ticket-card ${snapshot.isDragging ? "dragging" : ""}`}
          // Optional: inline style for dragging state
          // style={{
          //   backgroundColor: snapshot.isDragging ? 'lightgreen' : 'white',
          //   ...provided.draggableProps.style // Important: preserve default styles
          // }}
        >
          <h3>{ticket.name}</h3>
          <p>{ticket.description}</p>
          <p>{ticket.assignedUser?.username}</p>
          <Link
            to="/edit"
            state={{ id: ticket.id }}
            type="button"
            className="editBtn"
          >
            Edit
          </Link>
          <button
            type="button"
            value={String(ticket.id)}
            onClick={handleDelete}
            className="deleteBtn"
          >
            Delete
          </button>
        </div>
      )}
    </Draggable>
  );
};

export default TicketCard;
