import {
  createContext,
  useContext,
  useRef,
  useState,
  type ReactElement,
  type Ref,
} from 'react';

type PageKey = 'catalog' | 'guides';
type AccentTone = 'indigo' | 'teal';

interface SearchInputProps {
  label: string;
  placeholder: string;
  ref?: Ref<HTMLInputElement>;
}

const AccentContext = createContext<AccentTone>('indigo');

function useAccentTone(): AccentTone {
  return useContext(AccentContext);
}

function SearchInput({ label, placeholder, ref }: SearchInputProps): ReactElement {
  const accentTone = useAccentTone();

  return (
    <label className={`search-field search-field--${accentTone}`}>
      <span className="search-field__label">{label}</span>
      <input
        ref={ref}
        className="search-field__input"
        type="search"
        aria-label={label}
        placeholder={placeholder}
      />
    </label>
  );
}

function CatalogPage(): ReactElement {
  const accentTone = useAccentTone();

  return (
    <>
      <title>React 19 migration | Catalog</title>
      <meta name="description" content="Catalog migration preview with ref-as-prop and contextual styling." />

      <article className={`page-card page-card--${accentTone}`}>
        <p className="page-card__eyebrow">Catalog</p>
        <h2>Catalog migration board</h2>
        <p className="page-card__text">
          Replace the old component contracts without breaking the command palette input focus flow.
        </p>
        <ul className="page-card__list">
          <li>Remove legacy wrapper components around form controls.</li>
          <li>Keep the focus shortcut working from the shell toolbar.</li>
          <li>Prepare metadata so each page can describe itself.</li>
        </ul>
      </article>
    </>
  );
}

function GuidesPage(): ReactElement {
  const accentTone = useAccentTone();

  return (
    <>
      <title>React 19 migration | Guides</title>
      <meta name="description" content="Guides page for replacing legacy provider and ref wrapper usage." />

      <article className={`page-card page-card--${accentTone}`}>
        <p className="page-card__eyebrow">Guides</p>
        <h2>Guides upgrade checklist</h2>
        <p className="page-card__text">
          Document the migration path for ref-as-prop, provider shorthand, and page-level metadata.
        </p>
        <ul className="page-card__list">
          <li>Refactor reusable inputs to accept ref directly.</li>
          <li>Move away from explicit Provider wrappers.</li>
          <li>Make every screen own its title and description.</li>
        </ul>
      </article>
    </>
  );
}

export function App(): ReactElement {
  const [page, setPage] = useState<PageKey>('catalog');
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const accentTone: AccentTone = page === 'catalog' ? 'indigo' : 'teal';

  const focusSearch = (): void => {
    searchInputRef.current?.focus();
  };

  return (
    <main className="app-shell">
      <section className="workspace">
        <p className="workspace__eyebrow">Topic 29.1</p>
        <h1>React 19 migration workspace</h1>
        <p className="workspace__description">
          Move this screen from legacy APIs to the React 19 way: ref as prop, provider shorthand,
          and page metadata declared next to the page content.
        </p>

        <AccentContext value={accentTone}>
          <div className="toolbar">
            <div className="toolbar__nav" aria-label="Page switcher">
              <button type="button" aria-pressed={page === 'catalog'} onClick={() => setPage('catalog')}>
                Catalog page
              </button>
              <button type="button" aria-pressed={page === 'guides'} onClick={() => setPage('guides')}>
                Guides page
              </button>
            </div>

            <button type="button" className="toolbar__focus" onClick={focusSearch}>
              Focus search
            </button>
          </div>

          <SearchInput
            ref={searchInputRef}
            label="Command search"
            placeholder={page === 'catalog' ? 'Search migration tasks' : 'Search guide sections'}
          />

          {page === 'catalog' ? <CatalogPage /> : <GuidesPage />}
        </AccentContext>
      </section>
    </main>
  );
}
