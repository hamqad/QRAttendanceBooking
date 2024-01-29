// domain/events/upcoming
// See upcoming Events for user

import EventItem from "../../components/features/EventItem";
import EventList from "../../components/layout/EventList";

import DatabaseManager from "../../components/features/DatabaseManager";

function UpcomingEvents() {
  // Given returned result, create EventItems and store in events
  let setupEvents = (data) => {
    var items = [];
    data.forEach((event, i) => {
      let item = <EventItem key={i} param={event} />;
      items.push(item);
    });
    // Sort items
    items.sort((a, b) => {
      let dA = a.props.param.event_date.substring(0, 10);
      let dB = b.props.param.event_date.substring(0, 10);
      return dA.localeCompare(dB);
    })
    return items;
  };

  

  return (
    <div>
      <h1>Upcoming Events</h1>
      <EventList>
        <DatabaseManager req="upcoming" slug="oid" then={setupEvents}/>
      </EventList>
    </div>
  );
}

export default UpcomingEvents;
