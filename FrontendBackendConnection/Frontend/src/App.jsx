import React, { useEffect, useState } from "react";
import axios from "axios";
const App = () => {
  const [jokes, setJokes] = useState([]);
  useEffect(() => {
    axios
      .get("/api/jokes")
      .then((res) => {
        setJokes(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return (
    <div>
      <h1>Total jokes : {jokes.length}</h1>
      {jokes.map((joke) => (
        <div key={joke.id}>
          <h1>{joke.title}</h1>
          <p>{joke.joke}</p>
        </div>
      ))}
    </div>
  );
};

export default App;
