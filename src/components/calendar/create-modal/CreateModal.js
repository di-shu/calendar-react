import { useMemo, useState } from "react";
import { HexColorPicker } from "react-colorful";
import DatePicker from "react-datepicker";
import { useDispatch } from "react-redux";
import { addEvent } from "../../../store/eventsSlice";
import styles from "./create-modal.module.css";
import "./create-modal-common.css";

export default function CreateModal({ initialDateRange, handleCancel }) {
  const maxChars = 30;

  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(initialDateRange.start);
  const [endDate, setEndDate] = useState(initialDateRange.end);
  const [color, setColor] = useState("#3b86ff");
  const isCreateButtonDisabled = useMemo(() => {
    return title.trim() === "" || !startDate;
  }, [title, startDate]);

  const handleTitleInput = (value) => {
    if (value.length <= maxChars) {
      setTitle(value);
    } else {
      setTitle(value.substring(0, maxChars));
    }
  };

  const handleCreate = () => {
    const payload = {
      extendedProps: { id: crypto.randomUUID() },
      title,
      description,
      start: startDate,
      end: endDate,
      backgroundColor: color,
      borderColor: color,
    };
    dispatch(addEvent(payload));
    handleCancel();
  };

  return (
    <div className={styles["modal-background"]}>
      <div className={styles["event-modal"] + " create-modal"}>
        <div className={styles["event-modal-body"]}>
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
              onChange={(date) => setStartDate(date)}
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
        </div>
        <div className="event-modal-buttons">
          <button className="discard-button" onClick={handleCancel}>
            Cancel
          </button>
          <button
            className="edit-button"
            disabled={isCreateButtonDisabled}
            onClick={handleCreate}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
