// domain/display/id
// Displays dynamic QR code for event attendance
import QRGen from '../../components/features/QRGen';
import DatabaseManager from "../../components/features/DatabaseManager";
import { useRouter } from "next/router";


function QRLoad(props) {
  console.log(props);
  const router = useRouter();
  const { eventID } = router.query;
  console.log(eventID);

  if (eventID !== undefined) {
    console.log("inside");
    // If router correctly gets the event id then search for event
    console.log(eventID);
    let setupQR = (data) => {
      let display = <></>;
      console.log(data);
      if (data) {
        // Event found, use data[0]
        display = <div><QRGen param={data} /></div>;
      } else {
        // No Event found, tell user
        display = <div><a>ERROR: NO QR FOUND</a></div>;
      }
      
      return display;
    };

    return (
      <div>
        <DatabaseManager req="qrcode" type="POST" slug={eventID} then={setupQR} />
      </div>
    );
  } else {
    // Wait for router to correctly pull
    return <a>LOADING</a>;
  }
}

export default QRLoad;