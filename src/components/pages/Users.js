import classes from "../../styles/Users.module.css";
import useGetUsers from "../hooks/useGetUsers";

export default function Users() {
  const { loading, error, users } = useGetUsers();

  return (
    <>
      {loading && <h3>Loading...</h3>}
      {error && <h3>There is an error!</h3>}
      {users && (
        <div>
          <table className={classes.users}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Designation</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, key) => {
                return (
                  <tr key={key}>
                    <td>{user[1].username}</td>
                    <td>{user[1].email}</td>
                    <td>{user[1].designation}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
