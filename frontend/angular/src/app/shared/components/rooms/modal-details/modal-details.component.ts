import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../../core/services/rooms/modal.service';
import { Room } from '../../../../core/models/rooms/rooms.model';
import { CommonModule } from '@angular/common';
import { MapService } from '../../../../core/services/rooms/map.service';

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
  GARDEN = 'garden'
}

@Component({
  selector: 'app-modal-details',
  standalone: true,
  templateUrl: './modal-details.component.html',
  styleUrls: ['./modal-details.component.css'],
  imports: [CommonModule],
})
export class ModalDetailsComponent implements OnInit {
  display: 'open' | 'close' = 'close';
  room: Room | null = null;
  activeTab: 'details' | 'location' | 'images' = 'details';
  currentImageIndex = 0;
  currentImage = '';
  hasRoomImages = false;
  showEditButton = false; 
  
  private roomImagesMap: Record<string, string[]> = {
    // Habitaciones residenciales destacadas
    'room101': [
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=600&auto=format',
      'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600&auto=format',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=600&auto=format'
    ],
    'room103': [
      'https://images.unsplash.com/photo-1651018276250-3eee39f23baa?w=600&auto=format',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&auto=format',
      'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=600&auto=format',
      'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=600&auto=format'
    ],
    'room108': [
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600&auto=format',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&auto=format',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&auto=format',
      'https://images.unsplash.com/photo-1631049552240-59c37f38802b?w=600&auto=format',
      'https://images.unsplash.com/photo-1636988708190-7b1a21d2c7cf?w=600&auto=format'
    ],
    
    // Habitaciones de memoria destacadas
    'memRoom301': [
      'https://images.unsplash.com/photo-1595257841889-eca2678454e2?w=600&auto=format',
      'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=600&auto=format',
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=600&auto=format'
    ],
    
    // Espacios comunes específicos
    'commonRoom': [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&auto=format',
      'https://images.unsplash.com/photo-1630699144867-37acec97df5a?w=600&auto=format',
      'https://images.unsplash.com/photo-1668911128602-9c86dc5d7385?w=600&auto=format',
      'https://images.unsplash.com/photo-1668911308371-ef34e8fa9475?w=600&auto=format'
    ],
    'livingRoom2': [
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&auto=format',
      'https://images.unsplash.com/photo-1585128792020-803d29415281?w=600&auto=format',
      'https://images.unsplash.com/photo-1606744888344-493238951221?w=600&auto=format'
    ],
    'dining': [
      'https://images.unsplash.com/photo-1519974719765-e6559eac2575?w=600&auto=format',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format',
      'https://images.unsplash.com/photo-1515215676803-119c26b0644b?w=600&auto=format'
    ],
    'kitchen': [
      'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=600&auto=format',
      'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=600&auto=format',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=600&auto=format',
      'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=600&auto=format'
    ],
    
    // Áreas médicas destacadas
    'medicationRoom': [
      'https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=600&auto=format',
      'https://images.unsplash.com/photo-1576671414121-aa2d7c87d7f3?w=600&auto=format',
      'https://images.unsplash.com/photo-1631217872822-ded7cdb90c70?w=600&auto=format'
    ],
    'nurseStation1': [
      'https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=600&auto=format',
      'https://images.unsplash.com/photo-1516549655669-df51a1e556e9?w=600&auto=format',
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&auto=format'
    ],
    
    // Jardines
    'garden': [
      'https://images.unsplash.com/photo-1597221477227-a495c3b66b46?w=600&auto=format',
      'https://images.unsplash.com/photo-1626768674647-829343a81073?w=600&auto=format',
      'https://images.unsplash.com/photo-1625759879835-d2be1008d6b8?w=600&auto=format',
      'https://images.unsplash.com/photo-1586280268958-9483002d016a?w=600&auto=format'
    ],
    'secureGarden': [
      'https://images.unsplash.com/photo-1526738013590-63ae53d31425?w=600&auto=format',
      'https://images.unsplash.com/photo-1592991538534-37a3938841d1?w=600&auto=format',
      'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=600&auto=format'
    ]
  };

    // Banco de imágenes por categoría de habitación
    private categoryImagesMap: Record<RoomCategory, string[]> = {
      // Habitaciones residenciales estándar
      [RoomCategory.RESIDENTIAL]: [
        'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&auto=format',
        'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&auto=format',
        'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=600&auto=format',
        'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&auto=format',
        'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=600&auto=format',
        'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600&auto=format'
      ],
      
      // Habitaciones de cuidados especiales
      [RoomCategory.SPECIAL_CARE]: [
        'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&auto=format',
        'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=600&auto=format',
        'https://images.unsplash.com/photo-1659214300917-4ff3495600ef?w=600&auto=format',
        'https://images.unsplash.com/photo-1586773860418-d37222d8bc3f?w=600&auto=format'
      ],
      
      // Habitaciones de unidad de memoria
      [RoomCategory.MEMORY_CARE]: [
        'https://images.unsplash.com/photo-1595257841889-eca2678454e2?w=600&auto=format',
        'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=600&auto=format',
        'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=600&auto=format',
        'https://images.unsplash.com/photo-1602595123571-478ea041d39e?w=600&auto=format'
      ],
      
      // Áreas comunes
      [RoomCategory.COMMON_AREA]: [
        'https://images.unsplash.com/photo-1558442074-3c19857bc1dc?w=600&auto=format',
        'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&auto=format',
        'https://images.unsplash.com/photo-1585128792020-803d29415281?w=600&auto=format',
        'https://images.unsplash.com/photo-1606744888344-493238951221?w=600&auto=format',
        'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&auto=format'
      ],
      
      // Áreas sanitarias
      [RoomCategory.HEALTHCARE]: [
        'https://images.unsplash.com/photo-1516549655669-df51a1e556e9?w=600&auto=format',
        'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&auto=format',
        'https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=600&auto=format',
        'https://images.unsplash.com/photo-1576671414121-aa2d7c87d7f3?w=600&auto=format',
        'https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=600&auto=format'
      ],
      
      // Áreas administrativas
      [RoomCategory.ADMINISTRATIVE]: [
        'https://images.unsplash.com/photo-1564069114553-7215e1ff1890?w=600&auto=format',
        'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600&auto=format',
        'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&auto=format',
        'https://images.unsplash.com/photo-1568992688065-536aad8a12f6?w=600&auto=format'
      ],
      
      // Áreas de almacenamiento
      [RoomCategory.STORAGE]: [
        'https://images.unsplash.com/photo-1595079927456-1ff1c9661b6c?w=600&auto=format',
        'https://images.unsplash.com/photo-1603796908893-e3b67714a52f?w=600&auto=format',
        'https://images.unsplash.com/photo-1628044107908-5b7c9182d775?w=600&auto=format',
        'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=600&auto=format',
        'https://images.unsplash.com/photo-1535012794614-68b11a8c9c4e?w=600&auto=format'
      ],
      
      // Áreas técnicas
      [RoomCategory.TECHNICAL]: [
        'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&auto=format',
        'https://images.unsplash.com/photo-1622473541207-c59e90f40b12?w=600&auto=format',
        'https://images.unsplash.com/photo-1658591962744-5533fb729c2d?w=600&auto=format',
        'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&auto=format'
      ],
      
      // Comodidades y servicios
      [RoomCategory.AMENITIES]: [
        'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=600&auto=format',
        'https://images.unsplash.com/photo-1558521958-0a228e77e984?w=600&auto=format',
        'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=600&auto=format',
        'https://images.unsplash.com/photo-1525498128493-380d1990a112?w=600&auto=format'
      ],
      
      // Baños
      [RoomCategory.BATHROOM]: [
        'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&auto=format',
        'https://images.unsplash.com/photo-1604014237800-1c9102c219da?w=600&auto=format',
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&auto=format',
        'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=600&auto=format',
        'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=600&auto=format'
      ],
      
      // Jardines
      [RoomCategory.GARDEN]: [
        'https://images.unsplash.com/photo-1597221477227-a495c3b66b46?w=600&auto=format',
        'https://images.unsplash.com/photo-1626768674647-829343a81073?w=600&auto=format',
        'https://images.unsplash.com/photo-1625759879835-d2be1008d6b8?w=600&auto=format',
        'https://images.unsplash.com/photo-1586280268958-9483002d016a?w=600&auto=format',
        'https://images.unsplash.com/photo-1526738013590-63ae53d31425?w=600&auto=format',
        'https://images.unsplash.com/photo-1592991538534-37a3938841d1?w=600&auto=format'
      ]
    };

    private imageCache: Map<string, string[]> = new Map();


  constructor(
    private modalService: ModalService,
    private mapService: MapService
  ) {}

  ngOnInit(): void {
    this.modalService.watch().subscribe(display => {
      this.display = display;
      if (display === 'open') {
        this.activeTab = 'details';
        this.currentImageIndex = 0;
        // Limpiar caché si se cierra el modal
      } else if (display === 'close') {
        this.imageCache.clear();
      }
      this.checkForRoomImages();
    });
    
    this.modalService.getData().subscribe(data => {
      if (this.room?.id !== data?.id) {
        // Limpiar caché cuando cambia la habitación
        this.imageCache.clear();
      }
      this.room = data;
      this.checkForRoomImages();
    });
  }

  closeModal(): void {
    this.modalService.close();
  }

  setActiveTab(tabName: 'details' | 'location' | 'images'): void {
    this.activeTab = tabName;
  }

  // Determinar la categoría de la habitación
  getRoomCategory(roomId: string): RoomCategory {
    if (!roomId) return RoomCategory.COMMON_AREA;
    
    if (roomId.includes('room')) return RoomCategory.RESIDENTIAL;
    if (roomId.includes('mem')) return RoomCategory.MEMORY_CARE;
    if (roomId.includes('spec')) return RoomCategory.SPECIAL_CARE;
    if (roomId.includes('common') || roomId.includes('living') || 
        roomId.includes('dining') || roomId.includes('kitchen')) 
      return RoomCategory.COMMON_AREA;
    if (roomId.includes('nurse') || roomId.includes('medical') || 
        roomId.includes('therapy') || roomId.includes('monitor')) 
      return RoomCategory.HEALTHCARE;
    if (roomId.includes('office') || roomId.includes('admin') || 
        roomId.includes('reception') || roomId.includes('staff')) 
      return RoomCategory.ADMINISTRATIVE;
    if (roomId.includes('storage') || roomId.includes('shelf') || 
        roomId.includes('archive') || roomId.includes('equip')) 
      return RoomCategory.STORAGE;
    if (roomId.includes('generator') || roomId.includes('tech') || 
        roomId.includes('maintenance')) 
      return RoomCategory.TECHNICAL;
    
    return RoomCategory.AMENITIES;
  }

  // Obtener clase CSS para el header según categoría
  getCategoryClass(roomId: string): string {
    const category = this.getRoomCategory(roomId);
    return `header-${category.split('_')[0]}`;
  }

  // Obtener icono según el ID de la habitación
  getIcon(roomId: string): string {
    if (!roomId) return 'fas fa-question-circle';
    
    // Iconos específicos por tipo de habitación
    if (roomId.includes('room')) return 'fas fa-bed';
    if (roomId.includes('mem')) return 'fas fa-brain';
    if (roomId.includes('bath')) return 'fas fa-shower';
    if (roomId.includes('nurse')) return 'fas fa-user-nurse';
    if (roomId.includes('kitchen')) return 'fas fa-utensils';
    if (roomId.includes('dining')) return 'fas fa-utensils';
    if (roomId.includes('common') || roomId.includes('living')) return 'fas fa-couch';
    if (roomId.includes('medical')) return 'fas fa-pills';
    if (roomId.includes('office') || roomId.includes('admin')) return 'fas fa-briefcase';
    if (roomId.includes('reception')) return 'fas fa-bell-concierge';
    if (roomId.includes('activity')) return 'fas fa-users';
    if (roomId.includes('therapy')) return 'fas fa-hand-holding-medical';
    if (roomId.includes('garden')) return 'fas fa-tree';
    if (roomId.includes('laundry')) return 'fas fa-shirt';
    if (roomId.includes('storage')) return 'fas fa-box';
    
    return 'fas fa-door-open';
  }

  // Obtener el tipo de habitación
  getRoomType(roomId: string): string {
    if (!roomId) return 'Desconocido';
    
    if (roomId.includes('room')) {
      if (roomId.includes('101') || roomId.includes('102')) return 'Habitación individual adaptada';
      if (roomId.includes('103')) return 'Habitación doble adaptada';
      if (roomId.includes('104')) return 'Habitación individual estándar';
      if (roomId.includes('105')) return 'Habitación doble con balcón';
      return 'Habitación';
    }
    if (roomId.includes('mem')) return 'Habitación memoria';
    if (roomId.includes('spec')) return 'Habitación cuidados especiales';
    if (roomId.includes('bath')) return 'Baño';
    if (roomId.includes('common')) return 'Sala común';
    if (roomId.includes('living')) return 'Sala de estar';
    if (roomId.includes('dining')) return 'Comedor';
    if (roomId.includes('kitchen')) return 'Cocina';
    if (roomId.includes('nurse')) return 'Enfermería';
    if (roomId.includes('medical')) return 'Sala médica';
    if (roomId.includes('office')) return 'Oficina';
    if (roomId.includes('admin')) return 'Administración';
    if (roomId.includes('therapy')) return 'Sala de terapia';
    if (roomId.includes('activity')) return 'Sala de actividades';
    if (roomId.includes('library')) return 'Biblioteca';
    if (roomId.includes('garden')) return 'Jardín';
    if (roomId.includes('storage')) return 'Almacén';
    
    return 'Otro';
  }

  // Obtener la capacidad aproximada de la habitación
  getRoomCapacity(roomId: string): number {
    if (!roomId) return 0;
    
    if (roomId.includes('room')) {
      if (roomId.includes('102') || roomId.includes('104')) return 1;
      if (roomId.includes('103') || roomId.includes('105') || roomId.includes('107')) return 2;
    }
    if (roomId.includes('common') || roomId.includes('dining')) return 50;
    if (roomId.includes('activity')) return 30;
    if (roomId.includes('living')) return 20;
    if (roomId.includes('therapy')) return 10;
    if (roomId.includes('office')) return 4;
    if (roomId.includes('nurse')) return 6;
    
    return 0;
  }

  // Obtener características de la habitación
  getRoomFeatures(roomId: string): string[] {
    if (!roomId) return [];
    
    if (roomId.includes('room')) {
      if (roomId.includes('101') || roomId.includes('102')) 
        return ['Baño privado', 'Adaptada', 'Ventana'];
      if (roomId.includes('103')) 
        return ['Baño privado', 'Adaptada', 'Doble', 'Ventana'];
      if (roomId.includes('105')) 
        return ['Baño privado', 'Balcón', 'Doble', 'Armario'];
      if (roomId.includes('108')) 
        return ['Baño privado', 'Nevera', 'TV', 'Premium'];
    }
    if (roomId.includes('common')) 
      return ['TV', 'Sofás', 'Juegos', 'Climatización'];
    if (roomId.includes('dining')) 
      return ['Capacidad 50p', 'Autoservicio', 'Zona dietética'];
    if (roomId.includes('kitchen')) 
      return ['Industrial', 'Adaptada', 'Almacenamiento'];
    if (roomId.includes('garden')) 
      return ['Exterior', 'Caminos adaptados', 'Bancos'];
    if (roomId.includes('nurse')) 
      return ['Botiquín', 'Camas', 'Monitorización'];
    
    return [];
  }

  // Obtener información de contacto ficticia
  getContactInfo(): {name: string, phone: string} | null {
    // Solo mostramos contacto para habitaciones residenciales
    if (this.room && this.room.id.includes('room')) {
      // En un caso real, esto vendría del backend
      return {
        name: 'Dra. Laura Gómez',
        phone: '+34 912 345 678'
      };
    }
    return null;
  }

  // Obtener estado de ocupación ficticio
  getOccupancy(roomId: string): {isOccupied: boolean, occupantName?: string, since?: Date} | null {
    if (!roomId || !roomId.includes('room')) return null;
    
    // En un caso real, esto vendría del backend
    const occupiedRooms = ['room101', 'room103', 'room105', 'room107'];
    const isOccupied = occupiedRooms.includes(roomId);
    
    if (isOccupied) {
      return {
        isOccupied: true,
        occupantName: roomId === 'room101' ? 'Carmen García' : 
                     roomId === 'room103' ? 'Javier y María Torres' : 
                     roomId === 'room105' ? 'Antonio Pérez y Luis Sánchez' : 'Juan Rodríguez',
        since: new Date(2023, 5, 15) // 15 de junio de 2023
      };
    }
    
    return {
      isOccupied: false
    };
  }

  getAdjacentRooms(room: Room | null): Room[] {
    if (!room || room.x === undefined || room.y === undefined) return [];
    
    const allRooms = this.mapService.getRoomsByFloor(room.floor);
    
    return allRooms.filter(otherRoom => {
      if (otherRoom.id === room.id || 
          otherRoom.x === undefined || 
          otherRoom.y === undefined ||
          room.x === undefined ||
          room.y === undefined) return false; 
      
      const distance = Math.sqrt(
        Math.pow(otherRoom.x - room.x, 2) + Math.pow(otherRoom.y - room.y, 2)
      );
      
      return distance < 200; 
    }).slice(0, 4);
  }
  
  // Obtener nombre de la planta
  getFloorName(floorId: number): string {
    const floorNames = {
      1: 'Planta Pública',
      2: 'Planta Privada',
      3: 'Necesidades Especiales',
      4: 'Almacén'
    };
    
    return floorNames[floorId as keyof typeof floorNames] || `Planta ${floorId}`;
  }

  // Seleccionar una habitación
  selectRoom(room: Room): void {
    if (this.mapService) {
      this.closeModal();
      setTimeout(() => {
        this.mapService.selectRoom(room.id);
      }, 300);
    }
  }

  private checkForRoomImages(): void {
    if (!this.room) {
      this.hasRoomImages = false;
      return;
    }
    
    const images = this.getRoomImages();
    this.hasRoomImages = true;
    
    if (this.hasRoomImages && images.length > 0) {
      this.currentImage = images[0];
    }
  }
  
  getRoomImages(): string[] {
    if (!this.room?.id) return [];
    
    if (this.imageCache.has(this.room.id)) {
      return this.imageCache.get(this.room.id)!;
    }
    
    let images: string[];
    
    if (this.roomImagesMap[this.room.id]) {
      images = this.roomImagesMap[this.room.id];
    } else {
      const category = this.getRoomCategory(this.room.id);
      
      if (category) {
        let categoryImages = this.categoryImagesMap[category];
        
        if (this.room.id.includes('bath')) {
          categoryImages = this.categoryImagesMap[RoomCategory.BATHROOM];
        }
        
        if (this.room.id.includes('garden')) {
          categoryImages = this.categoryImagesMap[RoomCategory.GARDEN];
        }
        
        if (categoryImages?.length > 0) {
          const sourceImages = [...categoryImages];

          const hash = this.hashCode(this.room.id);
          const numImages = 2 + Math.abs(hash % 4); 
          
          this.deterministicShuffle(sourceImages, hash);
          
          images = sourceImages.slice(0, Math.min(numImages, sourceImages.length));
        } else {
          images = [
            'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&auto=format',
            'https://images.unsplash.com/photo-1564069114553-7215e1ff1890?w=600&auto=format'
          ];
        }
      } else {
        images = [
          'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&auto=format',
          'https://images.unsplash.com/photo-1564069114553-7215e1ff1890?w=600&auto=format'
        ];
      }
    }
    
    this.imageCache.set(this.room.id, images);
    
    return images;
  }

  private hashCode(str: string): number {
    let hash = 0;
    if (str.length === 0) return hash;
    
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; 
    }
    
    return hash;
  }

  private deterministicShuffle(array: any[], seed: number): void {
    let currentSeed = seed;
    
    for (let i = array.length - 1; i > 0; i--) {
      currentSeed = (currentSeed * 9301 + 49297) % 233280;
      const j = Math.floor((currentSeed / 233280) * (i + 1));
      
      // Intercambiar elementos
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  private shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
  // Seleccionar una imagen
  selectImage(index: number): void {
    const images = this.getRoomImages();
    if (index < images.length) {
      this.currentImageIndex = index;
      this.currentImage = images[index];
    }
  }
}