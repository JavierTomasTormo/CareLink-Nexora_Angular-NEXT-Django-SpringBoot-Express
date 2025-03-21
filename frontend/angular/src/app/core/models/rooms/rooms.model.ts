

export interface Room {
  id: string;
  name: string;
  description: string;
  polygonPoints?: string; 
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  floor: number;

}