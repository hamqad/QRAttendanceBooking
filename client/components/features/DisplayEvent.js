import DatabaseManager from "./DatabaseManager";
import { useMsal } from "@azure/msal-react";
import { useRouter } from 'next/router';

    
export default function PathCheck(props) {

    const DisplayQR = {
        name: "Display QR",
        link: "/events/display",
        action: <DatabaseManager req="generateQR" inputs={ins} then={generate}/>,
    };

    const router = useRouter();
    const { eventID } = router.query;

    var { accounts } = useMsal();
    var oid = null;
    var login = false;

    if (accounts[0]) {
      oid = accounts[0].idTokenClaims.oid;
      login = true;
    }

    let ins = {
        event_id : eventID,
        oid : oid
    }

    let generate = (res) => {
        var items;
        let item = <EventData param={res} />;
        return items;
    };

    return (
        <div className={classes.button}>
          <Button param={DisplayQR}></Button>
        </div>
    );
}