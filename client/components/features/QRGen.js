import React, {useEffect, useState} from "react";
import QRCode from 'qrcode';
import Button from "/components/features/Button";
import classes from "./QRGen.module.css";

function QRGen(props) {

  const RETURN_BUTTON = {
    name: "Return",
    link: "/events/upcoming",
    action: null,
  };

  let QRString = props.param.qr;  
  //QRString = "test"
  const [src, setSrc] = useState("");

  useEffect(() => {
    if (QRString != null) {
      console.log(QRString);
    QRCode.toDataURL(QRString).then(data => {
      setSrc(data);
    })
  }
  }, []);

  return (
    <div className={classes.container}>
      <img width = "100%" src={src}/>
      <div className={classes.button}>
      <Button param={RETURN_BUTTON}></Button>
      </div>
    </div>
  );
}

export default QRGen;