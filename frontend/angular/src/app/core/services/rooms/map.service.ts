import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Room } from '../../models/rooms/rooms.model';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private selectedRoomSubject = new BehaviorSubject<Room | null>(null);
  selectedRoom$ = this.selectedRoomSubject.asObservable();

  private rooms: Room[] = [
    // Habitaciones fila superior
    {
      id: 'room-h101',
      name: 'Habitación 101',
      polygonPoints: '60,60 200,60 200,230 60,230',
      description: 'Habitación individual con baño privado'
    },
    {
      id: 'room-h102',
      name: 'Habitación 102',
      polygonPoints: '200,60 340,60 340,230 200,230',
      description: 'Habitación doble con vista al jardín'
    },
    {
      id: 'bathNorth',
      name: 'Baños Norte',
      polygonPoints: '340,60 480,60 480,230 340,230',
      description: 'Baños compartidos para las habitaciones del norte'
    },
    {
      id: 'room-h103',
      name: 'Habitación 103',
      polygonPoints: '480,60 620,60 620,230 480,230',
      description: 'Habitación individual con escritorio'
    },
    {
      id: 'commonRoom',
      name: 'Sala Común',
      polygonPoints: '620,60 760,60 760,230 620,230',
      description: 'Sala común con TV, sofás y zona de juegos'
    },
    {
      id: 'room-h104',
      name: 'Habitación 104',
      polygonPoints: '760,60 850,60 850,230 760,230',
      description: 'Suite con área de estudio separada'
    },
    {
      id: 'room-h105',
      name: 'Habitación 105',
      polygonPoints: '850,60 940,60 940,230 850,230',
      description: 'Habitación individual adaptada para movilidad reducida'
    },
    
    // Zona central - Comedor y cocina
    {
      id: 'dining',
      name: 'Comedor',
      polygonPoints: '620,270 760,270 760,360 620,360',
      description: 'Comedor comunitario con mesas para 30 personas'
    },
    {
      id: 'kitchen',
      name: 'Cocina',
      polygonPoints: '760,270 940,270 940,360 760,360',
      description: 'Cocina compartida con 4 hornos y equipamiento profesional'
    },
    
    // Habitaciones fila inferior
    {
      id: 'room-h201',
      name: 'Habitación 201',
      polygonPoints: '60,360 200,360 200,450 60,450',
      description: 'Habitación individual estándar'
    },
    {
      id: 'room-h202',
      name: 'Habitación 202',
      polygonPoints: '200,360 340,360 340,450 200,450',
      description: 'Habitación doble con balcón'
    },
    {
      id: 'laundry',
      name: 'Lavandería',
      polygonPoints: '340,360 480,360 480,450 340,450',
      description: 'Sala de lavandería con 6 lavadoras y 4 secadoras'
    },
    {
      id: 'room-h203',
      name: 'Habitación 203',
      polygonPoints: '480,360 620,360 620,450 480,450',
      description: 'Habitación individual con armario amplio'
    },
    {
      id: 'bathSouth',
      name: 'Baños Sur',
      polygonPoints: '620,360 760,360 760,450 620,450',
      description: 'Baños compartidos para las habitaciones del sur'
    },
    {
      id: 'room-h204',
      name: 'Habitación 204',
      polygonPoints: '760,360 850,360 850,450 760,450',
      description: 'Habitación doble para estudiantes'
    },
    {
      id: 'room-h205',
      name: 'Habitación 205',
      polygonPoints: '850,360 940,360 940,450 850,450',
      description: 'Habitación individual premium con nevera'
    }
  ];

  constructor() { }

  // Método para generar habitaciones dinámicamente por tipo y dimensiones
  generateRoom(id: string, name: string, x: number, y: number, width: number, height: number, description: string): Room {
    return {
      id: id,
      name: name,
      polygonPoints: `${x},${y} ${x+width},${y} ${x+width},${y+height} ${x},${y+height}`,
      description: description
    };
  }

  // Método para regenerar todas las habitaciones si es necesario
  regenerateRooms(): void {
    // Puedes llamar a esta función para reconstruir las habitaciones usando generateRoom
    // Por ejemplo: this.rooms = [this.generateRoom(...), ...];
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
      
      // Si la sala actualizada es la seleccionada actualmente, actualiza la selección
      if (this.selectedRoomSubject.value?.id === updatedRoom.id) {
        this.selectedRoomSubject.next(updatedRoom);
      }
    }
  }

  deleteRoom(roomId: string): void {
    this.rooms = this.rooms.filter(room => room.id !== roomId);
    
    // Si la sala eliminada era la seleccionada, limpia la selección
    if (this.selectedRoomSubject.value?.id === roomId) {
      this.clearSelection();
    }
  }

  generateRoomsFromLayout(layoutConfig: any): void {
    const roomsConfig = layoutConfig.rooms || [];
    
    // Generar habitaciones
    this.rooms = roomsConfig.map((config: any) => {
      return {
        id: config.id,
        name: config.name,
        description: config.description || `Habitación ${config.id}`,
        x: config.x,
        y: config.y,
        width: config.width,
        height: config.height,
        polygonPoints: config.polygonPoints
      };
    });
  }
}