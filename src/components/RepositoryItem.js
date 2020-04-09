import React from "react";

export default function RepositoryItem({ title, handleRemoveRepository }) {
  return (
    <li>
      {title}
      <button onClick={handleRemoveRepository}>Remover</button>
    </li>
  );
}
