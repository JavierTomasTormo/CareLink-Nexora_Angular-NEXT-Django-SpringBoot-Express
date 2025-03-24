import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Room } from '../../../../core/models/rooms/rooms.model';
import { trigger, transition, style, animate } from '@angular/animations';
import { ModalService } from '../../../../core/services/rooms/modal.service';


@Component({
  selector: 'app-map-svg',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map-svg.component.html',
  styleUrls: ['./map-svg.component.scss'],
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
export class MapSvgComponent implements OnChanges {
  @ViewChild('mapSvg', { static: true }) mapSvg!: ElementRef<SVGElement>;

  @Input() rooms: Room[] = [];
  @Input() currentFloor: number = 1;
  @Input() selectedRoom: Room | null = null;
  @Input() isFloorChanging: boolean = false;
  @Input() scale: number = 1;
  @Input() translateX: number = 0;
  @Input() translateY: number = 0;
  
  @Output() roomClicked = new EventEmitter<{roomId: string, event: MouseEvent}>();
  @Output() mapBackgroundClicked = new EventEmitter<void>();
  @Output() transformUpdated = new EventEmitter<{translateX: number, translateY: number, scale: number}>();
  
  isDragging: boolean = false;
  startX: number = 0;
  startY: number = 0;

  // Posiciones predefinidas de escaleras en cada planta
  stairsPositions = [
    { x: 540, y: 296, floor: 1 }, 
    { x: 540, y: 204, floor: 1 }, 
    { x: 513, y: 204, floor: 2 },
    { x: 513, y: 296, floor: 2 }, 
    { x: 540, y: 296, floor: 3 }, 
    { x: 540, y: 204, floor: 3 }, 
    { x: 513, y: 204, floor: 4 },
    { x: 513, y: 296, floor: 4 }
  ];

  constructor(
    private modalService: ModalService
  ) {}

  ngOnChanges(): void {
    this.updateMapTransform();
  }

  // Métodos para obtener las habitaciones y escaleras del piso actual
  getRoomsForCurrentFloor(): Room[] {
    return this.rooms.filter(room => room.floor === this.currentFloor);
  }

  getStairsForCurrentFloor() {
    return this.stairsPositions.filter(stair => stair.floor === this.currentFloor);
  }

  onRoomClick(roomId: string, event: MouseEvent): void {
    this.roomClicked.emit({ roomId, event });
    event.stopPropagation();
  }

  onMapBackgroundClick(): void {
    if (!this.isDragging) {
      this.mapBackgroundClicked.emit();
    }
  }

  // Métodos para arrastrar el mapa (drag)
  onMouseDown(event: MouseEvent): void {
    event.preventDefault();
    this.isDragging = true;
    this.startX = event.clientX - this.translateX;
    this.startY = event.clientY - this.translateY;
  }

  onMouseMove(event: MouseEvent): void {
    if (this.isDragging) {
      event.preventDefault();
      this.translateX = event.clientX - this.startX;
      this.translateY = event.clientY - this.startY;
      this.updateMapTransform();
      this.emitTransformUpdate();
    }
  }

  onMouseUp(): void {
    this.isDragging = false;
  }

  onMouseLeave(): void {
    this.isDragging = false;
  }

  zoom(factor: number, x: number, y: number): void {
    const oldScale = this.scale;
    this.scale *= factor;

    this.scale = Math.max(0.5, Math.min(this.scale, 2));

    if (this.scale !== oldScale) {
      const scaleFactor = this.scale / oldScale;
      this.translateX = x - (x - this.translateX) * scaleFactor;
      this.translateY = y - (y - this.translateY) * scaleFactor;
    }

    this.updateMapTransform();
    this.emitTransformUpdate();
  }

  resetView(): void {
    this.scale = 1;
    this.translateX = 0;
    this.translateY = 0;
    this.updateMapTransform();
    this.emitTransformUpdate();
  }

  private updateMapTransform(): void {
    if (this.mapSvg && this.mapSvg.nativeElement) {
      const transform = `translate(${this.translateX}px, ${this.translateY}px) scale(${this.scale})`;
      this.mapSvg.nativeElement.style.transform = transform;
    }
  }

  private emitTransformUpdate(): void {
    this.transformUpdated.emit({
      translateX: this.translateX,
      translateY: this.translateY,
      scale: this.scale
    });
  }

  // Métodos para obtener información de las habitaciones
  getRoomCoords(room: any): any {
    return {
      x: room.x,
      y: room.y,
      width: room.width,
      height: room.height
    };
  }

  getRoomCenter(room: Room): {x: number, y: number} {
    const coords = this.getRoomCoords(room);
    return {
      x: coords.x + coords.width / 2,
      y: coords.y + coords.height / 2
    };
  }

  // Métodos para obtener estilos de habitaciones
  getRoomFill(roomId: string): string {
    // Habitaciones normales
    if (roomId.startsWith('room') || roomId.startsWith('h')) return 'url(#gradient-room)';
    
    // Habitaciones especiales de memoria
    if (roomId.startsWith('mem')) return 'url(#gradient-memory)';
    
    // Habitaciones de cuidados especiales
    if (roomId.startsWith('spec')) return 'url(#gradient-special)';
    
    // Áreas comunes
    if (roomId === 'commonRoom' || roomId === 'livingRoom2') return 'url(#gradient-common)';
    if (roomId.includes('kitchen')) return 'url(#gradient-kitchen)';
    if (roomId.includes('dining')) return 'url(#gradient-dining)';
    if (roomId.includes('bath')) return 'url(#gradient-bath)';
    if (roomId === 'laundry') return 'url(#gradient-laundry)';
    if (roomId === 'reception') return 'url(#gradient-reception)';
    if (roomId.includes('office') || roomId.includes('admin')) return 'url(#gradient-office)';
    if (roomId.includes('gym') || roomId === 'therapyRoom' || roomId === 'physiotherapy') return 'url(#gradient-gym)';
    if (roomId.includes('multiroom') || roomId.includes('activity')) return 'url(#gradient-multiroom)';
    if (roomId.includes('garden') && !roomId.includes('secure')) return 'url(#gradient-garden)';
    if (roomId.includes('secureGarden')) return 'url(#gradient-secure-garden)';
    if (roomId.includes('nurse')) return 'url(#gradient-nurse)';
    if (roomId.includes('medical') || roomId.includes('medication')) return 'url(#gradient-medical)';
    if (roomId.includes('sensory')) return 'url(#gradient-sensory)';
    if (roomId.includes('monitor')) return 'url(#gradient-monitor)';
    if (roomId.includes('staffNight')) return 'url(#gradient-staff-night)';
    if (roomId.includes('family')) return 'url(#gradient-family-room)';
    if (roomId.includes('isolation')) return 'url(#gradient-isolation)';
    if (roomId.includes('library')) return 'url(#gradient-library)';
    if (roomId.includes('staffRoom')) return 'url(#gradient-staff-room)';
    
    // Almacenes y suministros
    if (roomId === 'storage' || roomId === 'storageMain' || roomId.includes('seasonal') || 
        roomId === 'controlDesk' || roomId === 'uniformStorage') return 'url(#gradient-storage)';
    if (roomId.includes('shelf') || roomId.includes('archive') || 
        roomId === 'receivingArea' || roomId === 'loadingDock') return 'url(#gradient-storage)';
    if (roomId === 'coldStorage') return 'url(#gradient-bath)';
    if (roomId === 'medicalEquip' || roomId === 'emergencySupplies') return 'url(#gradient-medical)';
    if (roomId === 'mobilityEquip' || roomId === 'furnitureStore') return 'url(#gradient-common)';
    if (roomId === 'backupGenerator' || roomId === 'techStorage' || 
        roomId === 'maintenanceTools') return 'url(#gradient-staff-room)';
    if (roomId === 'hazardousMaterials') return 'url(#gradient-isolation)';
    
    return '#ffffff';
  }

  getRoomStroke(roomId: string): string {
    // Habitaciones regulares
    if (roomId.startsWith('room')) return '#fb923c';
    
    // Habitaciones especiales
    if (roomId.startsWith('mem')) return '#3b82f6'; // Azul para habitaciones de unidad de memoria
    if (roomId.startsWith('spec')) return '#eab308'; // Amarillo para habitaciones de cuidados especiales
    
    // Áreas comunes
    if (roomId === 'commonRoom' || roomId === 'livingRoom2') return '#a855f7'; // Púrpura para salas comunes
    if (roomId.includes('kitchen')) return '#0ea5e9'; // Azul claro para cocinas
    if (roomId.includes('dining')) return '#10b981'; // Verde para comedores
    
    // Instalaciones
    if (roomId.includes('bath')) return '#0284c7'; // Azul para baños
    if (roomId === 'laundry') return '#f59e0b'; // Naranja para lavandería
    if (roomId === 'reception') return '#ec4899'; // Rosa para recepción
    if (roomId.includes('office') || roomId.includes('admin')) return '#0369a1'; // Azul oscuro para oficinas
    if (roomId === 'gym' || roomId === 'physiotherapy') return '#d97706'; // Naranja oscuro para áreas de ejercicio
    if (roomId.includes('garden')) return '#10b981'; // Verde para jardines
    if (roomId.includes('multiroom') || roomId.includes('activity')) return '#7c3aed'; // Violeta para salas multiusos
    
    // Áreas médicas y de cuidados
    if (roomId.includes('nurse')) return '#ef4444'; // Rojo para estaciones de enfermería
    if (roomId.includes('medical') || roomId.includes('medication')) return '#22c55e'; // Verde para áreas médicas
    if (roomId.includes('sensory')) return '#8b5cf6'; // Púrpura para salas sensoriales
    if (roomId.includes('monitor')) return '#f472b6'; // Rosa para monitoreo
    if (roomId.includes('therapy')) return '#06b6d4'; // Turquesa para terapia
    
    // Otras áreas
    if (roomId.includes('family')) return '#c026d3'; // Morado para salas familiares
    if (roomId.includes('library')) return '#6366f1'; // Índigo para biblioteca
    if (roomId.includes('staffRoom')) return '#64748b'; // Gris azulado para áreas de personal
    if (roomId.includes('staffNight')) return '#6366f1'; // Índigo para personal nocturno
    if (roomId.includes('isolation')) return '#b91c1c'; // Rojo oscuro para aislamiento
    
    // Almacenes generales
    if (roomId === 'storageMain') return '#78716c'; // Gris para almacén central
    if (roomId === 'storage') return '#78716c'; // Gris para almacenamiento general
    if (roomId === 'controlDesk') return '#64748b'; // Gris azulado para control
    
    // Almacenes de suministros médicos
    if (roomId === 'shelfMedical') return '#3b82f6'; // Azul para suministros médicos
    if (roomId === 'coldStorage') return '#0ea5e9'; // Azul claro para almacén frío
    if (roomId === 'medicalEquip') return '#2563eb'; // Azul real para equipo médico
    if (roomId === 'emergencySupplies') return '#dc2626'; // Rojo para suministros de emergencia
    
    // Almacenes de limpieza e higiene
    if (roomId === 'shelfHygiene') return '#10b981'; // Verde para productos de higiene
    if (roomId === 'shelfCleaning') return '#14b8a6'; // Verde azulado para productos de limpieza
    
    // Almacenes de ropa y textiles
    if (roomId === 'shelfBedding') return '#8b5cf6'; // Púrpura para ropa de cama
    if (roomId === 'uniformStorage') return '#a855f7'; // Púrpura para uniformes
    
    // Archivos y documentación
    if (roomId.includes('archive')) return '#f59e0b'; // Naranja para archivos
    if (roomId === 'seasonalStorage') return '#eab308'; // Amarillo para almacén estacional
    
    // Mobiliario y equipo
    if (roomId === 'mobilityEquip') return '#d97706'; // Naranja oscuro para equipo de movilidad
    if (roomId === 'furnitureStore') return '#ea580c'; // Naranja rojizo para mobiliario
    
    // Áreas técnicas
    if (roomId === 'backupGenerator') return '#334155'; // Gris azulado oscuro para generadores
    if (roomId === 'techStorage') return '#1e40af'; // Azul oscuro para almacén tech
    if (roomId === 'maintenanceTools') return '#475569'; // Gris para herramientas
    
    // Áreas especiales
    if (roomId === 'loadingDock') return '#64748b'; // Gris azulado para muelle
    if (roomId === 'receivingArea') return '#64748b'; // Gris azulado para área de recepción
    if (roomId === 'hazardousMaterials') return '#b91c1c'; // Rojo oscuro para materiales peligrosos
    
    return '#94a3b8'; // Color por defecto
  }

  getRoomIcon(roomId: string): string {
    // Habitaciones
    if (roomId.startsWith('room') || roomId.startsWith('h')) return "fa-solid fa-bed";
    if (roomId.startsWith('mem')) return "fa-solid fa-brain";
    if (roomId.startsWith('spec')) return "fa-solid fa-kit-medical";
    
    // Áreas comunes
    if (roomId === 'commonRoom' || roomId === 'livingRoom2') return "fa-solid fa-couch";
    if (roomId.includes('kitchen')) return "fa-solid fa-utensils";
    if (roomId.includes('dining')) return "fa-solid fa-plate-wheat";
    if (roomId.includes('bath')) return "fa-solid fa-shower";
    if (roomId === 'laundry') return "fa-solid fa-shirt";
    if (roomId === 'gym' || roomId === 'physiotherapy') return "fa-solid fa-dumbbell";
    if (roomId.includes('office') || roomId.includes('admin')) return "fa-solid fa-briefcase";
    if (roomId === 'reception') return "fa-solid fa-bell-concierge";
    if (roomId.includes('multiroom') || roomId.includes('activity')) return "fa-solid fa-users";
    if (roomId.includes('garden')) return "fa-solid fa-tree";
    
    // Áreas médicas
    if (roomId.includes('nurse')) return "fa-solid fa-user-nurse";
    if (roomId.includes('medical') || roomId.includes('medication')) return "fa-solid fa-pills";
    if (roomId.includes('sensory')) return "fa-solid fa-brain";
    if (roomId.includes('monitor')) return "fa-solid fa-heart-pulse";
    if (roomId.includes('therapy')) return "fa-solid fa-hand-holding-medical";
    
    // Áreas específicas
    if (roomId.includes('family')) return "fa-solid fa-people-group";
    if (roomId.includes('library')) return "fa-solid fa-book";
    if (roomId.includes('staffRoom')) return "fa-solid fa-mug-hot";
    if (roomId.includes('staffNight')) return "fa-solid fa-moon";
    if (roomId.includes('isolation')) return "fa-solid fa-house-medical-circle-exclamation";
    if (roomId === 'secureGarden') return "fa-solid fa-tree-city";
    
    // Almacenes generales
    if (roomId === 'storageMain') return "fa-solid fa-warehouse";
    if (roomId === 'storage') return "fa-solid fa-box";
    if (roomId === 'controlDesk') return "fa-solid fa-clipboard-check";
    
    // Almacenes de suministros médicos
    if (roomId === 'shelfMedical') return "fa-solid fa-prescription-bottle-medical";
    if (roomId === 'coldStorage') return "fa-solid fa-temperature-low";
    if (roomId === 'medicalEquip') return "fa-solid fa-stethoscope";
    if (roomId === 'emergencySupplies') return "fa-solid fa-truck-medical";
    
    // Almacenes de limpieza e higiene
    if (roomId === 'shelfHygiene') return "fa-solid fa-pump-soap";
    if (roomId === 'shelfCleaning') return "fa-solid fa-spray-can-sparkles";
    
    // Almacenes de ropa y textiles
    if (roomId === 'shelfBedding') return "fa-solid fa-bed-pulse";
    if (roomId === 'uniformStorage') return "fa-solid fa-shirt";
    
    // Archivos y documentación
    if (roomId.includes('archive')) return "fa-solid fa-folder-open";
    if (roomId === 'seasonalStorage') return "fa-solid fa-boxes-stacked";
    
    // Mobiliario y equipo
    if (roomId === 'mobilityEquip') return "fa-solid fa-wheelchair";
    if (roomId === 'furnitureStore') return "fa-solid fa-chair";
    
    // Áreas técnicas
    if (roomId === 'backupGenerator') return "fa-solid fa-bolt";
    if (roomId === 'techStorage') return "fa-solid fa-laptop";
    if (roomId === 'maintenanceTools') return "fa-solid fa-screwdriver-wrench";
    
    // Áreas especiales
    if (roomId === 'loadingDock') return "fa-solid fa-truck-loading";
    if (roomId === 'receivingArea') return "fa-solid fa-dolly";
    if (roomId === 'hazardousMaterials') return "fa-solid fa-skull-crossbones";
    
    return "fa-solid fa-box"; 
  }


  openDetailsModal(room: Room): void {  
    // console.log('Room details:', room);
    this.modalService.open(room);
  }
}