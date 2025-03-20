import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Room } from '../../models/rooms/rooms.model';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private selectedRoomSubject = new BehaviorSubject<Room | null>(null);
  selectedRoom$ = this.selectedRoomSubject.asObservable();

  private roomsConfig = [
    // Fila superior
    { id: 'commonRoom', name: 'Sala Común', x: 60, y: 60, width: 180, height: 100, description: 'Sala común con TV, sofás y zona de juegos' },
    { id: 'bathNorth', name: 'Baños Norte', x: 240, y: 60, width: 120, height: 100, description: 'Baños compartidos para las habitaciones del norte' },
    { id: 'h101', name: 'H101', x: 360, y: 60, width: 120, height: 100, description: 'Habitación individual con baño privado' },
    { id: 'h102', name: 'H102', x: 480, y: 60, width: 120, height: 100, description: 'Habitación doble con vista al jardín' },
    { id: 'h103', name: 'H103', x: 600, y: 60, width: 120, height: 100, description: 'Habitación individual con escritorio' },
    { id: 'h104', name: 'H104', x: 720, y: 60, width: 110, height: 100, description: 'Habitación individual estándar' },
    { id: 'h105', name: 'H105', x: 830, y: 60, width: 110, height: 100, description: 'Habitación individual estándar' },
    
    // Zona central
    { id: 'reception', name: 'Recepción', x: 60, y: 190, width: 220, height: 60, description: 'Área de recepción para visitantes y residentes' },
    { id: 'office', name: 'Oficinas', x: 280, y: 190, width: 220, height: 60, description: 'Oficinas administrativas' },
    { id: 'gym', name: 'Gimnasio', x: 60, y: 250, width: 220, height: 60, description: 'Gimnasio equipado para residentes' },
    { id: 'multiroom', name: 'Sala Multiusos', x: 280, y: 250, width: 220, height: 60, description: 'Sala para eventos, juegos y actividades diversas' },
    { id: 'garden', name: 'Jardín', x: 550, y: 190, width: 100, height: 120, description: 'Zona verde con plantas y espacio para relajarse' },
    { id: 'dining', name: 'Comedor', x: 750, y: 190, width: 190, height: 120, description: 'Comedor comunitario con mesas para 30 personas' },
    { id: 'kitchen', name: 'Cocina', x: 650, y: 190, width: 100, height: 120, description: 'Cocina compartida con 4 hornos y equipamiento profesional' },


    // Fila inferior
    { id: 'h201', name: 'H201', x: 60, y: 340, width: 120, height: 100, description: 'Habitación individual estándar' },
    { id: 'h202', name: 'H202', x: 180, y: 340, width: 120, height: 100, description: 'Habitación doble con balcón' },
    { id: 'laundry', name: 'Lavandería', x: 300, y: 340, width: 120, height: 100, description: 'Sala de lavandería con 6 lavadoras y 4 secadoras' },
    { id: 'h203', name: 'H203', x: 420, y: 340, width: 120, height: 100, description: 'Habitación individual con armario amplio' },
    { id: 'bathSouth', name: 'Baños Sur', x: 540, y: 340, width: 120, height: 100, description: 'Baños compartidos para las habitaciones del sur' },
    { id: 'h204', name: 'H204', x: 660, y: 340, width: 120, height: 100, description: 'Habitación doble para estudiantes' },
    { id: 'h205', name: 'H205', x: 780, y: 340, width: 160, height: 100, description: 'Habitación individual premium con nevera' }
  ];

  
  private rooms: Room[] = [];

  constructor() {
    this.initializeRooms();
  }

  private initializeRooms(): void {
    this.generateRoomsFromLayout({ rooms: this.roomsConfig });
  }

  generateRoom(id: string, name: string, x: number, y: number, width: number, height: number, description: string): Room {
    return {
      id: id,
      name: name,
      polygonPoints: `${x},${y} ${x+width},${y} ${x+width},${y+height} ${x},${y+height}`,
      description: description
    };
  }

  regenerateRooms(): void {
    this.initializeRooms();
  }

  getRooms(): Room[] {
    return this.rooms;
  }

  selectRoom(roomId: string): void {
    console.log('Seleccionando habitación:', roomId);
    const room = this.rooms.find(r => r.id === roomId);
    console.log('Habitación encontrada:', room);
    this.selectedRoomSubject.next(room || null);
  }

  clearSelection(): void {
    this.selectedRoomSubject.next(null);
  }

  addRoom(room: Room): void {
    this.rooms.push(room);
  }

  updateRoom(updatedRoom: Room): void {
    const index = this.rooms.findIndex(r => r.id === updatedRoom.id);
    if (index !== -1) {
      this.rooms[index] = updatedRoom;
      
      if (this.selectedRoomSubject.value?.id === updatedRoom.id) {
        this.selectedRoomSubject.next(updatedRoom);
      }
    }
  }

  deleteRoom(roomId: string): void {
    this.rooms = this.rooms.filter(room => room.id !== roomId);
    
    if (this.selectedRoomSubject.value?.id === roomId) {
      this.clearSelection();
    }
  }

  generateRoomsFromLayout(layoutConfig: any): void {
    const roomsConfig = layoutConfig.rooms || [];
    
    this.rooms = roomsConfig.map((config: any) => {
      return {
        id: config.id,
        name: config.name,
        description: config.description || `Habitación ${config.id}`,
        x: config.x,
        y: config.y,
        width: config.width,
        height: config.height,
        polygonPoints: `${config.x},${config.y} ${config.x+config.width},${config.y} ${config.x+config.width},${config.y+config.height} ${config.x},${config.y+config.height}`
      };
    });
  }
}