import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Room } from '../../models/rooms/rooms.model';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private selectedRoomSubject = new BehaviorSubject<Room | null>(null);
  selectedRoom$ = this.selectedRoomSubject.asObservable();

  private selectedFloorSubject = new BehaviorSubject<number>(1);
  selectedFloor$ = this.selectedFloorSubject.asObservable();


  private roomsByFloor: Map<number, Room[]> = new Map();


  private floors = [
    { id: 1, name: 'Planta Pública' },
    { id: 2, name: 'Planta Privada' },
    { id: 3, name: 'Planta Nec. Especiales' },
  ];


  

  private roomsConfigByFloor = {
    // Planta 1 - Áreas comunes y servicios principales
    1: [
      // Fila superior
      { id: 'commonRoom', name: 'Sala Común', x: 60, y: 60, width: 180, height: 100, description: 'Sala común con TV, sofás y zona de juegos' },
      { id: 'bathNorth', name: 'Baños Norte', x: 240, y: 60, width: 120, height: 100, description: 'Baños compartidos para las habitaciones del norte' },
      { id: 'room101', name: 'Hab 101', x: 360, y: 60, width: 120, height: 100, description: 'Habitación individual adaptada con baño privado' },
      { id: 'room102', name: 'Hab 102', x: 480, y: 60, width: 120, height: 100, description: 'Habitación individual adaptada con baño privado' },
      { id: 'room103', name: 'Hab 103', x: 600, y: 60, width: 120, height: 100, description: 'Habitación doble adaptada con baño privado' },
      { id: 'nurseStation1', name: 'Enfermería', x: 720, y: 60, width: 110, height: 100, description: 'Estación central de enfermería' },
      { id: 'medicalRoom', name: 'Sala Médica', x: 830, y: 60, width: 110, height: 100, description: 'Sala de atención médica y chequeos' },
      
      // Zona central
      { id: 'reception', name: 'Recepción', x: 60, y: 190, width: 220, height: 60, description: 'Área de recepción para visitantes y residentes' },
      { id: 'adminOffice', name: 'Oficinas', x: 280, y: 190, width: 220, height: 60, description: 'Oficinas administrativas' },
      { id: 'activityHall', name: 'Sala Actividades', x: 60, y: 250, width: 220, height: 60, description: 'Espacio para actividades recreativas y terapia ocupacional' },
      { id: 'physiotherapy', name: 'Fisioterapia', x: 280, y: 250, width: 220, height: 60, description: 'Sala de fisioterapia y rehabilitación' },
      { id: 'garden', name: 'Jardín', x: 550, y: 190, width: 100, height: 120, description: 'Jardín terapéutico con caminos adaptados' },
      { id: 'dining', name: 'Comedor', x: 750, y: 190, width: 190, height: 120, description: 'Comedor principal con capacidad para 50 residentes' },
      { id: 'kitchen', name: 'Cocina', x: 650, y: 190, width: 100, height: 120, description: 'Cocina industrial adaptada para necesidades dietéticas especiales' },
  
      // Fila inferior
      { id: 'room104', name: 'Hab 104', x: 60, y: 340, width: 120, height: 100, description: 'Habitación individual estándar' },
      { id: 'room105', name: 'Hab 105', x: 180, y: 340, width: 120, height: 100, description: 'Habitación doble con balcón' },
      { id: 'laundry', name: 'Lavandería', x: 300, y: 340, width: 120, height: 100, description: 'Servicio de lavandería central' },
      { id: 'room106', name: 'Hab 106', x: 420, y: 340, width: 120, height: 100, description: 'Habitación individual con armario amplio' },
      { id: 'bathSouth', name: 'Baños Sur', x: 540, y: 340, width: 120, height: 100, description: 'Baños compartidos para las habitaciones del sur' },
      { id: 'room107', name: 'Hab 107', x: 660, y: 340, width: 120, height: 100, description: 'Habitación doble para residentes' },
      { id: 'room108', name: 'Hab 108', x: 780, y: 340, width: 160, height: 100, description: 'Habitación individual premium con nevera' }
    ],
    
    // Planta 2 - Habitaciones residentes y áreas de cuidado
    2: [
      // Fila superior
      { id: 'livingRoom2', name: 'Sala Estar', x: 60, y: 60, width: 180, height: 100, description: 'Sala de estar con televisión y zona de lectura' },
      { id: 'bathNorth2', name: 'Baños Norte', x: 240, y: 60, width: 120, height: 100, description: 'Baños compartidos para las habitaciones del norte' },
      { id: 'room201', name: 'Hab 201', x: 360, y: 60, width: 120, height: 100, description: 'Habitación individual adaptada con baño privado' },
      { id: 'room202', name: 'Hab 202', x: 480, y: 60, width: 120, height: 100, description: 'Habitación individual adaptada con baño privado' },
      { id: 'room203', name: 'Hab 203', x: 600, y: 60, width: 120, height: 100, description: 'Habitación individual adaptada con baño privado' },
      { id: 'room204', name: 'Hab 204', x: 720, y: 60, width: 110, height: 100, description: 'Habitación individual adaptada con baño privado' },
      { id: 'room205', name: 'Hab 205', x: 830, y: 60, width: 110, height: 100, description: 'Habitación individual adaptada con baño privado' },
      
      // Zona central
      { id: 'nurseStation2', name: 'Enfermería', x: 60, y: 190, width: 220, height: 60, description: 'Estación de enfermería de la segunda planta' },
      { id: 'medicationRoom', name: 'Medicamentos', x: 280, y: 190, width: 220, height: 60, description: 'Sala de preparación y almacenaje de medicamentos' },
      { id: 'libraryGames', name: 'Biblioteca', x: 60, y: 250, width: 220, height: 60, description: 'Biblioteca y sala de juegos de mesa' },
      { id: 'diningSmall', name: 'Comedor Aux', x: 280, y: 250, width: 220, height: 60, description: 'Comedor auxiliar para residentes con necesidades especiales' },
      { id: 'staffRoom', name: 'Sala Personal', x: 550, y: 190, width: 100, height: 120, description: 'Sala de descanso para el personal' },
      { id: 'bathAssisted', name: 'Baño Asistido', x: 750, y: 190, width: 190, height: 120, description: 'Baño con asistencia para residentes con movilidad reducida' },
      { id: 'storageSupplies', name: 'Almacén', x: 650, y: 190, width: 100, height: 120, description: 'Almacén de suministros y equipamiento médico' },
  
      // Fila inferior
      { id: 'room206', name: 'Hab 206', x: 60, y: 340, width: 120, height: 100, description: 'Habitación individual adaptada con baño privado' },
      { id: 'room207', name: 'Hab 207', x: 180, y: 340, width: 120, height: 100, description: 'Habitación doble adaptada con baño privado' },
      { id: 'room208', name: 'Hab 208', x: 300, y: 340, width: 120, height: 100, description: 'Habitación doble adaptada con baño privado' },
      { id: 'room209', name: 'Hab 209', x: 420, y: 340, width: 120, height: 100, description: 'Habitación individual con armario amplio' },
      { id: 'bathSouth2', name: 'Baños Sur', x: 540, y: 340, width: 120, height: 100, description: 'Baños compartidos para las habitaciones del sur' },
      { id: 'room210', name: 'Hab 210', x: 660, y: 340, width: 120, height: 100, description: 'Habitación doble para residentes' },
      { id: 'room211', name: 'Hab 211', x: 780, y: 340, width: 160, height: 100, description: 'Habitación individual premium con nevera' }
    ],
    
    // Planta 3 - Unidad de cuidados especiales y memoria
    3: [
      // Fila superior
      { id: 'memoryCenter', name: 'Centro Memoria', x: 60, y: 60, width: 180, height: 100, description: 'Área especializada para residentes con demencia o Alzheimer' },
      { id: 'sensoryRoom', name: 'Sala Sensorial', x: 240, y: 60, width: 120, height: 100, description: 'Sala de estimulación sensorial terapéutica' },
      { id: 'memRoom301', name: 'Mem 301', x: 360, y: 60, width: 120, height: 100, description: 'Habitación adaptada para residentes con demencia' },
      { id: 'memRoom302', name: 'Mem 302', x: 480, y: 60, width: 120, height: 100, description: 'Habitación adaptada para residentes con demencia' },
      { id: 'memRoom303', name: 'Mem 303', x: 600, y: 60, width: 120, height: 100, description: 'Habitación adaptada para residentes con demencia' },
      { id: 'memRoom304', name: 'Mem 304', x: 720, y: 60, width: 110, height: 100, description: 'Habitación adaptada para residentes con demencia' },
      { id: 'memRoom305', name: 'Mem 305', x: 830, y: 60, width: 110, height: 100, description: 'Habitación adaptada para residentes con demencia' },
      
      // Zona central
      { id: 'nurseStation3', name: 'Enfermería', x: 60, y: 190, width: 220, height: 60, description: 'Estación de enfermería de cuidados especiales' },
      { id: 'monitorRoom', name: 'Sala Monitor', x: 280, y: 190, width: 220, height: 60, description: 'Sala de monitoreo para residentes que requieren supervisión constante' },
      { id: 'therapyRoom', name: 'Sala Terapia', x: 60, y: 250, width: 220, height: 60, description: 'Sala para terapias diversas y actividades adaptadas' },
      { id: 'familyRoom', name: 'Sala Familiar', x: 280, y: 250, width: 220, height: 60, description: 'Sala para visitas familiares privadas' },
      { id: 'secureGarden', name: 'Jardín Seguro', x: 550, y: 190, width: 100, height: 120, description: 'Jardín cerrado y seguro para pacientes con demencia' },
      { id: 'diningSpecial', name: 'Comedor Esp.', x: 750, y: 190, width: 190, height: 120, description: 'Comedor para residentes con necesidades especiales de alimentación' },
      { id: 'staffNight', name: 'Personal Noche', x: 650, y: 190, width: 100, height: 120, description: 'Habitación para personal de guardia nocturna' },
  
      // Fila inferior
      { id: 'specRoom306', name: 'Esp 306', x: 60, y: 340, width: 120, height: 100, description: 'Habitación para cuidados especiales' },
      { id: 'specRoom307', name: 'Esp 307', x: 180, y: 340, width: 120, height: 100, description: 'Habitación para cuidados especiales' },
      { id: 'specRoom308', name: 'Esp 308', x: 300, y: 340, width: 120, height: 100, description: 'Habitación para cuidados especiales' },
      { id: 'specRoom309', name: 'Esp 309', x: 420, y: 340, width: 120, height: 100, description: 'Habitación para cuidados especiales' },
      { id: 'bathSpecial', name: 'Baños Esp.', x: 540, y: 340, width: 120, height: 100, description: 'Baños adaptados para cuidados especiales' },
      { id: 'memRoom306', name: 'Mem 306', x: 660, y: 340, width: 120, height: 100, description: 'Habitación adaptada para residentes con demencia' },
      { id: 'isolationRoom', name: 'Aislamiento', x: 780, y: 340, width: 160, height: 100, description: 'Habitación de aislamiento para casos que requieren separación temporal' }
    ]
  };

  
  private rooms: Room[] = [];

  constructor() {
    this.initializeRooms();
  }

  // private initializeRooms(): void {
  //   this.generateRoomsFromLayout({ rooms: this.roomsConfig });
  // }

  private initializeRooms(): void {
    // Inicializar habitaciones para cada planta
    for (const floor of this.floors) {
      this.generateRoomsForFloor(floor.id);
    }
  }

  private generateRoomsForFloor(floor: number): void {
    const roomsConfig = this.roomsConfigByFloor[floor as keyof typeof this.roomsConfigByFloor] || [];
    const rooms = roomsConfig.map((config: any) => ({
      id: config.id,
      name: config.name,
      description: config.description || `Habitación ${config.id}`,
      x: config.x,
      y: config.y,
      width: config.width,
      height: config.height,
      floor: floor,
      polygonPoints: `${config.x},${config.y} ${config.x+config.width},${config.y} ${config.x+config.width},${config.y+config.height} ${config.x},${config.y+config.height}`
    }));
    
    this.roomsByFloor.set(floor, rooms);
  }


  getFloors() {
    return this.floors;
  }

  selectFloor(floor: number): void {
    this.selectedFloorSubject.next(floor);
    // Al cambiar de planta, limpiamos la selección de habitación
    this.clearSelection();
  }

  // Obtener habitaciones de la planta actual
  getRooms(): Room[] {
    const currentFloor = this.selectedFloorSubject.value;
    return this.roomsByFloor.get(currentFloor) || [];
  }

  // Obtener habitaciones de una planta específica
  getRoomsByFloor(floor: number): Room[] {
    return this.roomsByFloor.get(floor) || [];
  }


  // Método para obtener la planta actual
  getCurrentFloor(): number {
    return this.selectedFloorSubject.value;
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

  // getRooms(): Room[] {
  //   return this.rooms;
  // }

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