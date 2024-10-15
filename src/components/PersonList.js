import React, { useState, useEffect } from "react";
import axios from "axios";


// using "axios" to fetch data.

const PersonList = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    // Fetch data from the API when the component mounts
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        setPersons(res.data); // Set the state with the fetched data
      })
      .catch((error) => {
        console.error("Error fetching the data: ", error);
      });
  }, []); // Empty dependency array to run only on mount

  return (
    <ul>
      {persons.map((person) => (
        <li key={person.id}>{person.name}</li>
      ))}
    </ul>
  );
};

export default PersonList;
