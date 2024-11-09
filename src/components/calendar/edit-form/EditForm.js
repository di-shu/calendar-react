import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteEvent, updateEvent } from "../../../store/eventsSlice";
import { HexColorPicker } from "react-colorful";
import DatePicker from "react-datepicker";
import closeIcon from "../../../assets/icons/icon-cancel.svg";
import styles from "./edit-form.module.css";
import "./edit-form-common.css";

export default function EditForm({
  eventData,
  setIsEditModalOpen,
  setEditData,
}) {
  const maxChars = 30;

  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [color, setColor] = useState("#3b86ff");

  const handleTitleInput = (value) => {
    if (value.length <= maxChars) {
      setTitle(value);
    } else {
      setTitle(value.substring(0, maxChars));
    }
  };

  const handleDeleteEvent = () => {
    dispatch(deleteEvent(eventData.extendedProps.id));
  };

  const handleEditEvent = () => {
    console.log(startDate);
    const eventPayload = {
      title,
      description,
      backgroundColor: color,
      borderColor: color,
      extendedProps: {
        id: eventData.extendedProps.id,
      },
      start: startDate,
      end: endDate,
    };
    dispatch(updateEvent(eventPayload));
    setIsEditModalOpen(false);
  };

  const setEditDataState = () => {
    setTitle(eventData.title);
    setDescription(eventData.extendedProps.description);
    setStartDate(eventData._instance.range.start);
    setEndDate(eventData._instance.range.end);
    if (eventData.backgroundColor) {
      setColor(eventData.backgroundColor);
    }
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setEditData(null);
  };

  useEffect(() => {
    setEditDataState();
  }, [eventData]);

  return (
    <div className={styles["edit-event-wrap"] + " edit-event-wrap"}>
      <img
        src={closeIcon}
        alt="close"
        className={styles["edit-event__close-icon"]}
        onClick={handleCloseModal}
      />
      <input
        value={title}
        className="tooltip-content"
        placeholder="Title"
        onInput={(e) => handleTitleInput(e.target.value)}
      />
      <div className="datepicker">
        <span className="datepicker-label">Start Date:</span>
        <DatePicker
          selected={startDate}
          onChange={(date) => {
            console.log(date);
            setStartDate(date);
          }}
          timeInputLabel="Time:"
          dateFormat="MM/dd/yyyy h:mm"
          showTimeInput
        />
      </div>
      <div className="datepicker">
        <span className="datepicker-label">End Date:</span>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          timeInputLabel="Time:"
          dateFormat="MM/dd/yyyy h:mm"
          showTimeInput
        />
      </div>
      <input
        value={description}
        onInput={(e) => setDescription(e.target.value)}
        type="text"
        placeholder="Description"
      />
      <HexColorPicker color={color} onChange={setColor} />
      <div className={styles["edit-buttons"]}>
        <button className="discard-button" onClick={handleDeleteEvent}>
          Discard
        </button>
        <button className="edit-button" onClick={handleEditEvent}>
          Edit
        </button>
      </div>
    </div>
  );
}
