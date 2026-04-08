import type { ReactElement, RefObject } from 'react';

interface SearchInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  inputRef?: RefObject<HTMLInputElement | null>;
}

export function SearchInput({
  label,
  placeholder,
  value,
  onChange,
}: SearchInputProps): ReactElement {
  return (
    <label className="search-field">
      <span>{label}</span>
      <input
        aria-label={label}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}
