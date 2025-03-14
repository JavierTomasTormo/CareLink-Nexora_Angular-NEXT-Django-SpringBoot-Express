import { Component, OnInit, OnChanges, AfterViewInit, Input, Output, EventEmitter, ElementRef, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as d3 from 'd3';
import { BehaviorSubject } from 'rxjs';

// Interfaces mejoradas con tipos más específicos
export interface Room {
  id: string;
  number: string;
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'standard' | 'suite' | 'deluxe' | 'accessible';
  status: 'Available' | 'Occupied' | 'Maintenance' | 'Cleaning';
  occupantName?: string;
  checkInDate?: string;
  checkOutDate?: string;
  lastCleaned?: string;
  price?: number;
  amenities?: string[];
  notes?: string;
}

export interface BuildingElement {
  id: string;
  type: 'corridor' | 'elevator' | 'stairs' | 'reception' | 'exit' | 'facility' | 'entrance';
  subType?: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation?: number;
  label?: string;
}

export interface FloorData {
  floorNumber: number;
  rooms: Room[];
  buildingElements: BuildingElement[];
  width: number;
  height: number;
}

@Component({
  selector: 'app-interactive-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './interactive-map.component.html',
  styleUrls: ['./interactive-map.component.scss']
})
export class InteractiveMapComponent implements OnInit, OnChanges, AfterViewInit {
  @ViewChild('mapContainer') mapContainer!: ElementRef;
  
  @Input() currentFloor: number = 1;
  @Input() highlightedRoomId: string | null = null;
  @Input() filter: { type?: string, status?: string } = {};
  
  @Output() roomSelected = new EventEmitter<Room>();
  @Output() floorChanged = new EventEmitter<number>();

  // Sujetos observables para coordinar la actualización de datos
  private floorChange$ = new BehaviorSubject<number>(1);
  private highlightRoom$ = new BehaviorSubject<string | null>(null);

  // Referencias D3
  private svg!: d3.Selection<SVGSVGElement, unknown, null, undefined>;
  private g!: d3.Selection<SVGGElement, unknown, null, undefined>;
  private floorLayer!: d3.Selection<SVGGElement, unknown, null, undefined>;
  private roomsLayer!: d3.Selection<SVGGElement, unknown, null, undefined>;
  private buildingLayer!: d3.Selection<SVGGElement, unknown, null, undefined>;
  private controlsLayer!: d3.Selection<SVGGElement, unknown, null, undefined>;
  private detailsPanel!: d3.Selection<SVGGElement, unknown, null, undefined>;
  private tooltip!: d3.Selection<HTMLDivElement, unknown, HTMLElement, any>;
  private zoom!: d3.ZoomBehavior<SVGSVGElement, unknown>;
  
  // Dimensiones y configuración
  private width: number = 1200;
  private height: number = 800;
  private margin = { top: 50, right: 50, bottom: 50, left: 50 };
  private initialized = false;
  
  // Colores por tipo de habitación y estado
  private roomTypeColors = {
    standard: '#e3f2fd', // Azul muy claro
    suite: '#bbdefb', // Azul claro
    deluxe: '#90caf9', // Azul
    accessible: '#e8f5e9' // Verde muy claro
  };
  
  private roomStatusColors = {
    Available: '#66bb6a', // Verde
    Occupied: '#ef5350', // Rojo
    Maintenance: '#ffb74d', // Naranja
    Cleaning: '#9575cd'  // Violeta
  };

  private getStatusColor(status: string): string {
    return this.roomStatusColors[status as keyof typeof this.roomStatusColors] || '#cccccc';
  }

  private capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  
  // Datos de todos los pisos
  private floorsData: FloorData[] = [
    // Piso 1
    {
      floorNumber: 1,
      width: 1000,
      height: 600,
      rooms: [
        { id: '101', number: '101', x: 100, y: 100, width: 120, height: 80, type: 'standard', status: 'Available' },
        { id: '102', number: '102', x: 230, y: 100, width: 120, height: 80, type: 'standard', status: 'Occupied', 
          occupantName: 'John Smith', checkInDate: '2023-04-15', checkOutDate: '2023-04-20' },
        { id: '103', number: '103', x: 360, y: 100, width: 120, height: 80, type: 'standard', status: 'Maintenance',
          notes: 'Reparando sistema de aire acondicionado' },
        { id: '104', number: '104', x: 490, y: 100, width: 120, height: 80, type: 'accessible', status: 'Available' },
        { id: '105', number: '105', x: 620, y: 100, width: 120, height: 80, type: 'standard', status: 'Available' },
        { id: '106', number: '106', x: 100, y: 400, width: 120, height: 80, type: 'standard', status: 'Cleaning',
          lastCleaned: '2023-04-16 09:30' },
        { id: '107', number: '107', x: 230, y: 400, width: 120, height: 80, type: 'standard', status: 'Available' },
        { id: '108', number: '108', x: 360, y: 400, width: 120, height: 80, type: 'deluxe', status: 'Occupied',
          occupantName: 'Maria López', checkInDate: '2023-04-14', checkOutDate: '2023-04-19' },
        { id: '109', number: '109', x: 490, y: 400, width: 120, height: 80, type: 'deluxe', status: 'Available' },
        { id: '110', number: '110', x: 620, y: 400, width: 120, height: 80, type: 'suite', status: 'Available' }
      ],
      buildingElements: [
        { id: 'corridor1', type: 'corridor', x: 80, y: 190, width: 680, height: 60 },
        { id: 'corridor2', type: 'corridor', x: 80, y: 330, width: 680, height: 60 },
        { id: 'elevator1', type: 'elevator', x: 400, y: 250, width: 40, height: 40, label: 'E' },
        { id: 'stairs1', type: 'stairs', x: 460, y: 250, width: 40, height: 40, label: 'S' },
        { id: 'reception', type: 'reception', x: 800, y: 250, width: 150, height: 100, label: 'Recepción' },
        { id: 'exit1', type: 'exit', x: 800, y: 400, width: 50, height: 20, label: 'Salida' },
      ]
    },
    
    // Piso 2
    {
      floorNumber: 2,
      width: 1000,
      height: 600,
      rooms: [
        { id: '201', number: '201', x: 100, y: 100, width: 120, height: 80, type: 'standard', status: 'Available' },
        { id: '202', number: '202', x: 230, y: 100, width: 120, height: 80, type: 'standard', status: 'Occupied', 
          occupantName: 'Carlos Ruiz', checkInDate: '2023-04-15', checkOutDate: '2023-04-18' },
        { id: '203', number: '203', x: 360, y: 100, width: 120, height: 80, type: 'standard', status: 'Available' },
        { id: '204', number: '204', x: 490, y: 100, width: 120, height: 80, type: 'accessible', status: 'Maintenance' },
        { id: '205', number: '205', x: 620, y: 100, width: 180, height: 120, type: 'deluxe', status: 'Available' },
        { id: '206', number: '206', x: 100, y: 400, width: 120, height: 80, type: 'standard', status: 'Occupied',
          occupantName: 'Ana Martínez', checkInDate: '2023-04-16', checkOutDate: '2023-04-22' },
        { id: '207', number: '207', x: 230, y: 400, width: 120, height: 80, type: 'standard', status: 'Available' },
        { id: '208', number: '208', x: 360, y: 400, width: 180, height: 120, type: 'suite', status: 'Available' },
        { id: '209', number: '209', x: 550, y: 400, width: 180, height: 120, type: 'suite', status: 'Cleaning' }
      ],
      buildingElements: [
        { id: 'corridor1-f2', type: 'corridor', x: 80, y: 190, width: 680, height: 60 },
        { id: 'corridor2-f2', type: 'corridor', x: 80, y: 330, width: 680, height: 60 },
        { id: 'elevator1-f2', type: 'elevator', x: 400, y: 250, width: 40, height: 40, label: 'E' },
        { id: 'stairs1-f2', type: 'stairs', x: 460, y: 250, width: 40, height: 40, label: 'S' },
        { id: 'facility1', type: 'facility', subType: 'cleaning', x: 600, y: 250, width: 80, height: 40, label: 'Limpieza' }
      ]
    },
    
    // Piso 3
    {
      floorNumber: 3,
      width: 1000,
      height: 600,
      rooms: [
        { id: '301', number: '301', x: 100, y: 100, width: 180, height: 120, type: 'deluxe', status: 'Available' },
        { id: '302', number: '302', x: 290, y: 100, width: 180, height: 120, type: 'deluxe', status: 'Occupied',
          occupantName: 'David Wong', checkInDate: '2023-04-12', checkOutDate: '2023-04-19' },
        { id: '303', number: '303', x: 480, y: 100, width: 180, height: 120, type: 'deluxe', status: 'Available' },
        { id: '304', number: '304', x: 100, y: 400, width: 240, height: 160, type: 'suite', status: 'Available' },
        { id: '305', number: '305', x: 350, y: 400, width: 240, height: 160, type: 'suite', status: 'Occupied',
          occupantName: 'Elena García', checkInDate: '2023-04-15', checkOutDate: '2023-04-22' },
        { id: '306', number: '306', x: 600, y: 400, width: 240, height: 160, type: 'suite', status: 'Maintenance' }
      ],
      buildingElements: [
        { id: 'corridor1-f3', type: 'corridor', x: 80, y: 230, width: 680, height: 60 },
        { id: 'corridor2-f3', type: 'corridor', x: 80, y: 330, width: 680, height: 60 },
        { id: 'elevator1-f3', type: 'elevator', x: 400, y: 290, width: 40, height: 40, label: 'E' },
        { id: 'stairs1-f3', type: 'stairs', x: 460, y: 290, width: 40, height: 40, label: 'S' },
        { id: 'facility1-f3', type: 'facility', subType: 'storage', x: 600, y: 290, width: 80, height: 40, label: 'Almacén' }
      ]
    }
  ];

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    // Suscripciones a cambios internos
    this.floorChange$.subscribe(floor => {
      this.renderFloor(floor);
    });

    this.highlightRoom$.subscribe(roomId => {
      if (roomId) {
        this.applyRoomHighlight(roomId);
      } else {
        this.clearHighlights();
      }
    });
  }

  private applyRoomHighlight(roomId: string): void {
    // Remover resaltados anteriores
    this.roomsLayer.selectAll('.room').classed('highlighted', false);
    
    // Aplicar nuevo resaltado
    this.roomsLayer.selectAll('.room')
      .filter((d: any) => d.id === roomId)
      .classed('highlighted', true)
      .raise();
  }

  private clearHighlights(): void {
    this.roomsLayer.selectAll('.room').classed('highlighted', false);
  }

  ngAfterViewInit(): void {
    this.initializeSvg();
    this.initialized = true;
    this.renderFloor(this.currentFloor);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.initialized) return;

    if (changes['currentFloor'] && !changes['currentFloor'].firstChange) {
      this.floorChange$.next(this.currentFloor);
    }

    if (changes['highlightedRoomId'] && !changes['highlightedRoomId'].firstChange) {
      this.highlightRoom$.next(this.highlightedRoomId);
    }

    if (changes['filter'] && !changes['filter'].firstChange) {
      this.applyRoomFilters();
    }
  }

  private initializeSvg(): void {
    // Verificar que el contenedor existe
    if (!this.mapContainer || !this.mapContainer.nativeElement) {
      console.error('Error: El contenedor del mapa no se ha inicializado correctamente');
      
      // Crear un contenedor alternativo si no existe
      const hostElement = this.elementRef.nativeElement;
      const containerDiv = document.createElement('div');
      containerDiv.className = 'map-container';
      hostElement.appendChild(containerDiv);
      
      this.svg = d3.select(containerDiv)
        .append('svg')
        .attr('viewBox', `0 0 ${this.width} ${this.height}`)
        .attr('preserveAspectRatio', 'xMidYMid meet')
        .attr('width', '100%')
        .attr('height', '100%')
        .attr('class', 'hotel-map')
        .style('background-color', '#f8f9fa');
    } else {
      // Usar el contenedor original
      this.svg = d3.select(this.mapContainer.nativeElement)
        .append('svg')
        .attr('viewBox', `0 0 ${this.width} ${this.height}`)
        .attr('preserveAspectRatio', 'xMidYMid meet')
        .attr('width', '100%')
        .attr('height', '100%')
        .attr('class', 'hotel-map')
        .style('background-color', '#f8f9fa');
    }
  
    // Resto del código de inicialización...
    // Configuración de zoom y pan
    this.zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.5, 3])
      .on('zoom', (event: d3.D3ZoomEvent<SVGSVGElement, unknown>) => {
        const { transform } = event;
        this.floorLayer.attr('transform', transform.toString());
      });
  
    this.svg.call(this.zoom);
  
    // Crear capas para una mejor organización
    this.floorLayer = this.svg.append('g')
      .attr('class', 'floor-layer')
      .attr('transform', 'translate(0,0)');
  
    // Crear las subcapas
    this.buildingLayer = this.floorLayer.append('g').attr('class', 'building-layer');
    this.roomsLayer = this.floorLayer.append('g').attr('class', 'rooms-layer');
    this.controlsLayer = this.svg.append('g').attr('class', 'controls-layer');
  }

  
    private createLegend(): void {
      const legend = this.controlsLayer
        .append('g')
        .attr('class', 'legend')
        .attr('transform', `translate(${this.width - 150}, 20)`);
  
      // Room Types Legend
      this.addLegendSection(legend, 0, 'Tipos de Habitación', {
        'Estándar': this.roomTypeColors.standard,
        'Suite': this.roomTypeColors.suite,
        'Deluxe': this.roomTypeColors.deluxe,
        'Accesible': this.roomTypeColors.accessible
      });
  
      // Room Status Legend
      this.addLegendSection(legend, 120, 'Estado', {
        'Disponible': this.roomStatusColors.Available,
        'Ocupada': this.roomStatusColors.Occupied,
        'Mantenimiento': this.roomStatusColors.Maintenance,
        'Limpieza': this.roomStatusColors.Cleaning
      });
    }
  
    private addLegendSection(legend: d3.Selection<SVGGElement, unknown, null, undefined>, 
                            yOffset: number, 
                            title: string, 
                            items: { [key: string]: string }): void {
      const section = legend.append('g')
        .attr('transform', `translate(0, ${yOffset})`);
  
      section.append('text')
        .attr('x', 0)
        .attr('y', 0)
        .attr('font-weight', 'bold')
        .attr('font-size', '12px')
        .text(title);
  
      Object.entries(items).forEach(([label, color], index) => {
        const item = section.append('g')
          .attr('transform', `translate(0, ${15 + index * 20})`);
  
        item.append('rect')
          .attr('width', 15)
          .attr('height', 15)
          .attr('fill', color)
          .attr('rx', 2);
  
        item.append('text')
          .attr('x', 20)
          .attr('y', 12)
          .attr('font-size', '12px')
          .text(label);
      });
  }

  private createNavigationControls(): void {
    const buttonWidth = 30;
    const buttonHeight = 30;
    const margin = 10;
    
    // Grupo para los controles de navegación
    const navControls = this.controlsLayer
      .append('g')
      .attr('class', 'navigation-controls')
      .attr('transform', `translate(${margin}, ${margin})`);

    // Botón de subir piso
    navControls.append('g')
      .attr('class', 'nav-button up')
      .attr('transform', `translate(${buttonWidth}, 0)`)
      .on('click', () => this.changeFloor(this.currentFloor + 1))
      .call(g => this.createNavButton(g, '↑', 'Subir piso'));

    // Botón de bajar piso
    navControls.append('g')
      .attr('class', 'nav-button down')
      .attr('transform', `translate(${buttonWidth}, ${buttonHeight + margin})`)
      .on('click', () => this.changeFloor(this.currentFloor - 1))
      .call(g => this.createNavButton(g, '↓', 'Bajar piso'));
  }

  private createNavButton(selection: d3.Selection<SVGGElement, unknown, null, undefined>, 
                         symbol: string, title: string): void {
    // Fondo del botón
    selection.append('rect')
      .attr('width', 30)
      .attr('height', 30)
      .attr('rx', 4)
      .attr('fill', '#ffffff')
      .attr('stroke', '#cccccc');

    // Texto del botón
    selection.append('text')
      .attr('x', 15)
      .attr('y', 15)
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'central')
      .attr('fill', '#333333')
      .text(symbol);

    // Título emergente
    selection.append('title')
      .text(title);
  }

  private changeFloor(newFloor: number): void {
    if (newFloor >= 1 && newFloor <= this.floorsData.length) {
      this.currentFloor = newFloor;
      this.floorChanged.emit(newFloor);
    }
  }

  private renderFloor(floorNumber: number): void {
    const floorData = this.getFloorData(floorNumber);
    if (!floorData) return;

    // Limpieza previa
    this.buildingLayer.selectAll('*').remove();
    this.roomsLayer.selectAll('*').remove();

    // Dibujar el marco del piso
    this.buildingLayer.append('rect')
      .attr('x', this.margin.left)
      .attr('y', this.margin.top)
      .attr('width', floorData.width)
      .attr('height', floorData.height)
      .attr('fill', '#fafafa')
      .attr('stroke', '#ccc')
      .attr('stroke-width', 2)
      .attr('rx', 8)
      .attr('ry', 8);

    // Añadir título del piso
    this.buildingLayer.append('text')
      .attr('x', this.margin.left + 20)
      .attr('y', this.margin.top - 20)
      .attr('font-size', '18px')
      .attr('font-weight', 'bold')
      .text(`Piso ${floorData.floorNumber}`);

    // Dibujar elementos del edificio
    this.renderBuildingElements(floorData.buildingElements);
    
    // Dibujar habitaciones
    this.renderRooms(floorData.rooms);
    
    // Aplicar filtros si es necesario
    if (Object.keys(this.filter).length > 0) {
      this.applyRoomFilters();
    }

    // Centrar la vista
    this.centerView(floorData);
  }

  private getFloorData(floorNumber: number): FloorData | undefined {
    return this.floorsData.find(floor => floor.floorNumber === floorNumber);
  }

  private renderBuildingElements(elements: BuildingElement[]): void {
    elements.forEach(element => {
      const group = this.buildingLayer.append('g')
        .attr('class', `building-element ${element.type}`)
        .attr('data-id', element.id)
        .attr('transform', `translate(${this.margin.left + element.x}, ${this.margin.top + element.y})`);

      // Dibujar el elemento base
      group.append('rect')
        .attr('width', element.width)
        .attr('height', element.height)
        .attr('fill', this.getBuildingElementColor(element))
        .attr('stroke', '#666')
        .attr('stroke-width', 1)
        .attr('rx', 4)
        .attr('ry', 4)
        .attr('opacity', element.type === 'corridor' ? 0.3 : 0.7);
      
      // Añadir símbolo específico del elemento
      this.addBuildingElementSymbol(group, element);
    });
  }

  private getBuildingElementColor(element: BuildingElement): string {
    switch(element.type) {
      case 'corridor':
        return '#e0e0e0';
      case 'elevator':
        return '#90caf9';
      case 'stairs':
        return '#ffcc80';
      case 'reception':
        return '#a5d6a7';
      case 'exit':
        return '#ef9a9a';
      case 'facility':
        return element.subType === 'cleaning' ? '#b39ddb' : '#ce93d8';
      default:
        return '#e0e0e0';
    }
  }
  private addBuildingElementSymbol(group: d3.Selection<SVGGElement, unknown, null, undefined>, element: BuildingElement): void {
    const centerX = element.x + element.width / 2;
    const centerY = element.y + element.height / 2;
    
    // Añadir efectos de sombra para todos los elementos
    const defs = group.append('defs');
    const filter = defs.append('filter')
      .attr('id', `shadow-${element.id}`)
      .attr('x', '-20%')
      .attr('y', '-20%')
      .attr('width', '140%')
      .attr('height', '140%');
      
    filter.append('feDropShadow')
      .attr('dx', '1')
      .attr('dy', '1')
      .attr('stdDeviation', '2')
      .attr('flood-color', 'rgba(0,0,0,0.3)');
    
    // Crear un grupo específico para este elemento
    const elementGroup = group.append('g')
      .attr('class', `building-element ${element.type}`)
      .attr('data-id', element.id)
      .style('filter', `url(#shadow-${element.id})`);
    
    // Añadir efecto de hover
    elementGroup
      .on('mouseover', (event: MouseEvent) => {
        d3.select(event.currentTarget as Element)
          .transition()
          .duration(200)
          .style('opacity', '0.8')
          .style('transform', 'scale(1.05)');
      })
      .on('mouseout', (event: MouseEvent) => {
        d3.select(event.currentTarget as Element)
          .transition()
          .duration(200)
          .style('opacity', '1')
          .style('transform', 'scale(1)');
      });
    
    // Base rectangular para todos los elementos
    const rect = elementGroup.append('rect')
      .attr('x', element.x)
      .attr('y', element.y)
      .attr('width', element.width)
      .attr('height', element.height)
      .attr('rx', 3)
      .attr('ry', 3)
      .attr('stroke', '#2c3e50')
      .attr('stroke-width', 1);
    
    switch(element.type) {
      case 'elevator':
        // Fondo del elevador
        rect.attr('fill', '#3498db');
        
        // Símbolo del elevador
        elementGroup.append('rect')
          .attr('x', centerX - element.width * 0.3)
          .attr('y', centerY - element.height * 0.3)
          .attr('width', element.width * 0.6)
          .attr('height', element.height * 0.6)
          .attr('fill', '#ecf0f1')
          .attr('stroke', '#2c3e50')
          .attr('stroke-width', 0.5);
        
        // Puertas del elevador
        elementGroup.append('line')
          .attr('x1', centerX)
          .attr('y1', centerY - element.height * 0.3)
          .attr('x2', centerX)
          .attr('y2', centerY + element.height * 0.3)
          .attr('stroke', '#2c3e50')
          .attr('stroke-width', 0.5);
        
        // Icono de elevador
        elementGroup.append('path')
          .attr('d', 'M-5,0 L0,-5 L5,0 M-5,0 L0,5 L5,0')
          .attr('transform', `translate(${centerX}, ${centerY})`)
          .attr('fill', 'none')
          .attr('stroke', '#2c3e50')
          .attr('stroke-width', 1.5)
          .attr('stroke-linecap', 'round')
          .attr('stroke-linejoin', 'round');
        
        // Etiqueta
        elementGroup.append('text')
          .attr('x', centerX)
          .attr('y', element.y + element.height + 12)
          .attr('text-anchor', 'middle')
          .attr('fill', '#34495e')
          .attr('font-size', '10px')
          .text('Elevador');
        break;
        
      case 'stairs':
        // Fondo de las escaleras
        rect.attr('fill', '#9b59b6');
        
        // Símbolo de escaleras
        const stairsPath = d3.path();
        stairsPath.moveTo(element.x + element.width * 0.2, element.y + element.height * 0.2);
        stairsPath.lineTo(element.x + element.width * 0.4, element.y + element.height * 0.2);
        stairsPath.lineTo(element.x + element.width * 0.4, element.y + element.height * 0.4);
        stairsPath.lineTo(element.x + element.width * 0.6, element.y + element.height * 0.4);
        stairsPath.lineTo(element.x + element.width * 0.6, element.y + element.height * 0.6);
        stairsPath.lineTo(element.x + element.width * 0.8, element.y + element.height * 0.6);
        stairsPath.lineTo(element.x + element.width * 0.8, element.y + element.height * 0.8);
        
        elementGroup.append('path')
          .attr('d', stairsPath.toString())
          .attr('fill', 'none')
          .attr('stroke', '#ecf0f1')
          .attr('stroke-width', 2)
          .attr('stroke-linejoin', 'round');
        
        // Etiqueta
        elementGroup.append('text')
          .attr('x', centerX)
          .attr('y', element.y + element.height + 12)
          .attr('text-anchor', 'middle')
          .attr('fill', '#34495e')
          .attr('font-size', '10px')
          .text('Escaleras');
        break;
        
      case 'reception':
        // Fondo de recepción
        rect.attr('fill', '#2ecc71');
        
        // Símbolo de recepción - Mostrador
        elementGroup.append('rect')
          .attr('x', element.x + element.width * 0.2)
          .attr('y', element.y + element.height * 0.3)
          .attr('width', element.width * 0.6)
          .attr('height', element.height * 0.2)
          .attr('rx', 1)
          .attr('ry', 1)
          .attr('fill', '#ecf0f1')
          .attr('stroke', '#2c3e50')
          .attr('stroke-width', 0.5);
        
        // Símbolo de persona
        elementGroup.append('circle')
          .attr('cx', centerX)
          .attr('cy', element.y + element.height * 0.7)
          .attr('r', element.height * 0.15)
          .attr('fill', '#ecf0f1');
        
        // Etiqueta
        elementGroup.append('text')
          .attr('x', centerX)
          .attr('y', element.y + element.height + 12)
          .attr('text-anchor', 'middle')
          .attr('fill', '#34495e')
          .attr('font-size', '10px')
          .text('Recepción');
        break;
        
      case 'facility':
        // Fondo de instalaciones según subtipo
        if (element.subType === 'cleaning') {
          rect.attr('fill', '#1abc9c');
          
          // Símbolo de limpieza
          elementGroup.append('circle')
            .attr('cx', centerX)
            .attr('cy', centerY)
            .attr('r', Math.min(element.width, element.height) * 0.3)
            .attr('fill', 'none')
            .attr('stroke', '#ecf0f1')
            .attr('stroke-width', 1.5);
          
          // Mango de escoba
          elementGroup.append('line')
            .attr('x1', centerX)
            .attr('y1', centerY - Math.min(element.width, element.height) * 0.2)
            .attr('x2', centerX)
            .attr('y2', centerY - Math.min(element.width, element.height) * 0.5)
            .attr('stroke', '#ecf0f1')
            .attr('stroke-width', 1.5);
          
          elementGroup.append('text')
            .attr('x', centerX)
            .attr('y', element.y + element.height + 12)
            .attr('text-anchor', 'middle')
            .attr('fill', '#34495e')
            .attr('font-size', '10px')
            .text('Limpieza');
        } 
        else if (element.subType === 'restaurant') {
          rect.attr('fill', '#e74c3c');
          
          // Símbolo de restaurante - plato y cubiertos
          const plateRadius = Math.min(element.width, element.height) * 0.25;
          
          elementGroup.append('circle')
            .attr('cx', centerX)
            .attr('cy', centerY)
            .attr('r', plateRadius)
            .attr('fill', '#ecf0f1')
            .attr('stroke', '#2c3e50')
            .attr('stroke-width', 0.5);
          
          // Tenedor
          elementGroup.append('line')
            .attr('x1', centerX - plateRadius * 0.6)
            .attr('y1', centerY - plateRadius * 0.6)
            .attr('x2', centerX - plateRadius * 0.1)
            .attr('y2', centerY + plateRadius * 0.6)
            .attr('stroke', '#2c3e50')
            .attr('stroke-width', 1);
          
          // Cuchillo
          elementGroup.append('line')
            .attr('x1', centerX + plateRadius * 0.6)
            .attr('y1', centerY - plateRadius * 0.6)
            .attr('x2', centerX + plateRadius * 0.1)
            .attr('y2', centerY + plateRadius * 0.6)
            .attr('stroke', '#2c3e50')
            .attr('stroke-width', 1);
          
          elementGroup.append('text')
            .attr('x', centerX)
            .attr('y', element.y + element.height + 12)
            .attr('text-anchor', 'middle')
            .attr('fill', '#34495e')
            .attr('font-size', '10px')
            .text('Restaurante');
        }
        else if (element.subType === 'gym') {
          rect.attr('fill', '#f39c12');
          
          // Símbolo de gimnasio - mancuerna
          const barLength = Math.min(element.width, element.height) * 0.5;
          const weightRadius = Math.min(element.width, element.height) * 0.15;
          
          // Barra
          elementGroup.append('line')
            .attr('x1', centerX - barLength/2)
            .attr('y1', centerY)
            .attr('x2', centerX + barLength/2)
            .attr('y2', centerY)
            .attr('stroke', '#ecf0f1')
            .attr('stroke-width', 3);
          
          // Pesas
          elementGroup.append('circle')
            .attr('cx', centerX - barLength/2)
            .attr('cy', centerY)
            .attr('r', weightRadius)
            .attr('fill', '#ecf0f1');
          
          elementGroup.append('circle')
            .attr('cx', centerX + barLength/2)
            .attr('cy', centerY)
            .attr('r', weightRadius)
            .attr('fill', '#ecf0f1');
          
          elementGroup.append('text')
            .attr('x', centerX)
            .attr('y', element.y + element.height + 12)
            .attr('text-anchor', 'middle')
            .attr('fill', '#34495e')
            .attr('font-size', '10px')
            .text('Gimnasio');
        }
        else {
          // Valor por defecto para otros subtipos
          rect.attr('fill', '#7f8c8d');
          
          elementGroup.append('text')
            .attr('x', centerX)
            .attr('y', centerY)
            .attr('text-anchor', 'middle')
            .attr('dominant-baseline', 'middle')
            .attr('fill', '#ecf0f1')
            .attr('font-size', '10px')
            .text(element.subType || 'Instalación');
        }
        break;
        
      case 'entrance':
        // Entrada principal
        rect.attr('fill', '#f1c40f');
        
        // Símbolo de puerta
        elementGroup.append('rect')
          .attr('x', centerX - element.width * 0.25)
          .attr('y', element.y + element.height * 0.1)
          .attr('width', element.width * 0.5)
          .attr('height', element.height * 0.8)
          .attr('rx', 1)
          .attr('ry', 1)
          .attr('fill', '#ecf0f1')
          .attr('stroke', '#2c3e50')
          .attr('stroke-width', 0.5);
        
        // Manilla de la puerta
        elementGroup.append('circle')
          .attr('cx', centerX - element.width * 0.1)
          .attr('cy', centerY)
          .attr('r', 2)
          .attr('fill', '#2c3e50');
        
        // Etiqueta
        elementGroup.append('text')
          .attr('x', centerX)
          .attr('y', element.y + element.height + 12)
          .attr('text-anchor', 'middle')
          .attr('fill', '#34495e')
          .attr('font-size', '10px')
          .text('Entrada');
        break;
        
      case 'corridor':
        // Pasillo - más sutil
        rect.attr('fill', '#ecf0f1')
          .attr('stroke', '#bdc3c7')
          .attr('stroke-width', 0.5)
          .attr('stroke-dasharray', '3,3');
        break;
        
      default:
        rect.attr('fill', '#95a5a6');
        
        // Etiqueta genérica
        elementGroup.append('text')
          .attr('x', centerX)
          .attr('y', centerY)
          .attr('text-anchor', 'middle')
          .attr('dominant-baseline', 'middle')
          .attr('fill', '#ecf0f1')
          .attr('font-size', '10px')
          .text(element.type);
        break;
    }
  }

  // Añadir a la clase InteractiveMapComponent

// 1. Paleta de colores profesional
private applyRoomFilters(): void {
  this.roomsLayer.selectAll('.room')
    .style('opacity', (d: any) => {
      const room = d as Room;
      const typeMatch = !this.filter.type || room.type === this.filter.type;
      const statusMatch = !this.filter.status || room.status === this.filter.status;
      return typeMatch && statusMatch ? 1 : 0.3;
    });
}

private getStatusDisplay(status: string): string {
  const statusMap: { [key: string]: string } = {
    'Available': 'Disponible',
    'Occupied': 'Ocupada',
    'Maintenance': 'Mantenimiento',
    'Cleaning': 'Limpieza'
  };
  return statusMap[status] || status;
}

private colorPalette = {
  primary: '#3498db',    // Azul
  secondary: '#2ecc71',  // Verde
  accent: '#e74c3c',     // Rojo
  neutral: '#ecf0f1',    // Gris claro
  dark: '#2c3e50',       // Azul oscuro
  roomAvailable: '#2ecc71',
  roomOccupied: '#e74c3c',
  roomMaintenance: '#f39c12',
  roomCleaning: '#9b59b6',
  background: '#f5f7fa'
};

// 2. Inicializar el mapa con una visión profesional
private initializeMap(): void {
  // Crear SVG con dimensiones adecuadas
  const width = 960;
  const height = 600;
  
  // Crear un contenedor con borde y sombra
  const container = d3.select(this.elementRef.nativeElement)
    .append('div')
    .attr('class', 'map-container')
    .style('border-radius', '8px')
    .style('box-shadow', '0 10px 30px rgba(0,0,0,0.1)')
    .style('overflow', 'hidden')
    .style('background-color', this.colorPalette.background);
  
  // Añadir controles de navegación
  const controls = container.append('div')
    .attr('class', 'map-controls')
    .style('padding', '10px')
    .style('background', 'linear-gradient(to bottom, #ffffff, #f5f7fa)')
    .style('border-bottom', '1px solid #e1e5ea')
    .style('display', 'flex')
    .style('justify-content', 'space-between')
    .style('align-items', 'center');
  
  // Título del mapa
  controls.append('h3')
    .text('Mapa Interactivo de Instalaciones')
    .style('margin', '0')
    .style('color', this.colorPalette.dark)
    .style('font-weight', '500');
  
  // Controles de zoom
  const zoomControls = controls.append('div')
    .style('display', 'flex')
    .style('gap', '8px');
  
  zoomControls.append('button')
    .text('+')
    .attr('title', 'Acercar')
    .style('width', '30px')
    .style('height', '30px')
    .style('border-radius', '4px')
    .style('border', 'none')
    .style('background-color', this.colorPalette.primary)
    .style('color', 'white')
    .style('cursor', 'pointer')
    .on('click', () => this.zoomIn());
  
  zoomControls.append('button')
    .text('-')
    .attr('title', 'Alejar')
    .style('width', '30px')
    .style('height', '30px')
    .style('border-radius', '4px')
    .style('border', 'none')
    .style('background-color', this.colorPalette.primary)
    .style('color', 'white')
    .style('cursor', 'pointer')
    .on('click', () => this.zoomOut());
  
  zoomControls.append('button')
    .text('↺')
    .attr('title', 'Restablecer vista')
    .style('width', '30px')
    .style('height', '30px')
    .style('border-radius', '4px')
    .style('border', 'none')
    .style('background-color', this.colorPalette.dark)
    .style('color', 'white')
    .style('cursor', 'pointer')
    .on('click', () => this.resetZoom());
  
  // SVG principal
  this.svg = container.append('svg')
    .attr('width', '100%')
    .attr('height', height)
    .attr('viewBox', `0 0 ${width} ${height}`)
    .style('background-color', this.colorPalette.background);
    
  // Definir patrones y gradientes
  this.definePatterns();
  
  // Tooltip elegante
  this.tooltip = d3.select('body')
    .append('div')
    .attr('class', 'map-tooltip')
    .style('position', 'absolute')
    .style('visibility', 'hidden')
    .style('padding', '10px 15px')
    .style('background', 'rgba(44, 62, 80, 0.9)')
    .style('color', 'white')
    .style('border-radius', '4px')
    .style('font-size', '12px')
    .style('box-shadow', '0 4px 15px rgba(0,0,0,0.2)')
    .style('transform', 'translate(-50%, -100%)')
    .style('pointer-events', 'none')
    .style('z-index', '1000')
    .style('transition', 'opacity 0.2s');
    
  // Configurar zoom más fluido
  this.zoom = d3.zoom<SVGSVGElement, unknown>()
    .scaleExtent([0.5, 4])
    .on('zoom', (event: d3.D3ZoomEvent<SVGSVGElement, unknown>) => {
      this.g.attr('transform', event.transform.toString());
    });
    
  this.svg.call(this.zoom);
  
  // Grupo principal
  this.g = this.svg.append('g');
  
  // Dibujar cuadrícula de fondo
  this.drawGrid();
  
  // Dibujar elementos
  this.drawBuilding();
  this.renderRooms(this.floorsData[this.currentFloor - 1].rooms);
  
  // Leyenda
  this.drawLegend();
}

// 3. Método para definir patrones y estilos avanzados
private definePatterns(): void {
  const defs = this.svg.append('defs');
  
  // Patrón para habitaciones en limpieza
  const cleaningPattern = defs.append('pattern')
    .attr('id', 'cleaning-pattern')
    .attr('width', 10)
    .attr('height', 10)
    .attr('patternUnits', 'userSpaceOnUse')
    .attr('patternTransform', 'rotate(45)');
    
  cleaningPattern.append('rect')
    .attr('width', 10)
    .attr('height', 10)
    .attr('fill', this.colorPalette.roomCleaning);
    
  cleaningPattern.append('line')
    .attr('x1', 0)
    .attr('y1', 0)
    .attr('x2', 0)
    .attr('y2', 10)
    .attr('stroke', '#ffffff')
    .attr('stroke-width', 2);
  
  // Filtro de sombra elegante
  const dropShadow = defs.append('filter')
    .attr('id', 'drop-shadow')
    .attr('height', '130%');

  dropShadow.append('feGaussianBlur')
    .attr('in', 'SourceAlpha')
    .attr('stdDeviation', 3)
    .attr('result', 'blur');

  dropShadow.append('feOffset')
    .attr('in', 'blur')
    .attr('dx', 2)
    .attr('dy', 2)
    .attr('result', 'offsetBlur');

  const feComponentTransfer = dropShadow.append('feComponentTransfer')
    .attr('in', 'offsetBlur')
    .attr('result', 'offsetBlur');
    
  feComponentTransfer.append('feFuncA')
    .attr('type', 'linear')
    .attr('slope', 0.3);

  const feMerge = dropShadow.append('feMerge');
  feMerge.append('feMergeNode');
  feMerge.append('feMergeNode')
    .attr('in', 'SourceGraphic');
}

// 4. Dibujar cuadrícula de fondo
private drawGrid(): void {
  const width = 960;
  const height = 600;
  const gridSize = 20;
  
  for (let x = 0; x < width; x += gridSize) {
    this.g.append('line')
      .attr('x1', x)
      .attr('y1', 0)
      .attr('x2', x)
      .attr('y2', height)
      .attr('stroke', '#e1e5ea')
      .attr('stroke-width', 0.5);
  }
  
  for (let y = 0; y < height; y += gridSize) {
    this.g.append('line')
      .attr('x1', 0)
      .attr('y1', y)
      .attr('x2', width)
      .attr('y2', y)
      .attr('stroke', '#e1e5ea')
      .attr('stroke-width', 0.5);
  }
}

private zoomIn(): void {
  this.svg.transition()
    .duration(300)
    .call(this.zoom.scaleBy, 1.2);
}

private zoomOut(): void {
  this.svg.transition()
    .duration(300)
    .call(this.zoom.scaleBy, 0.8);
}

private resetZoom(): void {
  this.svg.transition()
    .duration(300)
    .call(this.zoom.transform, d3.zoomIdentity);
}

private drawBuilding(): void {
  const buildingElements = this.floorsData[this.currentFloor - 1].buildingElements;
  buildingElements.forEach(element => {
    const elementGroup = this.buildingLayer.append('g')
      .attr('class', `building-element ${element.type}`);

    elementGroup.append('rect')
      .attr('x', this.margin.left + element.x)
      .attr('y', this.margin.top + element.y)
      .attr('width', element.width)
      .attr('height', element.height)
      .attr('fill', '#f0f0f0')
      .attr('stroke', '#666')
      .attr('stroke-width', 1);

    if (element.label) {
      elementGroup.append('text')
        .attr('x', this.margin.left + element.x + element.width / 2)
        .attr('y', this.margin.top + element.y + element.height / 2)
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'central')
        .attr('fill', '#333')
        .text(element.label);
    }
  });
}

private centerView(floorData: FloorData): void {
  const scale = 0.9;
  const viewportWidth = this.width - this.margin.left - this.margin.right;
  const viewportHeight = this.height - this.margin.top - this.margin.bottom;
  
  const tx = (viewportWidth - floorData.width * scale) / 2 + this.margin.left;
  const ty = (viewportHeight - floorData.height * scale) / 2 + this.margin.top;
  
  this.svg.transition()
    .duration(750)
    .call(
      this.zoom.transform,
      d3.zoomIdentity
        .translate(tx, ty)
        .scale(scale)
    );
}

private renderRooms(rooms: Room[]): void {
  this.roomsLayer.selectAll('.room').remove();

  rooms.forEach(room => {
    const roomGroup = this.roomsLayer.append('g')
      .attr('class', 'room')
      .attr('data-id', room.id);

    // Room rectangle
    roomGroup.append('rect')
      .attr('x', this.margin.left + room.x)
      .attr('y', this.margin.top + room.y)
      .attr('width', room.width)
      .attr('height', room.height)
      .attr('fill', this.roomTypeColors[room.type])
      .attr('stroke', this.getStatusColor(room.status))
      .attr('stroke-width', 2)
      .attr('rx', 4)
      .attr('ry', 4);

    // Room number
    roomGroup.append('text')
      .attr('x', this.margin.left + room.x + room.width / 2)
      .attr('y', this.margin.top + room.y + room.height / 2)
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'central')
      .attr('fill', '#333')
      .text(room.number);

    // Add click event
    roomGroup.on('click', () => {
      this.roomSelected.emit(room);
    });
  });
}

// 5. Añadir una leyenda profesional
private drawLegend(): void {
  const legend = this.svg.append('g')
    .attr('class', 'map-legend')
    .attr('transform', 'translate(20, 20)');
    
  const legendBg = legend.append('rect')
    .attr('width', 140)
    .attr('height', 120)
    .attr('rx', 5)
    .attr('ry', 5)
    .attr('fill', 'rgba(255, 255, 255, 0.9)')
    .style('filter', 'url(#drop-shadow)');
    
  const legendTitle = legend.append('text')
    .attr('x', 70)
    .attr('y', 20)
    .attr('text-anchor', 'middle')
    .attr('font-weight', 'bold')
    .attr('fill', this.colorPalette.dark)
    .text('Leyenda');
    
  const items = [
    { color: this.colorPalette.roomAvailable, label: 'Disponible' },
    { color: this.colorPalette.roomOccupied, label: 'Ocupada' },
    { color: this.colorPalette.roomMaintenance, label: 'Mantenimiento' },
    { color: 'url(#cleaning-pattern)', label: 'En limpieza' }
  ];
  
  items.forEach((item, i) => {
    const y = i * 20 + 40;
    
    legend.append('rect')
      .attr('x', 15)
      .attr('y', y)
      .attr('width', 12)
      .attr('height', 12)
      .attr('fill', item.color);
      
    legend.append('text')
      .attr('x', 35)
      .attr('y', y + 10)
      .attr('fill', this.colorPalette.dark)
      .attr('font-size', '12px')
      .text(item.label);
  });
}

// 6. Crear un tooltip avanzado
private createTooltipContent(data: any): string {
  const title = data.name || `Habitación ${data.id}`;
  const status = this.getStatusDisplay(data.status);
  const type = data.type ? this.capitalizeFirstLetter(data.type) : '';
  
  let content = `
    <div style="text-align: center; border-bottom: 1px solid rgba(255,255,255,0.2); margin-bottom: 8px; padding-bottom: 5px;">
      <strong style="font-size: 14px;">${title}</strong>
    </div>
    <div style="display: grid; grid-template-columns: auto 1fr; gap: 5px 10px; align-items: center;">
  `;
  
  if (status) {
    const statusColor = this.getStatusColor(data.status);
    content += `
      <span style="font-weight: 500;">Estado:</span>
      <span style="display: flex; align-items: center;">
        <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: ${statusColor}; margin-right: 5px;"></span>
        ${status}
      </span>
    `;
  }
  
  if (type) {
    content += `
      <span style="font-weight: 500;">Tipo:</span>
      <span>${type}</span>
    `;
  }
  
  if (data.lastCleaned) {
    content += `
      <span style="font-weight: 500;">Última limpieza:</span>
      <span>${data.lastCleaned}</span>
    `;
  }
  
  content += `</div>`;
  
  if (data.occupant) {
    content += `
      <div style="margin-top: 8px; border-top: 1px solid rgba(255,255,255,0.2); padding-top: 5px;">
        <span style="font-weight: 500;">Ocupante:</span> ${data.occupant}
      </div>
    `;
  }
  
  return content;
}
}