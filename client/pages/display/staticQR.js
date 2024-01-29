// domain/display/staticQR
// Displays a static attendance-recording QR code.
import React from "react";
import ReactDOM from "react-dom";
import QRCode from "react-qr-code";

function StaticQR() {
    return (
        <div style={{justifyContent:'center', alignItems:'center'}}>
            <h1>Register Your Attendance</h1>
            <QRCode
                value="bG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQ="
                level="L"
                title="Scan to Register Attendance"
                style={{ alignSelf: 'center' }}
                size={512}
            />
        </div>
    );
}

export default StaticQR;