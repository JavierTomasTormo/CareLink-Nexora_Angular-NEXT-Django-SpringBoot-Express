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
        console.log('Room selected in component:', room);
        this.selectedRoom = room;
        if (room) {
          this.centerViewOnRoom(room);
        }
      })
    );
    
    this.initializeZoomEvents();
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
      if (roomId.startsWith('h')) return 'url(#gradient-room)';
      if (roomId === 'commonRoom') return 'url(#gradient-common)';
      if (roomId === 'kitchen') return 'url(#gradient-kitchen)';
      if (roomId === 'dining') return 'url(#gradient-dining)';
      if (roomId.includes('bath')) return 'url(#gradient-bath)';
      if (roomId === 'laundry') return 'url(#gradient-laundry)';
      if (roomId === 'reception') return 'url(#gradient-reception)';
      if (roomId === 'office') return 'url(#gradient-office)';
      if (roomId === 'gym') return 'url(#gradient-gym)';
      if (roomId === 'multiroom') return 'url(#gradient-multiroom)';
      return '#ffffff';
    }

  getRoomCoords(room: Room): {x: number, y: number, width: number, height: number} {
    if (room.x !== undefined && room.y !== undefined && 
        room.width !== undefined && room.height !== undefined) {
      return {
        x: room.x,
        y: room.y,
        width: room.width,
        height: room.height
      };
    }
    
    if (room.polygonPoints) {
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
    
    return { x: 0, y: 0, width: 0, height: 0 };
  }


  getRoomIcon(roomId: string): string {
    if (roomId.startsWith('h') && !isNaN(parseInt(roomId.slice(1)))) return "#icon-bed";
    if (roomId === 'commonRoom') return "#icon-couch";
    if (roomId === 'kitchen') return "#icon-utensils";
    if (roomId === 'dining') return "#icon-utensils";
    if (roomId.includes('bath')) return "#icon-shower";
    if (roomId === 'laundry') return "#icon-wash";
    if (roomId === 'gym') return "#icon-dumbbell";
    if (roomId === 'office') return "#icon-desk";
    if (roomId === 'reception') return "#icon-concierge";
    if (roomId === 'multiroom') return "#icon-users";
    return "#icon-bed";
  }

  
  getRoomCenter(room: Room): {x: number, y: number} {
    const coords = this.getRoomCoords(room);
    return {
      x: coords.x + coords.width / 2,
      y: coords.y + coords.height / 2
    };
  }

  getRoomStroke(roomId: string): string {
    if (roomId.startsWith('h')) return '#fb923c';
    if (roomId === 'commonRoom') return '#a855f7';
    if (roomId === 'kitchen') return '#0ea5e9';
    if (roomId === 'dining') return '#10b981';
    if (roomId.includes('bath')) return '#0284c7';
    if (roomId === 'laundry') return '#f59e0b';
    if (roomId === 'reception') return '#ec4899';
    if (roomId === 'office') return '#0369a1';
    if (roomId === 'gym') return '#d97706';
    if (roomId === 'multiroom') return '#7c3aed';
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