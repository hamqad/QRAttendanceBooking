// domain/events/
// Links to possible pages - past, upcoming, confirmed


import HomepageButtons from "../../components/layout/HomepageButtons";
import Button from "../../components/features/Button"

function Events() {
  //Button for each Events Page
  const UPCOMING_EVENTS_BUTTON = {
    name: "Upcoming Events",
    link: "/events/upcoming",
    action: null,
  };
  const CONFIRMED_EVENTS_BUTTON = {
    name: "Confirmed Events",
    link: "/events/confirmed",
    action: null,
  };
  const PAST_EVENTS_BUTTON = {
    name: "Past Events",
    link: "/events/past",
    action: null,
  };

  return (
    <>
      <h1>Events</h1>
      <a>Follow one of the below:</a>
      <HomepageButtons>
        <Button param={UPCOMING_EVENTS_BUTTON}></Button>
        <Button param={CONFIRMED_EVENTS_BUTTON}></Button>
        <Button param={PAST_EVENTS_BUTTON}></Button>
      </HomepageButtons>
    </>
  );
}

export default Events;
