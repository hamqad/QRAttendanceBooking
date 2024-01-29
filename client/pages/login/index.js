// domain/login/
// Login page for website

import {
    AuthenticatedTemplate,
    UnauthenticatedTemplate,
    useMsal,
} from '@azure/msal-react';
import Head from 'next/head';
import styles from '/styles/Home.module.css';
import Button from "../../components/features/Button";

function SignInButton() {
  const { instance } = useMsal();
  const SIGNIN_BUTTON = {
    name: "SIGN IN",
    link: null,
    action: () => instance.loginRedirect(),
  };
  return <Button param={SIGNIN_BUTTON}></Button>;
}

function SignOutButton() {
  const { instance } = useMsal();
  const SIGNOUT_BUTTON = {
    name: "SIGN OUT",
    link: "/login",
    action: () => instance.logoutRedirect(),
  };
  return <Button param={SIGNOUT_BUTTON}></Button>;
}
function LoginPageIntroText(){
  return <div><p className={styles.textLoginWelcome}> Sign in to use the application</p></div>
}
function LoginPageText() {
  const { accounts } = useMsal();
  const username = accounts[0].username;
   return <div><p className={styles.textLoginWelcome}>You are currently signed in to  <strong>{username} </strong><br></br>
   Not you? Sign out below</p></div>
}

function UonLogo(){
  return (
          <div style={{display: "flex", justifyContent: "center",}}>
              <a  href="/">
              <img src="/uonlogo.png"></img>
              </a>
          </div>
          )
  ;
}

function Home() {
  return (
    <div className={styles.containerLogin}>
      <Head>
        <title>Sign In - University of Nottingham</title>
      </Head>
      <UonLogo />
        <br></br>
        <br></br>
      <AuthenticatedTemplate>
        <LoginPageText />
        <SignOutButton />
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <LoginPageIntroText/>
        <SignInButton />
      </UnauthenticatedTemplate>
    </div>
  );
}

export default Home;