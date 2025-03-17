import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MapService } from '../../../../core/services/rooms/map.service';
import { Room } from '../../../../core/models/rooms/rooms.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-rooms-interface',
  templateUrl: './rooms-interface.component.html',
  styleUrls: ['./rooms-interface.component.scss']
})
export class RoomsInterfaceComponent implements OnInit, OnDestroy {
  @ViewChild('mapSvg', { static: true }) mapSvg!: ElementRef<SVGElement>;
  
  rooms: Room[] = [];
  selectedRoom: Room | null = null;
  
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
    this.rooms = this.mapService.getRooms();
    
    this.subscription.add(
      this.mapService.selectedRoom$.subscribe(room => {
        this.selectedRoom = room;
        if (room) {
          this.centerViewOnRoom(room);
        }
      })
    );
    
    // Inicializar eventos para zoom
    this.initializeZoomEvents();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onRoomClick(roomId: string, event: MouseEvent): void {
    event.stopPropagation(); // Prevenir propagación si hay elementos anidados
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

  private centerViewOnRoom(room: Room): void {
    if (!this.mapSvg) return;
    
    const center = this.getPolygonCenter(room.polygonPoints);
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