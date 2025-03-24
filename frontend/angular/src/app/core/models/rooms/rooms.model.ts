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
  type_room?: string;
  num_room?: number;
  availability?: string;
  isactive?: number;
  createdat?: Date;
  updatedat?: Date;
  capacity?: number;
}

// export interface Room {
//   id: string;
//   name: string;
//   description: string;
//   polygonPoints?: string; 
//   x?: number;
//   y?: number;
//   width?: number;
//   height?: number;
//   floor: number;

// }