import React, { useState, useEffect } from "react";
import api from "./services/api";
import RepositoryItem from "./components/RepositoryItem";
import Checkbox from "./components/Checkbox";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [techs, setTechs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const technologies = ["ReactJS", "NodeJS", "React Native", "JavaScript"];

  async function handleAddRepository() {
    if (!title || !url || techs.length === 0) return;
    const repo = { title, url, techs };
    api.post("repositories", repo).then(({ data }) => {
      const newRepositories = [...repositories, data];
      setRepositories(newRepositories);
    });
    setTitle("");
    setUrl("");
    setTechs([]);
    setShowModal(false);
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`).then(({ status }) => {
      if (status === 204) {
        const newRepositories = repositories.filter((repo) => repo.id !== id);
        setRepositories(newRepositories);
      }
    });
  }

  useEffect(() => {
    api.get("/repositories").then(({ data }) => {
      setRepositories(data);
    });
  }, []);

  function handleMarkTech(tech) {
    const techIndex = techs.findIndex((item) => item === tech);
    let newTechs = techs;
    if (techIndex < 0) {
      newTechs.push(tech);
    } else {
      newTechs.splice(techIndex, 1);
    }
    setTechs(newTechs);
  }

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
      {showModal && (
        <div className="formModal">
          <form>
            <input
              type="text"
              placeholder="Insira o título do repositório"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
            <input
              type="text"
              placeholder="Insira a url do repositório"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
            />
            <div className="checkboxes">
              {technologies.map((tech) => {
                return (
                  <Checkbox
                    key={tech}
                    title={tech}
                    onClick={() => handleMarkTech(tech)}
                  />
                );
              })}
            </div>
            <input
              className="btn"
              type="button"
              onClick={handleAddRepository}
              value="Adicionar"
            />
            <input
              className="btnCancel"
              type="button"
              onClick={() => setShowModal(false)}
              value="Cancelar"
            />
          </form>
        </div>
      )}

      <button onClick={() => setShowModal(true)}>Adicionar</button>
    </div>
  );
}

export default App;
