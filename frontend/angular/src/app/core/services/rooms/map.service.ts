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
    // Habitaciones lado izquierdo (corridor)
    {
      id: 'h101',
      name: 'Habitación 101',
      polygonPoints: '100,100 180,100 180,170 100,170',
      description: 'Habitación individual con baño privado'
    },
    {
      id: 'h102',
      name: 'Habitación 102',
      polygonPoints: '100,180 180,180 180,250 100,250',
      description: 'Habitación doble estándar'
    },
    {
      id: 'h103',
      name: 'Habitación 103',
      polygonPoints: '100,260 180,260 180,330 100,330',
      description: 'Habitación individual para pacientes en observación'
    },
    {
      id: 'h104',
      name: 'Habitación 104',
      polygonPoints: '100,340 180,340 180,410 100,410',
      description: 'Habitación doble con equipamiento especial'
    },
    
    // Salas centrales
    {
      id: 'surgery',
      name: 'Quirófano',
      polygonPoints: '250,150 400,150 400,300 250,300',
      description: 'Quirófano principal con equipamiento avanzado'
    },
    {
      id: 'nurses',
      name: 'Estación Enfermería',
      polygonPoints: '250,310 400,310 400,380 250,380',
      description: 'Estación central de enfermería y monitorización'
    },
    
    // Habitaciones lado derecho
    {
      id: 'h201',
      name: 'Habitación 201',
      polygonPoints: '470,100 550,100 550,170 470,170',
      description: 'Habitación UCI'
    },
    {
      id: 'h202',
      name: 'Habitación 202',
      polygonPoints: '470,180 550,180 550,250 470,250',
      description: 'Habitación de cuidados intensivos'
    },
    {
      id: 'h203',
      name: 'Habitación 203',
      polygonPoints: '470,260 550,260 550,330 470,330',
      description: 'Habitación para pacientes pediátricos'
    },
    {
      id: 'h204',
      name: 'Habitación 204',
      polygonPoints: '470,340 550,340 550,410 470,410',
      description: 'Habitación para pacientes de larga estancia'
    },
    
    // Salas especiales
    {
      id: 'lab',
      name: 'Laboratorio',
      polygonPoints: '600,100 700,100 700,200 600,200',
      description: 'Laboratorio de análisis clínicos'
    },
    {
      id: 'xray',
      name: 'Sala de Rayos X',
      polygonPoints: '600,210 700,210 700,310 600,310',
      description: 'Sala de radiología y diagnóstico por imagen'
    },
    {
      id: 'pharmacy',
      name: 'Farmacia',
      polygonPoints: '600,320 700,320 700,410 600,410',
      description: 'Farmacia hospitalaria'
    }
  ];

  constructor() { }

  getRooms(): Room[] {
    return this.rooms;
  }

  selectRoom(roomId: string): void {
    const room = this.rooms.find(r => r.id === roomId);
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
}