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
  styleUrls: ['./rooms-interface.component.scss'],
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
  
  private subscription: Subscription = new Subscription();

  constructor(private mapService: MapService) { }

  ngOnInit(): void {
    this.mapService.getFloors().subscribe(floors => {
      this.floors = floors;
    });
    
    this.subscription.add(
      this.mapService.selectedFloor$.subscribe(floor => {
        this.currentFloor = floor;
        this.rooms = this.mapService.getRoomsByFloor(floor);
        this.resetView(); 
      })
    );
    
    this.rooms = this.mapService.getRooms();
    
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
      
      // Pequeño delay para que se vea la animación
      setTimeout(() => {
        this.mapService.selectFloor(floor);
        
        // Dar tiempo para que termine la animación
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

  // Métodos para controlar el zoom desde la UI
  zoom(factor: number, x: number, y: number): void {
    if (this.mapSvgComponent) {
      this.mapSvgComponent.zoom(factor, x, y);
    }
  }

  resetView(): void {
    if (this.mapSvgComponent) {
      this.mapSvgComponent.resetView();
    } else {
      // Valores por defecto si el componente no está disponible
      this.scale = 1;
      this.translateX = 0;
      this.translateY = 0;
    }
  }

  // Métodos para recibir actualizaciones del componente hijo
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
}