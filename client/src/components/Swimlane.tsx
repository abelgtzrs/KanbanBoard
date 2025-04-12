import { Droppable } from "react-beautiful-dnd";

import TicketCard from "./TicketCard";
import { TicketData } from "../interfaces/TicketData";
import { ApiMessage } from "../interfaces/ApiMessage";

interface SwimlaneProps {
  title: string;
  status: string; // Add status prop to use as droppableId
  tickets: TicketData[];
  deleteTicket: (ticketId: number) => Promise<ApiMessage>;
}

const Swimlane = ({ title, status, tickets, deleteTicket }: SwimlaneProps) => {
  // getStatusClass function remains the same
  const getStatusClass = (statusTitle: string) => {
    // Renamed param to avoid conflict
    switch (statusTitle) {
      case "Todo":
        return "todo"; // Removed 'swim-lane' prefix, applying it once below
      case "In Progress":
        return "inprogress";
      case "Done":
        return "done";
      default:
        return "";
    }
  };

  return (
    // Use the Droppable component, passing the status as the unique ID
    <Droppable droppableId={status}>
      {(
        provided,
        snapshot // Droppable uses render props pattern
      ) => (
        <div
          // Apply props from 'provided' to the DOM element
          {...provided.droppableProps}
          ref={provided.innerRef}
          // Combine base class with status-specific class and dragging state class
          className={`swimlane ${getStatusClass(title)} ${
            snapshot.isDraggingOver ? "dragging-over" : ""
          }`}
        >
          <h2>{title}</h2>
          {/* Map tickets inside the droppable area */}
          {tickets.map(
            (
              ticket,
              index // Add index for Draggable key later
            ) => (
              <TicketCard
                key={ticket.id} // Use ticket.id as key
                ticket={ticket}
                index={index} // Pass index down for Draggable
                deleteTicket={deleteTicket}
              />
            )
          )}
          {/* Placeholder takes up space during drag */}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default Swimlane;
