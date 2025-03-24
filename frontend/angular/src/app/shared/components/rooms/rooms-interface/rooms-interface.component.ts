import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MapService } from '../../../../core/services/rooms/map.service';
import { Room } from '../../../../core/models/rooms/rooms.model';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FloorSelectorComponent } from '../floor-selector/floor-selector.component';
import { MapSvgComponent } from '../map-svg/map-svg.component';
import { trigger, transition, style, animate } from '@angular/animations';
import { ModalDetailsComponent } from '../modal-details/modal-details.component';



@Component({
  selector: 'app-rooms-interface',
  standalone: true,
  imports: [CommonModule, FloorSelectorComponent, MapSvgComponent, ModalDetailsComponent],
  templateUrl: './rooms-interface.component.html',
  styleUrls: ['./rooms-interface.component.css'],
  animations: [
    trigger('floorChange', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(-20px)' }))
      ])
    ])
  ]
})
export class RoomsInterfaceComponent implements OnInit, OnDestroy {
  @ViewChild(MapSvgComponent) mapSvgComponent!: MapSvgComponent;
  
  rooms: Room[] = [];
  selectedRoom: Room | null = null;

  showDetailsModal = false;
  modalRoom: Room | null = null;
  
  floors: { id: number; name: string; }[] = [];
  currentFloor: number = 1;

  scale: number = 1;
  translateX: number = 0;
  translateY: number = 0;
  isFloorChanging: boolean = false;

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
  
  private subscription: Subscription = new Subscription();

  constructor(private mapService: MapService) { }

  ngOnInit(): void {
    this.mapService.getFloors().subscribe(floors => {
      this.floors = floors;
      if (this.floors.length > 0) {
        this.changeFloor(this.floors[0].id);
      }
    });
  
    this.subscription.add(
      this.mapService.selectedFloor$.subscribe(floor => {
        this.currentFloor = floor;
        this.rooms = this.mapService.getRoomsByFloor(floor);
        this.resetView();
      })
    );
  
    this.subscription.add(
      this.mapService.selectedRoom$.subscribe(room => {
        this.selectedRoom = room;
        if (room) {
          this.openDetailsModal(room);
        }
      })
    );
  }


  changeFloor(floor: number): void {
    if (this.currentFloor !== floor) {
      this.isFloorChanging = true;
      
      setTimeout(() => {
        this.mapService.selectFloor(floor);
        
        setTimeout(() => {
          this.isFloorChanging = false;
        }, 500);
      }, 300);
    }
  }

  handleFloorChange(floorId: number): void {
    this.changeFloor(floorId);
  }
  
  openDetailsModal(room: Room): void {
    this.modalRoom = room;
    this.showDetailsModal = true;
  }

  closeDetailsModal(): void {
    this.showDetailsModal = false;
  }

  onRoomSelected(room: Room): void {
    this.mapService.selectRoom(room.id);
  }

  onMapBackgroundClick(): void {
    this.mapService.clearSelection();
  }

  zoom(factor: number, x: number, y: number): void {
    if (this.mapSvgComponent) {
      this.mapSvgComponent.zoom(factor, x, y);
    }
  }

  resetView(): void {
    if (this.mapSvgComponent) {
      this.mapSvgComponent.resetView();
    } else {
      this.scale = 1;
      this.translateX = 0;
      this.translateY = 0;
    }
  }

  onTransformUpdated(transform: {translateX: number, translateY: number, scale: number}): void {
    this.translateX = transform.translateX;
    this.translateY = transform.translateY;
    this.scale = transform.scale;
  }

  onRoomClicked(roomData: {roomId: string, event: MouseEvent}): void {
    roomData.event.stopPropagation();
    this.mapService.selectRoom(roomData.roomId);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getCurrentFloorName(): string {
    const floor = this.floors.find(f => f.id === this.currentFloor);
    return floor ? floor.name : 'Planta';
  }
  
  getFloorColor(floorId: number): string {
    return this.floorColors[(floorId - 1) % this.floorColors.length];
  }
}