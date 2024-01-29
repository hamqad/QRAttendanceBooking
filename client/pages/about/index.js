// domain/about/
// An about page

import Button from "../../components/features/Button";

function About() {
  const DUMMY_BUTTON = {
    name: "⠀Terms & Conditions⠀",
    link: "",
    action: null,
  };

  const DUMMY_BUTTON2 = {
    name: "⠀⠀⠀Privacy Policy⠀⠀⠀",
    link: "",
    action: null,
  };
  const DUMMY_BUTTON3 = {
    name: "Open Source Licenses",
    link: "",
    action: null,
  };
  return (
    <div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <center>
      <Button param={DUMMY_BUTTON}></Button>
      <br></br>
      <br></br>
      <Button param={DUMMY_BUTTON2}></Button>
      <br></br>
      <br></br>
      <Button param={DUMMY_BUTTON3}></Button>
      <br></br> 
      <br></br>
      <br></br>
      <br></br>
      <center>App Version: 0.0.1</center>
      <br></br>
        <b>© 2022 University of Nottingham</b>
      </center>
    </div>
  );
}

export default About;
