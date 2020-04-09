import React, { useState, useEffect } from "react";
import api from "./services/api";
import RepositoryItem from "./components/RepositoryItem";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  async function handleAddRepository() {
    const repo = {
      title: "repoLikeRestAPI",
      url: "https://github.com/YanOliveira/repoLikeRestAPI",
      techs: ["nodeJs", "Express"],
    };
    api.post("repositories", repo).then(({ data }) => {
      const newRepositories = [...repositories, data];
      setRepositories(newRepositories);
    });
  }

  async function handleRemoveRepository(id) {
    // TODO
  }

  useEffect(() => {
    api.get("/repositories").then(({ data }) => {
      setRepositories(data);
    });
  }, []);

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repo) => {
          return (
            <RepositoryItem
              key={repo.id}
              title={repo.title}
              handleRemoveRepository={() => handleRemoveRepository(repo.id)}
            />
          );
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
