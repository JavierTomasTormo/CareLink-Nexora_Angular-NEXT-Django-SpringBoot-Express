'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/styles/common/SearchAutocomplete.module.css';
import Image from 'next/image';

interface SearchItem {
    id: number;
    title: string;
    type: 'activity' | 'meal' | 'room';
    image?: string;
    description?: string;
}

interface SearchAutocompleteProps {
    onClose?: () => void;
    placeholder?: string;
    className?: string;
}

export default function SearchAutocomplete({
  onClose,
  placeholder = "Buscar actividades...",
  className = "",
}: SearchAutocompleteProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const resultsRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Cargar búsquedas recientes al iniciar
  useEffect(() => {
    try {
      const saved = localStorage.getItem('recentSearches');
      if (saved) {
        setRecentSearches(JSON.parse(saved).slice(0, 5));
      }
    } catch (e) {
      console.error('Error loading recent searches:', e);
    }
  }, []);

  const saveSearch = (text: string) => {
    if (!text.trim()) return;
    
    try {
      const searches = [...new Set([text.trim(), ...recentSearches])].slice(0, 5);
      setRecentSearches(searches);
      localStorage.setItem('recentSearches', JSON.stringify(searches));
    } catch (e) {
      console.error('Error saving search:', e);
    }
  };

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }

    const searchItems = async () => {
      setIsLoading(true);
      try {
        let formattedResults: SearchItem[] = [];
    
        try {
          const activitiesRes = await fetch(`http://localhost:8000/api/activities/?search=${query}`);
          if (activitiesRes.ok) {
            const activities = await activitiesRes.json();
            const activitiesFormatted = Array.isArray(activities) ? activities.map((a: any) => ({
              id: a.id || 0,
              title: a.name || a.title || "Actividad sin nombre",
              type: 'activity' as const,
              image: a.image || null,
              description: a.description?.substring(0, 100) || ''
            })) : [];
            formattedResults = [...formattedResults, ...activitiesFormatted];
          }
        } catch (error) {
          console.error('Error fetching activities:', error);
        }
    
        // try {
        //   const mealsRes = await fetch(`http://localhost:8000/api/meals/?search=${query}`);
        //   if (mealsRes.ok) {
        //     const meals = await mealsRes.json();
        //     const mealsFormatted = Array.isArray(meals) ? meals.map((m: any) => ({
        //       id: m.id || 0,
        //       title: m.name || m.title || "Menú sin nombre",
        //       type: 'meal' as const,
        //       image: m.image || null,
        //       description: m.description?.substring(0, 100) || ''
        //     })) : [];
        //     formattedResults = [...formattedResults, ...mealsFormatted];
        //   }
        // } catch (error) {
        //   console.error('Error fetching meals:', error);
        // }
  
        const sortedResults = formattedResults
          .filter(item => item && item.title)
          .sort((a, b) => {
            const titleA = a?.title?.toLowerCase() || "";
            const titleB = b?.title?.toLowerCase() || "";
            const queryLower = query.toLowerCase();
            
            const startsWithA = titleA.startsWith(queryLower);
            const startsWithB = titleB.startsWith(queryLower);
            
            if (startsWithA && !startsWithB) return -1;
            if (!startsWithA && startsWithB) return 1;
            
            return titleA.localeCompare(titleB);
          })
          .slice(0, 8);
    
        setResults(sortedResults);
      } catch (error) {
        console.error('Error general en la búsqueda:', error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    // Debounce para evitar demasiadas llamadas a la API
    const timer = setTimeout(() => {
      searchItems();
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSelect = (item: SearchItem) => {
    let path = '';
    switch (item.type) {
      case 'activity':
        path = `/shop/activity/${item.id}`;
        break;
      case 'meal':
        path = `/meals/meal/${item.id}`;
        break;
      case 'room':
        path = `/rooms/room/${item.id}`;
        break;
    }

    if (path) {
      saveSearch(item.title);
      router.push(path);
      setQuery('');
      setResults([]);
      if (onClose) onClose();
    }
  };
  
  const handleSearchRecent = (text: string) => {
    setQuery(text);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => 
        prev < results.length - 1 ? prev + 1 : prev
      );
      
      // Auto-scroll para mantener visible el elemento seleccionado
      if (selectedIndex >= 0 && resultsRef.current) {
        const selectedItem = resultsRef.current.children[selectedIndex + 1] as HTMLElement;
        if (selectedItem) {
          const container = resultsRef.current;
          const itemTop = selectedItem.offsetTop;
          const itemHeight = selectedItem.offsetHeight;
          const containerHeight = container.offsetHeight;
          const scrollTop = container.scrollTop;
          
          if (itemTop + itemHeight > scrollTop + containerHeight) {
            container.scrollTop = itemTop + itemHeight - containerHeight;
          }
        }
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => prev > 0 ? prev - 1 : 0);
      
      // Auto-scroll hacia arriba
      if (selectedIndex > 0 && resultsRef.current) {
        const selectedItem = resultsRef.current.children[selectedIndex - 1] as HTMLElement;
        if (selectedItem) {
          const container = resultsRef.current;
          const itemTop = selectedItem.offsetTop;
          const scrollTop = container.scrollTop;
          
          if (itemTop < scrollTop) {
            container.scrollTop = itemTop;
          }
        }
      }
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      handleSelect(results[selectedIndex]);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setQuery('');
      setResults([]);
      if (onClose) onClose();
    }
  };

  // Resalta el texto de búsqueda en los resultados
  const highlightText = (text: string) => {
    if (!query.trim()) return text;
    
    const parts = text.split(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'));
    
    return parts.map((part, index) => 
      part.toLowerCase() === query.toLowerCase() 
        ? <span key={index} className={styles.highlight}>{part}</span> 
        : part
    );
  };

  return (
    <div className={`${styles.searchAutocomplete} ${className}`}>
      <div className={styles.inputContainer}>
        {/* <i className={`fas fa-search ${styles.searchIcon}`}></i> */}
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={styles.searchInput}
          autoFocus
        />
        {query && (
          <button 
            type="button" 
            className={styles.clearButton}
            onClick={() => setQuery('')}
            aria-label="Limpiar búsqueda"
          >
            <i className="fas fa-times"></i>
          </button>
        )}
        {isLoading && <div className={styles.spinner}></div>}
      </div>

      {(results.length > 0 || (query.trim() === '' && recentSearches.length > 0)) && (
        <div ref={resultsRef} className={styles.resultsContainer}>
          {query.trim() === '' && recentSearches.length > 0 && (
            <>
              <div className={styles.resultHeader}>
                <span>Búsquedas recientes</span>
                <button 
                  className={styles.clearHistory}
                  onClick={() => {
                    setRecentSearches([]);
                    localStorage.removeItem('recentSearches');
                  }}
                >
                  Borrar
                </button>
              </div>
              {recentSearches.map((term, idx) => (
                <div 
                  key={`recent-${idx}`} 
                  className={styles.recentSearchItem}
                  onClick={() => handleSearchRecent(term)}
                >
                  <i className="fas fa-history"></i>
                  <span>{term}</span>
                </div>
              ))}
              <div className={styles.resultDivider}></div>
            </>
          )}

          {results.length > 0 ? (
            <>
              <div className={styles.resultHeader}>
                <span>Resultados</span>
                <span className={styles.resultCount}>{results.length} encontrados</span>
              </div>
              
              {results.map((item, index) => (
                <div
                  key={`${item.type}-${item.id}`}
                  className={`${styles.resultItem} ${selectedIndex === index ? styles.selected : ''}`}
                  onClick={() => handleSelect(item)}
                >
                  <div className={styles.resultImage}>
                    {item.image ? (
                      <Image 
                        src={item.image} 
                        alt={item.title} 
                        width={40} 
                        height={40} 
                        className={styles.itemImage}
                      />
                    ) : (
                      <div className={styles.imagePlaceholder}>
                        {item.type === 'activity' && <i className="fas fa-running"></i>}
                        {item.type === 'meal' && <i className="fas fa-utensils"></i>}
                        {item.type === 'room' && <i className="fas fa-bed"></i>}
                      </div>
                    )}
                  </div>
                  <div className={styles.resultInfo}>
                    <div className={styles.resultTitle}>{highlightText(item.title)}</div>
                    <div className={styles.resultMeta}>
                      <span className={styles.resultType}>
                        {item.type === 'activity' && <><i className="fas fa-running"></i> Actividad</>}
                        {item.type === 'meal' && <><i className="fas fa-utensils"></i> Menú</>}
                        {item.type === 'room' && <><i className="fas fa-bed"></i> Habitación</>}
                      </span>
                      {item.description && (
                        <span className={styles.resultDescription}>
                          {item.description.length > 60 
                            ? `${item.description.substring(0, 60)}...` 
                            : item.description}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className={styles.resultAction}>
                    Ver <i className="fas fa-chevron-right"></i>
                  </div>
                </div>
              ))}
            </>
          ) : query.trim().length > 0 && !isLoading && (
            <div className={styles.noResults}>
              <div className={styles.noResultsIcon}>
                <i className="fas fa-search"></i>
              </div>
              <p>No se encontraron resultados para "<strong>{query}</strong>"</p>
              <p className={styles.noResultsTip}>Intenta con otra búsqueda o revisa la ortografía</p>
            </div>
          )}
        </div>
      )}

      {isLoading && results.length === 0 && query.trim().length >= 2 && (
        <div className={styles.loadingResults}>
          <div className={styles.loadingIcon}></div>
          <p>Buscando resultados...</p>
        </div>
      )}
    </div>
  );
}