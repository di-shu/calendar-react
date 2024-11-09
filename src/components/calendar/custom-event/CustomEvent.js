import { Tooltip } from "react-tooltip";
import styles from "./custom-event.module.css";
import { useMemo } from "react";

export default function CustomEvent({
  eventArgs,
  setIsEditModalOpen,
  setEditData,
  isModalOpened = false,
  editEventId,
}) {
  const openEditModal = () => {
    setEditData(eventArgs);
    setIsEditModalOpen(true);
  };
  const isEditing = useMemo(() => {
    return isModalOpened && eventArgs.extendedProps.id === editEventId
      ? " editing-active"
      : "";
  }, [eventArgs, isModalOpened, editEventId]);
  return (
    <>
      <div
        className={`${styles["event-text"]} ${isEditing}`}
        onClick={() => openEditModal(eventArgs)}
        data-tooltip-id={eventArgs.extendedProps.id}
      >
        {eventArgs.title}
      </div>
      <Tooltip
        id={eventArgs.extendedProps.id}
        place="bottom"
        content={eventArgs.extendedProps?.description}
        delayShow="300"
      />
    </>
  );
}
