export interface Car {
  name: string;
  color: string;
  id: number;
}

export interface CarBody {
  name: string,
  color: string,
}

export interface Cars {
  items: [];
  count: string | null;
}

export interface Engine {
  velocity: number;
  distance: number
}

export interface Winner {
  id: number;
  time: number;
  wins: number;
}

export interface Winners {
  items: WinnerBody[];
  count: string | null;
}

export interface WinnerBody {
  car: Car;
  id: number;
  time: number;
  wins: number;
}

export interface DrivingStatus {
  success: boolean;
  id: number;
  time: number;
}

export interface RaceStatus {
  name: string;
  color: string;
  id: number;
  time: number;
}