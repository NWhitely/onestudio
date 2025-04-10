import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react'; // FullCalendar library
import timeGridPlugin from '@fullcalendar/timegrid'; // Time Grid View
import interactionPlugin from '@fullcalendar/interaction'; // Enables drag/drop/select

const CalendarSetup = () => {
  const [availability, setAvailability] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const response = await axios.get('/api/instructor-availability', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setAvailability(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching availability:', error);
        setLoading(false);
      }
    };

    fetchAvailability();
  }, []);

  const handleDateSelect = async (selectInfo) => {
    const { startStr, endStr } = selectInfo;

    try {
      const newAvailability = {
        dayOfWeek: new Date(startStr).getDay(),
        startTime: startStr.split('T')[1].substring(0, 5),
        endTime: endStr.split('T')[1].substring(0, 5),
      };

      const response = await axios.post('/api/instructor-availability', newAvailability, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      setAvailability((prev) => [...prev, response.data]);
    } catch (error) {
      console.error('Error saving availability:', error);
    }
  };

  const handleEventClick = async (clickInfo) => {
    if (window.confirm(`Do you want to delete this availability?`)) {
      try {
        await axios.delete(`/api/instructor-availability/${clickInfo.event.id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });

        setAvailability((prev) => prev.filter((event) => event.id !== clickInfo.event.id));
      } catch (error) {
        console.error('Error deleting availability:', error);
      }
    }
  };

  return (
    <div>
      <h1>Calendar Setup</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <FullCalendar
          plugins={[timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          editable={true}
          selectable={true}
          events={availability.map((item) => ({
            id: item.id,
            title: 'Available',
            start: item.startTime,
            end: item.endTime,
          }))}
          select={handleDateSelect}
          eventClick={handleEventClick}
        />
      )}
    </div>
  );
};

export default CalendarSetup;
