export interface Room {
    id: string;
    name: string;
    polygonPoints: string; // formato SVG para los puntos del polígono
    description?: string;
    isActive?: boolean;
  }