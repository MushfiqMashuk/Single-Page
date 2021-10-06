import { Link } from "react-router-dom";
import classes from "../styles/Account.module.css";

export default function Account() {
  return (
    <div className={classes.account}>
      <Link to="/users">Users</Link>
    </div>
  );
}
