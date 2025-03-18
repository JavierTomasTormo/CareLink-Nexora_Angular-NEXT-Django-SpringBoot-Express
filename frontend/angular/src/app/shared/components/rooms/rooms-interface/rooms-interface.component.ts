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

    // Agrega estas dos propiedades nuevas
    showDetailsModal = false;
    modalRoom: Room | null = null;
  
  // Variables para zoom y pan
  scale: number = 1;
  translateX: number = 0;
  translateY: number = 0;
  isDragging: boolean = false;
  startX: number = 0;
  startY: number = 0;
  
  private subscription: Subscription = new Subscription();

  constructor(private mapService: MapService) { }

  ngOnInit(): void {
    const roomsConfig = [
      // Fila superior
      { id: 'h101', name: 'H101', x: 60, y: 60, width: 120, height: 100, description: 'Habitación individual con baño privado' },
      { id: 'h102', name: 'H102', x: 180, y: 60, width: 120, height: 100, description: 'Habitación doble con vista al jardín' },
      { id: 'bathNorth', name: 'Baños Norte', x: 300, y: 60, width: 120, height: 100, description: 'Baños compartidos para las habitaciones del norte' },
      { id: 'h103', name: 'H103', x: 420, y: 60, width: 120, height: 100, description: 'Habitación individual con escritorio' },
      { id: 'commonRoom', name: 'Sala Común', x: 540, y: 60, width: 180, height: 100, description: 'Sala común con TV, sofás y zona de juegos' },
      { id: 'h104', name: 'H104', x: 720, y: 60, width: 110, height: 100, description: 'Habitación individual estándar' },
      { id: 'h105', name: 'H105', x: 830, y: 60, width: 110, height: 100, description: 'Habitación individual estándar' },
      
      // Zona central
      { id: 'dining', name: 'Comedor', x: 550, y: 190, width: 200, height: 120, description: 'Comedor comunitario con mesas para 30 personas' },
      { id: 'kitchen', name: 'Cocina', x: 750, y: 190, width: 190, height: 120, description: 'Cocina compartida con 4 hornos y equipamiento profesional' },
      
      // Fila inferior
      { id: 'h201', name: 'H201', x: 60, y: 340, width: 120, height: 100, description: 'Habitación individual estándar' },
      { id: 'h202', name: 'H202', x: 180, y: 340, width: 120, height: 100, description: 'Habitación doble con balcón' },
      { id: 'laundry', name: 'Lavandería', x: 300, y: 340, width: 120, height: 100, description: 'Sala de lavandería con 6 lavadoras y 4 secadoras' },
      { id: 'h203', name: 'H203', x: 420, y: 340, width: 120, height: 100, description: 'Habitación individual con armario amplio' },
      { id: 'bathSouth', name: 'Baños Sur', x: 540, y: 340, width: 120, height: 100, description: 'Baños compartidos para las habitaciones del sur' },
      { id: 'h204', name: 'H204', x: 660, y: 340, width: 120, height: 100, description: 'Habitación doble para estudiantes' },
      { id: 'h205', name: 'H205', x: 780, y: 340, width: 160, height: 100, description: 'Habitación individual premium con nevera' }
    ];
  
    // Genera las habitaciones dinámicamente
    this.mapService.generateRoomsFromLayout({ rooms: roomsConfig });
    
    // Obtiene las habitaciones generadas
    this.rooms = this.mapService.getRooms();
    
    // Continúa con la suscripción al observable de habitación seleccionada
    this.subscription.add(
      this.mapService.selectedRoom$.subscribe(room => {
        console.log('Room selected in component:', room);
        this.selectedRoom = room;
        if (room) {
          this.centerViewOnRoom(room);
        }
      })
    );
    
    // Inicializar eventos para zoom
    this.initializeZoomEvents();
  }
  

  
  // Añade este nuevo método para abrir el modal
    openDetailsModal(room: Room): void {
      this.modalRoom = room;
      this.showDetailsModal = true;
    }

    // Y este método para cerrar el modal
    closeDetailsModal(): void {
      this.showDetailsModal = false;
    }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  // Añade estos métodos a tu clase:

  getRoomFill(roomId: string): string {
    if (roomId.startsWith('room')) return 'url(#gradient-room)';
    if (roomId === 'commonRoom') return 'url(#gradient-common)';
    if (roomId === 'kitchen') return 'url(#gradient-kitchen)';
    if (roomId === 'dining') return 'url(#gradient-dining)';
    if (roomId.includes('bath')) return 'url(#gradient-bath)';
    if (roomId === 'laundry') return 'url(#gradient-laundry)';
    return '#ffffff';
  }

  getRoomCoords(room: Room): {x: number, y: number, width: number, height: number} {
    // Para habitaciones rectangulares creadas con coordenadas x,y,width,height
    if (room.x !== undefined && room.y !== undefined && 
        room.width !== undefined && room.height !== undefined) {
      return {
        x: room.x,
        y: room.y,
        width: room.width,
        height: room.height
      };
    }
    
    // Para habitaciones definidas con polígonos
    if (room.polygonPoints) {
      // Calcular el rectángulo contenedor del polígono
      const points = room.polygonPoints.split(' ').map(point => {
        const [x, y] = point.split(',').map(Number);
        return { x, y };
      });
      
      const xs = points.map(p => p.x);
      const ys = points.map(p => p.y);
      
      const minX = Math.min(...xs);
      const minY = Math.min(...ys);
      const maxX = Math.max(...xs);
      const maxY = Math.max(...ys);
      
      return {
        x: minX,
        y: minY,
        width: maxX - minX,
        height: maxY - minY
      };
    }
    
    // Valores por defecto
    return { x: 0, y: 0, width: 0, height: 0 };
  }


  getRoomIcon(roomId: string): string {
    if (roomId.startsWith('h') && !isNaN(parseInt(roomId.slice(1)))) return "#icon-bed";
    if (roomId === 'commonRoom') return "#icon-couch";
    if (roomId === 'kitchen') return "#icon-utensils";
    if (roomId === 'dining') return "#icon-utensils";
    if (roomId.includes('bath')) return "#icon-shower";
    if (roomId === 'laundry') return "#icon-wash";
    return "#icon-bed"; // Icono por defecto
  }

  
  getRoomCenter(room: Room): {x: number, y: number} {
    const coords = this.getRoomCoords(room);
    return {
      x: coords.x + coords.width / 2,
      y: coords.y + coords.height / 2
    };
  }

  getRoomStroke(roomId: string): string {
    if (roomId.startsWith('room')) return '#fb923c';
    if (roomId === 'commonRoom') return '#a855f7';
    if (roomId === 'kitchen') return '#0ea5e9';
    if (roomId === 'dining') return '#10b981';
    if (roomId.includes('bath')) return '#0284c7';
    if (roomId === 'laundry') return '#f59e0b';
    return '#94a3b8';
  }

  onRoomClick(roomId: string, event: MouseEvent): void {
    event.preventDefault(); // Prevenir comportamiento por defecto
    event.stopPropagation(); // Prevenir propagación
    console.log('Clicked on room:', roomId); // Para debug
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
    // Evento de zoom con rueda del mouse
    if (this.mapSvg && this.mapSvg.nativeElement) {
      this.mapSvg.nativeElement.addEventListener('wheel', (event: WheelEvent) => {
        event.preventDefault();
        const scaleFactor = event.deltaY > 0 ? 0.9 : 1.1;
        this.zoom(scaleFactor, event.offsetX, event.offsetY);
      });
      
      // Eventos para arrastrar el mapa (pan)
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
    // Calcular punto de origen en coordenadas SVG
    const newScale = Math.max(0.5, Math.min(5, this.scale * factor));
    
    // Ajustar la posición para hacer zoom hacia el punto donde está el cursor
    if (this.scale !== newScale) {
      const svgElement = this.mapSvg.nativeElement;
      const bbox = svgElement.getBoundingClientRect();
      const mouseX = x - bbox.left;
      const mouseY = y - bbox.top;
      
      // Mantener el punto bajo el cursor en la misma posición después del zoom
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

  // private centerViewOnRoom(room: Room): void {
  //   if (!this.mapSvg) return;
    
  //   const center = this.getPolygonCenter(room.polygonPoints);
  //   const svgElement = this.mapSvg.nativeElement;
  //   const bbox = svgElement.getBoundingClientRect();
    
  //   // Centrar el mapa en la sala seleccionada
  //   this.translateX = bbox.width / 2 - center.x * this.scale;
  //   this.translateY = bbox.height / 2 - center.y * this.scale;
    
  //   this.updateMapTransform();
  // }

  private centerViewOnRoom(room: Room): void {
    if (!this.mapSvg) return;
    
    // Usar getRoomCenter en lugar de getPolygonCenter directamente
    // ya que getRoomCenter maneja ambos tipos de habitaciones
    const center = this.getRoomCenter(room);
    
    const svgElement = this.mapSvg.nativeElement;
    const bbox = svgElement.getBoundingClientRect();
    
    // Centrar el mapa en la sala seleccionada
    this.translateX = bbox.width / 2 - center.x * this.scale;
    this.translateY = bbox.height / 2 - center.y * this.scale;
    
    this.updateMapTransform();
  }

  // Método para resetear la vista
  resetView(): void {
    this.scale = 1;
    this.translateX = 0;
    this.translateY = 0;
    this.updateMapTransform();
  }
}