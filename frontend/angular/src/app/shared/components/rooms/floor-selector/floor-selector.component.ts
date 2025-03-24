import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-floor-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './floor-selector.component.html',
  styleUrls: ['./floor-selector.component.css']
})
export class FloorSelectorComponent implements OnInit {
  @Input() floors: {id: number, name: string}[] = [];
  @Input() currentFloor: number = 1;
  @Output() floorChanged = new EventEmitter<number>();
  
  floorColors = [
    '#3b82f6', // Azul (Planta 1)
    '#10b981', // Verde (Planta 2)
    '#8b5cf6', // Púrpura (Planta 3)
    '#f59e0b', // Ámbar (Planta 4)
    '#ef4444', // Rojo (Planta 5)
    '#14b8a6', // Esmeralda (Planta 6)
    '#6366f1', // Índigo (Planta 7)
    '#ec4899', // Rosa (Planta 8)
    '#0284c7', // Azul cielo (Planta 9)
    '#84cc16', // Lima (Planta 10)
  ];
  
  constructor() {}

  ngOnInit(): void {
    // console.log(this.floors);
  }
  
  getCurrentFloorName(): string {
    const floor = this.floors.find(f => f.id === this.currentFloor);
    return floor ? floor.name : 'Planta';
  }
  
  getFloorColor(floorId: number): string {
    return this.floorColors[(floorId - 1) % this.floorColors.length];
  }
  
  selectFloor(floorId: number): void {
    if (floorId === this.currentFloor) return;
    this.floorChanged.emit(floorId);
  }

  handleKeyDown(event: KeyboardEvent, floorId: number): void {
    if (event.key === 'Enter' || event.key === ' ') {
      this.selectFloor(floorId);
      event.preventDefault();
    }
  }
}