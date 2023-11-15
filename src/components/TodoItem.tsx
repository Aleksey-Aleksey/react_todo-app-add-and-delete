import React, { useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo;
  handleDeleteTodo: (value: number) => void;
};

export const TodoItem: React.FC<Props> = ({ todo, handleDeleteTodo }) => {
  const { id, completed, title } = todo;
  const [isCompleted, setIsCompleted] = useState(completed);

  const inputChangeHandler = () => {
    setIsCompleted((complete) => !complete);
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', {
        completed: isCompleted,
      })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
          onChange={inputChangeHandler}
        />
      </label>

      <span data-cy="TodoTitle" className="todo__title">
        {title}
      </span>

      {/* Remove button appears only on hover */}
      <button
        type="button"
        className="todo__remove"
        data-cy="TodoDelete"
        onClick={() => handleDeleteTodo(id)}
      >
        ×
      </button>

      {/* overlay will cover the todo while it is being updated */}
      <div
        data-cy="TodoLoader"
        className={classNames('modal overlay', {
          'is-active': id === 0,
        })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};