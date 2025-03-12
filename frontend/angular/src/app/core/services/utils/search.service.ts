import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../../enviroments/environment';

export interface SearchItem {
  id: number;
  title: string;
  type: 'activity' | 'meal' | 'room';
  image?: string;
  description?: string;
  characteristics?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private apiUrl = environment.apiUrl || 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  searchItems(query: string): Observable<SearchItem[]> {
    if (!query || query.trim().length < 2) {
      return of([]);
    }

    return this.http.get<any[]>(`${this.apiUrl}/activities/?search=${query}`).pipe(
      map(activities => this.formatActivitiesResults(activities, query)),
      catchError(error => {
        console.error('Error buscando actividades:', error);
        return of([]);
      })
    );
  }

  private formatActivitiesResults(activities: any[], query: string): SearchItem[] {
    if (!Array.isArray(activities)) {
      return [];
    }

    return activities.map(activity => ({
      id: activity.id || 0,
      title: activity.name_activitie || "Actividad sin nombre",
      type: 'activity' as const,
      image: activity.image || null,
      description: activity.description?.substring(0, 100) || '',
      characteristics: Array.isArray(activity.caracteristics) ? activity.caracteristics : []
    })).sort((a, b) => this.sortResultsByRelevance(a, b, query));
  }

  private sortResultsByRelevance(a: SearchItem, b: SearchItem, query: string): number {
    const queryLower = query.toLowerCase();
    const titleA = (a?.title || "").toLowerCase();
    const titleB = (b?.title || "").toLowerCase();
    
    // Comprobar coincidencias exactas en título
    const startsWithA = titleA.startsWith(queryLower);
    const startsWithB = titleB.startsWith(queryLower);
    const includesA = titleA.includes(queryLower);
    const includesB = titleB.includes(queryLower);
    
    // Verificar coincidencias en características
    const hasCharacteristicMatchA = a.characteristics?.some(
      char => char.toLowerCase().includes(queryLower)
    ) || false;
    
    const hasCharacteristicMatchB = b.characteristics?.some(
      char => char.toLowerCase().includes(queryLower)
    ) || false;
    
    // Si uno comienza con la consulta y el otro no
    if (startsWithA && !startsWithB) return -1;
    if (!startsWithA && startsWithB) return 1;
    
    // Si ambos o ninguno comienza con la consulta, verificar si incluye
    if (includesA && !includesB) return -1;
    if (!includesA && includesB) return 1;
    
    // Si ambos o ninguno incluye la consulta en título, comprobar características
    if (hasCharacteristicMatchA && !hasCharacteristicMatchB) return -1;
    if (!hasCharacteristicMatchA && hasCharacteristicMatchB) return 1;
    
    // Si todo lo anterior es igual, ordenar alfabéticamente
    return titleA.localeCompare(titleB);
  }

  saveRecentSearch(search: string): void {
    try {
      let recentSearches: string[] = [];
      const saved = localStorage.getItem('recentSearches');
      
      if (saved) {
        recentSearches = JSON.parse(saved);
      }
      
      // Añadir la nueva búsqueda al principio y eliminar duplicados
      recentSearches = [...new Set([search, ...recentSearches])].slice(0, 5);
      localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
    } catch (e) {
      console.error('Error guardando búsqueda reciente:', e);
    }
  }

  getRecentSearches(): string[] {
    try {
      const saved = localStorage.getItem('recentSearches');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Error obteniendo búsquedas recientes:', e);
      return [];
    }
  }

  clearRecentSearches(): void {
    localStorage.removeItem('recentSearches');
  }
}