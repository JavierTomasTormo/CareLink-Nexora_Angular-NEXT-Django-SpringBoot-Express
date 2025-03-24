import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Room } from '../../../../core/models/rooms/rooms.model';
import { trigger, transition, style, animate } from '@angular/animations';
import { ModalService } from '../../../../core/services/rooms/modal.service';


enum RoomCategory {
  RESIDENTIAL = 'residential',      
  SPECIAL_CARE = 'special_care',    
  MEMORY_CARE = 'memory_care',     
  COMMON_AREA = 'common_area',       
  HEALTHCARE = 'healthcare',       
  ADMINISTRATIVE = 'administrative', 
  STORAGE = 'storage',              
  TECHNICAL = 'technical',           
  AMENITIES = 'amenities',
  BATHROOM = 'bathroom',
  MEDICAMENTS = 'medicaments',
  THERAPY = 'therapy',
  MONITORING = 'monitoring'
}

@Component({
  selector: 'app-map-svg',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map-svg.component.html',
  styleUrls: ['./map-svg.component.css'],
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

  private readonly ROOM_CATEGORIES: Record<string, RoomCategory> = {
    // Habitaciones residenciales estándar
    room: RoomCategory.RESIDENTIAL,
    h: RoomCategory.RESIDENTIAL,
    
    // Cuidados especiales
    spec: RoomCategory.SPECIAL_CARE,
    isolation: RoomCategory.SPECIAL_CARE,
    
    // Unidades de memoria
    mem: RoomCategory.MEMORY_CARE,
    sensory: RoomCategory.MEMORY_CARE,
    
    // Áreas comunes
    commonRoom: RoomCategory.COMMON_AREA,
    livingRoom2: RoomCategory.COMMON_AREA,
    dining: RoomCategory.COMMON_AREA,
    family: RoomCategory.COMMON_AREA,
    library: RoomCategory.AMENITIES,
    
    // Instalaciones de cocina
    kitchen: RoomCategory.COMMON_AREA,
    
    // Áreas sanitarias
    bath: RoomCategory.BATHROOM,
    laundry: RoomCategory.COMMON_AREA,
    
    // Áreas de atención médica
    nurse: RoomCategory.HEALTHCARE,
    medical: RoomCategory.HEALTHCARE,
    medication: RoomCategory.MEDICAMENTS,
    monitor: RoomCategory.MONITORING,
    therapy: RoomCategory.THERAPY,
    physiotherapy: RoomCategory.THERAPY,
    
    // Áreas administrativas
    office: RoomCategory.ADMINISTRATIVE,
    admin: RoomCategory.ADMINISTRATIVE,
    reception: RoomCategory.ADMINISTRATIVE,
    staffRoom: RoomCategory.ADMINISTRATIVE,
    staffNight: RoomCategory.ADMINISTRATIVE,
    controlDesk: RoomCategory.ADMINISTRATIVE,
    
    // Áreas de almacenamiento
    storage: RoomCategory.STORAGE,
    storageMain: RoomCategory.STORAGE,
    shelf: RoomCategory.STORAGE,
    archive: RoomCategory.STORAGE,
    coldStorage: RoomCategory.STORAGE,
    seasonal: RoomCategory.STORAGE,
    uniformStorage: RoomCategory.STORAGE,
    receivingArea: RoomCategory.STORAGE,
    loadingDock: RoomCategory.STORAGE,
    
    // Almacenamiento médico
    medicalEquip: RoomCategory.STORAGE,
    emergencySupplies: RoomCategory.STORAGE,
    shelfMedical: RoomCategory.STORAGE,
    
    // Equipamiento y mantenimiento
    mobilityEquip: RoomCategory.STORAGE,
    furnitureStore: RoomCategory.STORAGE,
    techStorage: RoomCategory.TECHNICAL,
    maintenanceTools: RoomCategory.TECHNICAL,
    backupGenerator: RoomCategory.TECHNICAL,
    hazardousMaterials: RoomCategory.STORAGE,
    
    // Instalaciones y comodidades
    multiroom: RoomCategory.AMENITIES,
    activity: RoomCategory.AMENITIES,
    gym: RoomCategory.AMENITIES,
    garden: RoomCategory.AMENITIES,
    secureGarden: RoomCategory.AMENITIES,
    
    // Productos de limpieza e higiene
    shelfHygiene: RoomCategory.STORAGE,
    shelfCleaning: RoomCategory.STORAGE,
    shelfBedding: RoomCategory.STORAGE
  };

  private readonly CATEGORY_GRADIENTS: Record<RoomCategory, string> = {
    [RoomCategory.RESIDENTIAL]: 'url(#gradient-room)',
    [RoomCategory.SPECIAL_CARE]: 'url(#gradient-special)',
    [RoomCategory.MEMORY_CARE]: 'url(#gradient-memory)',
    [RoomCategory.COMMON_AREA]: 'url(#gradient-common)',
    [RoomCategory.HEALTHCARE]: 'url(#gradient-medical)',
    [RoomCategory.ADMINISTRATIVE]: 'url(#gradient-office)',
    [RoomCategory.STORAGE]: 'url(#gradient-storage)',
    [RoomCategory.TECHNICAL]: 'url(#gradient-staff-room)',
    [RoomCategory.AMENITIES]: 'url(#gradient-multiroom)',
    [RoomCategory.BATHROOM]: 'url(#gradient-bath)',
    [RoomCategory.MEDICAMENTS]: 'url(#gradient-medical)',
    [RoomCategory.THERAPY]: 'url(#gradient-special)',
    [RoomCategory.MONITORING]: 'url(#gradient-monitor)'
  };

  private readonly CUSTOM_GRADIENTS: Record<string, string> = {
    kitchen: 'url(#gradient-kitchen)',
    dining: 'url(#gradient-dining)',
    bath: 'url(#gradient-bath)',
    laundry: 'url(#gradient-laundry)',
    reception: 'url(#gradient-reception)',
    nurse: 'url(#gradient-nurse)',
    sensory: 'url(#gradient-sensory)',
    monitor: 'url(#gradient-monitor)',
    staffNight: 'url(#gradient-staff-night)',
    family: 'url(#gradient-family-room)',
    isolation: 'url(#gradient-isolation)',
    library: 'url(#gradient-library)',
    coldStorage: 'url(#gradient-bath)',
    hazardousMaterials: 'url(#gradient-isolation)',
    garden: 'url(#gradient-garden)',
    secureGarden: 'url(#gradient-secure-garden)'
  };

  private readonly CATEGORY_STROKES: Record<RoomCategory, string> = {
    [RoomCategory.RESIDENTIAL]: '#fb923c',     
    [RoomCategory.SPECIAL_CARE]: '#eab308',    
    [RoomCategory.MEMORY_CARE]: '#3b82f6',     
    [RoomCategory.COMMON_AREA]: '#a855f7',     
    [RoomCategory.HEALTHCARE]: '#ef4444',      
    [RoomCategory.ADMINISTRATIVE]: '#0369a1',  
    [RoomCategory.STORAGE]: '#78716c',         
    [RoomCategory.TECHNICAL]: '#334155',     
    [RoomCategory.AMENITIES]: '#10b981',
    [RoomCategory.BATHROOM]: '#0284c7',
    [RoomCategory.MEDICAMENTS]: '#22c55e',
    [RoomCategory.THERAPY]: '#06b6d4',
    [RoomCategory.MONITORING]: '#f472b6'
  };

  private readonly CUSTOM_STROKES: Record<string, string> = {
    kitchen: '#0ea5e9',               
    dining: '#10b981',                
    bath: '#0284c7',                  
    laundry: '#f59e0b',               
    reception: '#ec4899',             
    gym: '#d97706',                   
    physiotherapy: '#d97706',         
    nurse: '#ef4444',                 
    medical: '#22c55e',                
    medication: '#22c55e',            
    sensory: '#8b5cf6',               
    monitor: '#f472b6',               
    therapy: '#06b6d4',               
    family: '#c026d3',                 
    library: '#6366f1',               
    staffRoom: '#64748b',              
    staffNight: '#6366f1',             
    isolation: '#b91c1c',
    hazardousMaterials: '#b91c1c',    
    shelfMedical: '#3b82f6',
    coldStorage: '#0ea5e9',           
    medicalEquip: '#2563eb',          
    emergencySupplies: '#dc2626',     
    shelfHygiene: '#10b981',          
    shelfCleaning: '#14b8a6',
    shelfBedding: '#8b5cf6',          
    uniformStorage: '#a855f7',        
    archive: '#f59e0b',               
    seasonalStorage: '#eab308',
    mobilityEquip: '#d97706',
    furnitureStore: '#ea580c',
    backupGenerator: '#334155',       
    techStorage: '#1e40af',           
    maintenanceTools: '#475569'       
  };

  private readonly CATEGORY_ICONS: Record<RoomCategory, string> = {
    [RoomCategory.RESIDENTIAL]: 'fa-solid fa-bed',
    [RoomCategory.SPECIAL_CARE]: 'fa-solid fa-kit-medical',
    [RoomCategory.MEMORY_CARE]: 'fa-solid fa-brain',
    [RoomCategory.COMMON_AREA]: 'fa-solid fa-couch',
    [RoomCategory.HEALTHCARE]: 'fa-solid fa-user-nurse',
    [RoomCategory.ADMINISTRATIVE]: 'fa-solid fa-briefcase',
    [RoomCategory.STORAGE]: 'fa-solid fa-box',
    [RoomCategory.TECHNICAL]: 'fa-solid fa-screwdriver-wrench',
    [RoomCategory.AMENITIES]: 'fa-solid fa-users',
    [RoomCategory.BATHROOM]: 'fa-solid fa-shower',
    [RoomCategory.MEDICAMENTS]: 'fa-solid fa-pills',
    [RoomCategory.THERAPY]: 'fa-solid fa-hand-holding-medical',
    [RoomCategory.MONITORING]: 'fa-solid fa-heart-pulse'
  };

  private readonly CUSTOM_ICONS: Record<string, string> = {
    kitchen: 'fa-solid fa-utensils',
    dining: 'fa-solid fa-plate-wheat',
    bath: 'fa-solid fa-shower',
    laundry: 'fa-solid fa-shirt',
    gym: 'fa-solid fa-dumbbell',
    physiotherapy: 'fa-solid fa-dumbbell',
    office: 'fa-solid fa-briefcase',
    admin: 'fa-solid fa-briefcase',
    reception: 'fa-solid fa-bell-concierge',
    multiroom: 'fa-solid fa-users',
    activity: 'fa-solid fa-users',
    garden: 'fa-solid fa-tree',
    secureGarden: 'fa-solid fa-tree-city',
    medical: 'fa-solid fa-pills',
    medication: 'fa-solid fa-pills',
    monitor: 'fa-solid fa-heart-pulse',
    therapy: 'fa-solid fa-hand-holding-medical',
    family: 'fa-solid fa-people-group',
    library: 'fa-solid fa-book',
    staffRoom: 'fa-solid fa-mug-hot',
    staffNight: 'fa-solid fa-moon',
    isolation: 'fa-solid fa-house-medical-circle-exclamation',
    storageMain: 'fa-solid fa-warehouse',
    controlDesk: 'fa-solid fa-clipboard-check',
    shelfMedical: 'fa-solid fa-prescription-bottle-medical',
    coldStorage: 'fa-solid fa-temperature-low',
    medicalEquip: 'fa-solid fa-stethoscope',
    emergencySupplies: 'fa-solid fa-truck-medical',
    shelfHygiene: 'fa-solid fa-pump-soap',
    shelfCleaning: 'fa-solid fa-spray-can-sparkles',
    shelfBedding: 'fa-solid fa-bed-pulse',
    uniformStorage: 'fa-solid fa-shirt',
    archive: 'fa-solid fa-folder-open',
    seasonalStorage: 'fa-solid fa-boxes-stacked',
    mobilityEquip: 'fa-solid fa-wheelchair',
    furnitureStore: 'fa-solid fa-chair',
    backupGenerator: 'fa-solid fa-bolt',
    techStorage: 'fa-solid fa-laptop',
    maintenanceTools: 'fa-solid fa-screwdriver-wrench',
    loadingDock: 'fa-solid fa-truck-loading',
    receivingArea: 'fa-solid fa-dolly',
    hazardousMaterials: 'fa-solid fa-skull-crossbones'
  };

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
    
    this.scale = Math.max(0.5, Math.min(this.scale, 3));
    
    if (this.scale !== oldScale) {
      const scaleFactor = this.scale / oldScale;
      this.translateX = x - (x - this.translateX) * scaleFactor;
      this.translateY = y - (y - this.translateY) * scaleFactor;
      
      const maxTranslateX = 500; 
      const maxTranslateY = 300; 
      this.translateX = Math.max(-maxTranslateX, Math.min(this.translateX, maxTranslateX));
      this.translateY = Math.max(-maxTranslateY, Math.min(this.translateY, maxTranslateY));
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

  getRoomFill(roomId: string): string {
    if (this.CUSTOM_GRADIENTS[roomId]) {
      return this.CUSTOM_GRADIENTS[roomId];
    }
    
    const category = this.getRoomCategory(roomId);
    return category ? this.CATEGORY_GRADIENTS[category] : '#ffffff';
  }


getRoomStroke(roomId: string): string {
  if (this.CUSTOM_STROKES[roomId]) {
    return this.CUSTOM_STROKES[roomId];
  }
  
  const category = this.getRoomCategory(roomId);
  return category ? this.CATEGORY_STROKES[category] : '#94a3b8';
}

getRoomIcon(roomId: string): string {
  if (this.CUSTOM_ICONS[roomId]) {
    return this.CUSTOM_ICONS[roomId];
  }
  
  const category = this.getRoomCategory(roomId);
  return category ? this.CATEGORY_ICONS[category] : 'fa-solid fa-box';
}


private getRoomCategory(roomId: string): RoomCategory | undefined {
  if (this.ROOM_CATEGORIES[roomId]) {
    return this.ROOM_CATEGORIES[roomId];
  }
  
  for (const key of Object.keys(this.ROOM_CATEGORIES)) {
    if (roomId.startsWith(key)) {
      return this.ROOM_CATEGORIES[key];
    }
  }
  
  for (const key of Object.keys(this.ROOM_CATEGORIES)) {
    if (roomId.includes(key)) {
      return this.ROOM_CATEGORIES[key];
    }
  }
  
  return undefined;
}

  openDetailsModal(room: Room): void {  
    // console.log('Room details:', room);
    this.modalService.open(room);
  }
}