import React from "react";
import { Props } from "../types/type";
type Todos = {
  todos: Props[];
  deleteMessage: (id: number) => void;
};

const Message: React.FC<Todos> = ({ todos, deleteMessage }) => {
  return (
    <div>
      {todos.map((todo, index) => (
        <div key={index}>
          {todo.message} -{" "}
          <span
            onClick={() => deleteMessage(todo.id)}
            style={{
              border: "1px solid black",
              background: "red",
              width: "100px",
            }}
          >
            X
          </span>
        </div>
      ))}
    </div>
  );
};

export default Message;
