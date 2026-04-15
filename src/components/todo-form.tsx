import { useState, useRef, type FormEvent } from 'react';
import type { Priority } from '../types/todo';

interface TodoFormProps {
  onAdd: (title: string, priority: Priority) => void;
}

export function TodoForm({ onAdd }: TodoFormProps) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;

    onAdd(trimmed, priority);
    setTitle('');
    inputRef.current?.focus();
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        className="todo-form__input"
        type="text"
        placeholder="What needs to be done?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <select
        className="todo-form__select"
        value={priority}
        onChange={(e) => setPriority(e.target.value as Priority)}
      >
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
      <button
        className="todo-form__button"
        type="submit"
        disabled={!title.trim()}
      >
        Add
      </button>
    </form>
  );
}
