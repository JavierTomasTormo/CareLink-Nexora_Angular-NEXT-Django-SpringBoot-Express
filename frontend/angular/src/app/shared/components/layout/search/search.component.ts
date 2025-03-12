import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchService, SearchItem } from '../../../../core/services/utils/search.service';
import { debounceTime, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  @Input() className: string = '';
  @Input() placeholder: string = 'Buscar actividades...';
  @Output() close = new EventEmitter<void>();
  
  @ViewChild('inputRef') inputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('resultsRef') resultsRef!: ElementRef;

  query: string = '';
  results: SearchItem[] = [];
  recentSearches: string[] = [];
  isLoading: boolean = false;
  selectedIndex: number = -1;
  
  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  constructor(
    private searchService: SearchService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadRecentSearches();
    
    this.searchSubject.pipe(
      debounceTime(300),
      takeUntil(this.destroy$)
    ).subscribe(query => {
      this.performSearch(query);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadRecentSearches(): void {
    this.recentSearches = this.searchService.getRecentSearches();
  }

  onQueryChange(): void {
    this.selectedIndex = -1;
    this.searchSubject.next(this.query);
  }

  performSearch(query: string): void {
    if (query.trim().length < 2) {
      this.results = [];
      this.isLoading = false;
      return;
    }

    this.isLoading = true;
    
    this.searchService.searchItems(query).subscribe({
      next: (results) => {
        this.results = results;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error en la búsqueda:', err);
        this.results = [];
        this.isLoading = false;
      }
    });
  }

  clearSearch(): void {
    this.query = '';
    this.results = [];
    this.selectedIndex = -1;
  }

  clearRecentSearches(): void {
    this.searchService.clearRecentSearches();
    this.recentSearches = [];
  }

  selectRecentSearch(term: string): void {
    this.query = term;
    this.onQueryChange();
    setTimeout(() => {
      this.inputRef?.nativeElement?.focus();
    }, 0);
  }

  handleSelect(item: SearchItem): void {
    let path = '';
    
    switch (item.type) {
      case 'activity':
        path = `http://localhost:3000/details_activities/${item.id}`;
        break;
      case 'meal':
        path = `http://localhost:3000/meals/meal/${item.id}`;
        break;
      case 'room':
        path = `http://localhost:3000/rooms/room/${item.id}`;
        break;
    }

    if (path) {
      this.searchService.saveRecentSearch(item.title);
      this.router.navigate([path]);
      this.clearSearch();
      this.close.emit();
    }
  }

  handleKeyDown(event: KeyboardEvent): void {
    if (this.results.length === 0) return;

    switch(event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.selectedIndex = Math.min(this.selectedIndex + 1, this.results.length - 1);
        this.scrollToSelected();
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.selectedIndex = Math.max(this.selectedIndex - 1, 0);
        this.scrollToSelected();
        break;
      case 'Enter':
        event.preventDefault();
        if (this.selectedIndex >= 0 && this.selectedIndex < this.results.length) {
          this.handleSelect(this.results[this.selectedIndex]);
        }
        break;
      case 'Escape':
        event.preventDefault();
        this.clearSearch();
        this.close.emit();
        break;
    }
  }

  scrollToSelected(): void {
    if (this.selectedIndex >= 0 && this.resultsRef) {
      const container = this.resultsRef.nativeElement;
      const selectedItem = container.children[this.selectedIndex + 1] as HTMLElement;
      
      if (selectedItem) {
        const itemTop = selectedItem.offsetTop;
        const itemHeight = selectedItem.offsetHeight;
        const containerHeight = container.offsetHeight;
        const scrollTop = container.scrollTop;
        
        if (itemTop + itemHeight > scrollTop + containerHeight) {
          container.scrollTop = itemTop + itemHeight - containerHeight;
        } else if (itemTop < scrollTop) {
          container.scrollTop = itemTop;
        }
      }
    }
  }

  hasMatch(item: SearchItem): boolean {
    if (!this.query.trim()) return false;
    
    const term = this.query.toLowerCase();
    
    if (item.title?.toLowerCase().includes(term)) return true;
    if (item.characteristics?.some(char => char.toLowerCase().includes(term))) return true;
    if (item.description?.toLowerCase().includes(term)) return true;
    
    return false;
  }

  getExactMatches(): number {
    if (!this.query.trim()) return this.results.length;
    
    return this.results.filter(item => this.hasMatch(item)).length;
  }

  highlightText(text: string): string {
    if (!this.query.trim() || !text) return text;
    
    const regex = new RegExp(`(${this.escapeRegExp(this.query)})`, 'gi');
    return text.replace(regex, '<span class="highlight-match">$1</span>');
  }

  private escapeRegExp(string: string): string {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
}