import { Link } from "react-router-dom";
import classes from "../styles/Nav.module.css";
import Account from "./Account";

export default function Nav() {
  return (
    <nav className={classes.nav}>
      <ul>
        <li>
          <Link to="/" className={classes.brand}>
            <h3>Universe is Beautiful</h3>
          </Link>
        </li>
      </ul>
      <Account />
    </nav>
  );
}
