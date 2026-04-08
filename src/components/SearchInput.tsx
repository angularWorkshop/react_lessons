import { forwardRef, type ReactElement } from 'react';

interface SearchInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ label, placeholder, value, onChange }, ref): ReactElement => {
    return (
      <label className="search-field">
        <span>{label}</span>
        <input
          ref={ref}
          aria-label={label}
          placeholder={placeholder}
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      </label>
    );
  },
);
