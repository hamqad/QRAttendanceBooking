// Layout applied to every Page

import TopBar from "./TopBar";
import classes from "./Layout.module.css";
import { useRouter } from 'next/router';

function Layout(props) {
  const router = useRouter();

  const showHeader = router.pathname === "/login" ? false : true;
  return (
    <div>
      {showHeader && <TopBar />}
      <main className={classes.main}>
        <div className={classes.content}>{props.children}</div>
      </main>
    </div>
  );
}

export default Layout;