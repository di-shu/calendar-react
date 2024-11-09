import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useDispatch, useSelector } from "react-redux";
import CustomEvent from "./custom-event/CustomEvent";
import EditForm from "./edit-form/EditForm";
import { Tooltip } from "react-tooltip";
import CreateModal from "./create-modal/CreateModal";
import { useEffect, useState } from "react";
import "../../assets/styles/calendar-overrides.css";

export default function Calendar() {
  const events = useSelector((state) => state.events.events);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [modalInitialDateRange, setModalInitialDateRange] = useState({
    start: null,
    end: null,
  });

  const handleDateClick = (arg) => {
    // set initial start and end range
    setModalInitialDateRange({
      start: arg.date,
      end: new Date(new Date(arg.date).getTime() + 60 * 60 * 1000),
    });
    setIsCreateModalVisible(true);
  };

  useEffect(() => {
    // There is no another way to add custom slots to the calendar header
    const headerToolbar = document.querySelector(".fc-header-toolbar");
    if (headerToolbar) {
      const divEl = document.createElement("div");
      divEl.innerText = "Calendar View";
      divEl.className = "fc-toolbar-chunk";
      headerToolbar.appendChild(divEl);
    }
  }, []);

  return (
    <div id="full-calendar-wrapper" className="full-calendar-wrapper">
      <FullCalendar
        timeZone="UTC"
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        buttonText={{
          prev: "Back",
          next: "Next",
          today: "Today",
          dayGridMonth: "Month",
          timeGridWeek: "Week",
          timeGridDay: "Day",
        }}
        events={events}
        headerToolbar={{
          left: "today,prev,next",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        dateClick={handleDateClick}
        slotLabelFormat={{
          hour: "numeric",
          minute: "2-digit",
        }}
        eventDidMount={(event) => {
          // This needed since an event does't apply color when creating on the MonthView
          if (event.backgroundColor) {
            const el = event.el;
            el.style.setProperty("background-color", event.backgroundColor);
            el.style.setProperty("border-color", event.backgroundColor);
          }
        }}
        eventContent={({ event }) => {
          return (
            <CustomEvent
              eventArgs={event}
              setIsEditModalOpen={setIsEditModalOpen}
              setEditData={setEditData}
              isModalOpened={isEditModalOpen}
              editEventId={editData?.extendedProps.id}
            />
          );
        }}
        slotDuration="02:00:00"
        selectMirror={false}
        nowIndicator
        editable
        selectable
        expandRows
      />
      {editData && (
        <Tooltip
          isOpen={isEditModalOpen}
          id={editData.extendedProps.id}
          content={
            isEditModalOpen && (
              <EditForm
                eventData={editData}
                setIsEditModalOpen={setIsEditModalOpen}
                setEditData={setEditData}
              />
            )
          }
          place="bottom"
          className="edit-tooltip"
          globalCloseEvents={{ escape: true }}
          clickable
          openEvents={["click"]}
          positionStrategy="fixed"
        />
      )}
      {isCreateModalVisible && (
        <CreateModal
          handleCancel={() => setIsCreateModalVisible(false)}
          initialDateRange={modalInitialDateRange}
        />
      )}
    </div>
  );
}
