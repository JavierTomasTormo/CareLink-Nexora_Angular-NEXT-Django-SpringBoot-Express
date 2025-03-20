import { Component, ElementRef, NO_ERRORS_SCHEMA, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MapService } from '../../../../core/services/rooms/map.service';
import { Room } from '../../../../core/models/rooms/rooms.model';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rooms-interface',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rooms-interface.component.html',
  styleUrls: ['./rooms-interface.component.scss'],
  schemas: [NO_ERRORS_SCHEMA]
})
export class RoomsInterfaceComponent implements OnInit, OnDestroy {
  @ViewChild('mapSvg', { static: true }) mapSvg!: ElementRef<SVGElement>;
  
  rooms: Room[] = [];
  selectedRoom: Room | null = null;

  showDetailsModal = false;
  modalRoom: Room | null = null;
  
  floors: {id: number, name: string}[] = [];
  currentFloor: number = 1;

  scale: number = 1;
  translateX: number = 0;
  translateY: number = 0;
  isDragging: boolean = false;
  startX: number = 0;
  startY: number = 0;
  
  private subscription: Subscription = new Subscription();

  constructor(private mapService: MapService) { }


  ngOnInit(): void {
    this.floors = this.mapService.getFloors();
    
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
          this.centerViewOnRoom(room);
        }
      })
    );
    
    this.initializeZoomEvents();
  }

  changeFloor(floor: number): void {
    if (this.currentFloor !== floor) {
      this.mapService.selectFloor(floor);
    }
  }
  
    openDetailsModal(room: Room): void {
      this.modalRoom = room;
      this.showDetailsModal = true;
    }

    closeDetailsModal(): void {
      this.showDetailsModal = false;
    }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

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
    if (roomId.includes('storage')) return 'url(#gradient-storage)';
    
    return '#ffffff';
  }


  getRoomCoords(room: any): any {
  // Simplemente devolvemos las coordenadas ya ajustadas
  return {
    x: room.x,
    y: room.y,
    width: room.width,
    height: room.height
  };
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
    
    // Nuevas áreas específicas
    if (roomId.includes('family')) return "fa-solid fa-people-group";
    if (roomId.includes('library')) return "fa-solid fa-book";
    if (roomId.includes('storage')) return "fa-solid fa-box";
    if (roomId.includes('staffRoom')) return "fa-solid fa-mug-hot";
    if (roomId.includes('staffNight')) return "fa-solid fa-moon";
    if (roomId.includes('isolation')) return "fa-solid fa-house-medical-circle-exclamation";
    if (roomId === 'secureGarden') return "fa-solid fa-tree-city";
    
    return "fa-solid fa-bed"; // Ícono por defecto
  }

  
  getRoomCenter(room: Room): {x: number, y: number} {
    const coords = this.getRoomCoords(room);
    return {
      x: coords.x + coords.width / 2,
      y: coords.y + coords.height / 2
    };
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
    if (roomId.includes('storage')) return '#78716c'; // Gris para almacenamiento
    if (roomId.includes('staff')) return '#64748b'; // Gris azulado para áreas de personal
    if (roomId.includes('isolation')) return '#b91c1c'; // Rojo oscuro para aislamiento
    
    // Color por defecto para otras estancias
    return '#94a3b8';
  }

  onRoomClick(roomId: string, event: MouseEvent): void {
    event.preventDefault(); 
    event.stopPropagation(); 
    console.log('Clicked on room:', roomId); 
    this.mapService.selectRoom(roomId);
  }

  onMapBackgroundClick(): void {
    this.mapService.clearSelection();
  }

  getPolygonCenter(points: string): {x: number, y: number} {
    const coordinates = points.split(' ').map(point => {
      const [x, y] = point.split(',').map(Number);
      return {x, y};
    });
    
    const sumX = coordinates.reduce((sum, coord) => sum + coord.x, 0);
    const sumY = coordinates.reduce((sum, coord) => sum + coord.y, 0);
    
    return {
      x: sumX / coordinates.length,
      y: sumY / coordinates.length
    };
  }

  private initializeZoomEvents(): void {
    if (this.mapSvg && this.mapSvg.nativeElement) {
      this.mapSvg.nativeElement.addEventListener('wheel', (event: WheelEvent) => {
        event.preventDefault();
        const scaleFactor = event.deltaY > 0 ? 0.9 : 1.1;
        this.zoom(scaleFactor, event.offsetX, event.offsetY);
      });
      
      this.mapSvg.nativeElement.addEventListener('mousedown', (event: MouseEvent) => {
        if (event.target === this.mapSvg.nativeElement || 
            (event.target as Element).tagName === 'rect') {
          this.startDrag(event);
        }
      });
      
      window.addEventListener('mousemove', (event: MouseEvent) => {
        this.drag(event);
      });
      
      window.addEventListener('mouseup', () => {
        this.endDrag();
      });
    }
  }

  private startDrag(event: MouseEvent): void {
    this.isDragging = true;
    this.startX = event.clientX;
    this.startY = event.clientY;
  }

  private drag(event: MouseEvent): void {
    if (this.isDragging) {
      const dx = event.clientX - this.startX;
      const dy = event.clientY - this.startY;
      
      this.translateX += dx;
      this.translateY += dy;
      
      this.startX = event.clientX;
      this.startY = event.clientY;
      
      this.updateMapTransform();
    }
  }

  private endDrag(): void {
    this.isDragging = false;
  }

  public zoom(factor: number, x: number, y: number): void {
    const newScale = Math.max(0.5, Math.min(5, this.scale * factor));
    
    if (this.scale !== newScale) {
      const svgElement = this.mapSvg.nativeElement;
      const bbox = svgElement.getBoundingClientRect();
      const mouseX = x - bbox.left;
      const mouseY = y - bbox.top;
      
      this.translateX = mouseX - (mouseX - this.translateX) * (newScale / this.scale);
      this.translateY = mouseY - (mouseY - this.translateY) * (newScale / this.scale);
      
      this.scale = newScale;
      this.updateMapTransform();
    }
  }

  private updateMapTransform(): void {
    if (this.mapSvg && this.mapSvg.nativeElement) {
      const svgG = this.mapSvg.nativeElement.querySelector('g.map-content');
      if (svgG) {
        svgG.setAttribute('transform', `translate(${this.translateX}, ${this.translateY}) scale(${this.scale})`);
      }
    }
  }

  private centerViewOnRoom(room: Room): void {
    if (!this.mapSvg) return;
    
    const center = this.getRoomCenter(room);
    
    const svgElement = this.mapSvg.nativeElement;
    const bbox = svgElement.getBoundingClientRect();
    
    this.translateX = bbox.width / 2 - center.x * this.scale;
    this.translateY = bbox.height / 2 - center.y * this.scale;
    
    this.updateMapTransform();
  }

  resetView(): void {
    this.scale = 1;
    this.translateX = 0;
    this.translateY = 0;
    this.updateMapTransform();
  }
}