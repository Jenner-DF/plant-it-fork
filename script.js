document.addEventListener("DOMContentLoaded", function () {
    const calendar = document.getElementById("calendar");
    const eventCalendar = document.getElementById("fullCalendar");

    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    function createDeleteButton(dayDiv, eventText) {
        const eventContainer = document.createElement("div");
        eventContainer.classList.add("event-container");

        const eventDiv = document.createElement("div");
        eventDiv.classList.add("event");
        eventDiv.innerText = eventText;

        const deleteButton = document.createElement("button");
        deleteButton.innerText = "X";
        deleteButton.classList.add("delete-event");
        deleteButton.addEventListener("click", function () {
            dayDiv.removeChild(eventContainer);

            const dayOfWeekIndex = Array.from(dayDiv.parentNode.children).indexOf(dayDiv);
            const selectedDate = new Date();
            selectedDate.setDate(selectedDate.getDate() - selectedDate.getDay() + dayOfWeekIndex);

            const events = $('#fullCalendar').fullCalendar('clientEvents');
            for (const event of events) {
                const eventDate = new Date(event.start);
                if (eventDate.toDateString() === selectedDate.toDateString() && event.title === eventText) {
                    $('#fullCalendar').fullCalendar('removeEvents', event._id);
                    break;
                }
            }
        });

        eventContainer.appendChild(eventDiv);
        eventContainer.appendChild(deleteButton);

        return eventContainer;
    }

    function updateCalendar() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay());

        for (let i = 0; i < 7; i++) {
            const date = new Date(startOfWeek);
            date.setDate(startOfWeek.getDate() + i);

            const dayOfWeek = weekdays[i];
            const month = months[date.getMonth()];
            const dayOfMonth = date.getDate();

            const dayDiv = document.createElement("div");
            dayDiv.classList.add("day");

            if (date.toDateString() === today.toDateString()) {
                dayDiv.classList.add("current-day");
            }

            const dayOfWeekDiv = document.createElement("div");
            dayOfWeekDiv.innerText = dayOfWeek;

            const dateDiv = document.createElement("div");
            dateDiv.classList.add("date");
            dateDiv.innerText = `${month} ${dayOfMonth}`;

            dayDiv.appendChild(dayOfWeekDiv);
            dayDiv.appendChild(dateDiv);
            calendar.appendChild(dayDiv);
        }
    }

    function updateFullCalendar() {
        $('#fullCalendar').fullCalendar({
            header: {
                left: 'prev,next',
                center: 'title',
                right: 'today'
            },
            events: [
                // You can add events here if needed
            ]
        });
    }

    document.getElementById("addEvent").addEventListener("click", function () {
        const eventDate = document.getElementById("eventDate").value;
        const eventText = document.getElementById("eventText").value;

        if (eventDate && eventText) {
            const selectedDate = new Date(eventDate);
            selectedDate.setHours(0, 0, 0, 0);

            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const startOfWeek = new Date(today);
            startOfWeek.setDate(today.getDate() - today.getDay());

            const endOfWeek = new Date(today);
            endOfWeek.setDate(today.getDate() + (6 - today.getDay()));

            if (selectedDate >= startOfWeek && selectedDate <= endOfWeek) {
                const eventDayOfWeek = selectedDate.getDay();
                const dayDiv = calendar.children[eventDayOfWeek];

                if (dayDiv) {
                    const eventContainer = createDeleteButton(dayDiv, eventText);
                    dayDiv.appendChild(eventContainer);
                }

                $('#fullCalendar').fullCalendar('renderEvent', {
                    title: eventText,
                    start: eventDate,
                    color: '#25995c'
                });
            } else {
                alert("You can only add events for the current week.");
            }
        } else {
            alert("Please select a date and enter an event description.");
        }
    });

    updateCalendar();
    updateFullCalendar();

    setInterval(function () {
        while (calendar.firstChild) {
            calendar.removeChild(calendar.firstChild);
        }
        updateCalendar();
        updateFullCalendar();
    }, 7 * 24 * 60 * 60 * 1000);
});