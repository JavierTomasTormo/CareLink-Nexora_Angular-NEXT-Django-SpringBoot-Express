import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-floor-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './floor-selector.component.html',
  styleUrls: ['./floor-selector.component.scss'],
  animations: [
    trigger('buildingRotate', [
      state('initial', style({
        transform: 'rotateX(60deg) rotateZ(45deg)'
      })),
      state('active', style({
        transform: 'rotateX(65deg) rotateZ(55deg)'
      })),
      transition('initial <=> active', animate('800ms cubic-bezier(0.33, 1, 0.68, 1)'))
    ])
  ]
})
export class FloorSelectorComponent implements OnInit {
  @Input() floors: {id: number, name: string}[] = [];
  @Input() currentFloor: number = 1;
  @Output() floorChanged = new EventEmitter<number>();

  buildingState = 'initial';
  isHighlighting = false;
  
  constructor() {}

  ngOnInit(): void {}
  
  selectFloor(floorId: number): void {
    if (floorId === this.currentFloor) return;
    
    this.buildingState = 'active';
    setTimeout(() => this.buildingState = 'initial', 1000);
    
    this.isHighlighting = true;
    setTimeout(() => {
      this.floorChanged.emit(floorId);
      setTimeout(() => {
        this.isHighlighting = false;
      }, 500);
    }, 500);
  }
  
  getFloorStyle(floorId: number): object {
    const index = this.floors.length - floorId;
    const maxFloors = this.floors.length;
    const floorHeight = 40; 
    const totalHeight = maxFloors * floorHeight;
    
    const isActive = floorId === this.currentFloor;
    const elevation = totalHeight - (index * floorHeight);
    
    return {
      'bottom': `${elevation}px`,
      'opacity': isActive ? '1' : '0.85',
      'transform': isActive ? 'translateZ(10px) scale(1.05)' : 'translateZ(0) scale(1)',
      'z-index': isActive ? '10' : this.floors.length - index
    };
  }

  getCurrentFloorName(): string {
    const floor = this.floors.find(f => f.id === this.currentFloor);
    return floor ? floor.name : 'Planta';
  }

  // Color por planta
  getFloorColor(floorId: number): string {
    switch(floorId) {
      case 1: return '#3b82f6'; 
      case 2: return '#10b981'; 
      case 3: return '#8b5cf6'; 
      default: return '#94a3b8'; 
    }
  }
}