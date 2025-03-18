// export interface Room {
//     id: string;
//     name: string;
//     polygonPoints: string; // formato SVG para los puntos del polígono
//     description?: string;
//     isActive?: boolean;
//   }

export interface Room {
  id: string;
  name: string;
  description: string;
  polygonPoints?: string; // Para habitaciones con forma de polígono
  x?: number;             // Para habitaciones rectangulares
  y?: number;
  width?: number;
  height?: number;
}