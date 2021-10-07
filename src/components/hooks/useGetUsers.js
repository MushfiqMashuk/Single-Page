import { get, getDatabase, orderByKey, query, ref } from "firebase/database";
import { useEffect, useState } from "react";

export default function useGetAnswers() {
  // this callback function of useEffect must be a synchronous function, to avoid race condition

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchAnswers() {
      // database works
      const db = getDatabase();
      const usersRef = ref(db, `users`);
      const usersQuery = query(usersRef, orderByKey());

      // fetching data from database

      try {
        setError(false);
        setLoading(true);
        // request from firebase database
        const snapshot = await get(usersQuery);

        setLoading(false);

        if (snapshot.exists()) {
          setUsers(Object.entries(snapshot.val()));
        }
      } catch (err) {
        console.log(err);
      }
    }

    fetchAnswers();
  }, []);

  return {
    loading,
    error,
    users,
  };
}
