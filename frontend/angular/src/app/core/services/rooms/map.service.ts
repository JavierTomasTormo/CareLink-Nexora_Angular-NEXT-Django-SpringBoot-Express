import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { Room } from '../../models/rooms/rooms.model';
import { API_ROUTES } from '../../constants/api.routes';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private apiUrl = API_ROUTES.ROOMS;

  private selectedRoomSubject = new BehaviorSubject<Room | null>(null);
  selectedRoom$ = this.selectedRoomSubject.asObservable();

  private selectedFloorSubject = new BehaviorSubject<number>(1);
  selectedFloor$ = this.selectedFloorSubject.asObservable();

  private roomsByFloor: Map<number, Room[]> = new Map();
  private rooms: Room[] = [];

  constructor(private http: HttpClient) {
    this.initializeRooms();
  }


  private initializeRooms(): void {
    forkJoin({
      floors: this.getFloors(),
      roomsConfigByFloor: this.getRoomsConfigByFloor()
    }).subscribe(({ floors, roomsConfigByFloor }) => {
      floors.forEach(floor => {
        this.generateRoomsForFloor(floor.id, roomsConfigByFloor);
      });
      if (floors.length > 0) {
        this.selectFloor(floors[0].id);
      }
    });
  }

  private generateRoomsForFloor(floor: number, roomsConfigByFloor: { [key: number]: Room[] }): void {
    const roomsConfig = roomsConfigByFloor[floor] || [];
    const rooms = roomsConfig.map((config: Room) => {
      const {
        id,
        name,
        description = `Habitación ${id}`,
        x = 0,
        y = 0,
        width = 0,
        height = 0
      } = config;
  
      return {
        id,
        name,
        description,
        x,
        y,
        width,
        height,
        floor,
        polygonPoints: `${x},${y} ${x + width},${y} ${x + width},${y + height} ${x},${y + height}`
      };
    });
  
    // console.log(`Rooms for floor ${floor} :`, rooms); 
    this.roomsByFloor.set(floor, rooms);
  }

  private floors = [
    { id: 1, name: 'Planta Pública' },
    { id: 2, name: 'Planta Privada' },
    { id: 3, name: 'Nec. Especiales' },
    { id: 4, name: 'Almacén' },
  ];

  getFloors(): Observable<{ id: number, name: string }[]> {
    return this.http.get<Room[]>(`${this.apiUrl.GET_ALL}`).pipe(
      map(rooms => {
        const uniqueFloorIds = [...new Set(rooms.map(room => room.floor))];
        
        const floors = uniqueFloorIds.map(floorId => {
          const floorInfo = this.floors.find(f => f.id === floorId);
          return {
            id: floorId,
            name: floorInfo ? floorInfo.name : `Floor ${floorId}`
          };
        });
        
        // console.log('Pisos:', floors);
        return floors;
      })
    );
  }

  getRoomsConfigByFloor(): Observable<{ [key: number]: Room[] }> {
    return this.http.get<Room[]>(this.apiUrl.GET_ALL).pipe(
      map(rooms => {
        const roomsConfigByFloor = rooms.reduce((acc, room) => {
          if (!acc[room.floor]) {
            acc[room.floor] = [];
          }
          acc[room.floor].push(room);
          return acc;
        }, {} as { [key: number]: Room[] });
        return roomsConfigByFloor;
      })
    );
  }

  selectFloor(floor: number): void {
    this.selectedFloorSubject.next(floor);
    this.clearSelection();
  }

  getRooms(): Room[] {
    const currentFloor = this.selectedFloorSubject.value;
    return this.roomsByFloor.get(currentFloor) || [];
  }

  getRoomsByFloor(floor: number): Room[] {
    return this.roomsByFloor.get(floor) || [];
  }


  getCurrentFloor(): number {
    return this.selectedFloorSubject.value;
  }

  generateRoom(id: string, name: string, x: number, y: number, width: number, height: number, description: string, floor: number): Room {
    return {
      id: id,
      name: name,
      polygonPoints: `${x},${y} ${x+width},${y} ${x+width},${y+height} ${x},${y+height}`,
      description: description,
      floor: floor
    };
  }

  regenerateRooms(): void {
    this.initializeRooms();
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