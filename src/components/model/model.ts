import { Car, CarBody, Cars, WinnerBody, Winners } from '../../types/types';
import { createCar, deleteCar, deleteWinner, getCar, getCars, getWinner, getWinners, saveWinner, updateCar, updateWinner } from '../api/api';
import { Controller } from '../controller/controller';

export class Model {
  carsPage: number;

  winnersPage: number;

  cars: Car[];

  carsCount: number;

  winners: WinnerBody[];

  winnersCount: number;

  animation: { [key: number]: { id: number } };

  view: string;

  constructor() {
    this.carsPage = 1;
    this.winnersPage = 1;
    this.cars = [];
    this.carsCount = 0;
    this.winners = [];
    this.winnersCount = 0;
    this.animation = {};
    this.view = 'garage';
  }

  async init(controller: Controller) {
    getCars(this.carsPage).then((res: Cars) => {
      this.cars = res.items;
      this.carsCount = Number(res.count);
    }).then(() => {
      getWinners(this.winnersPage).then((res: Winners) => {
        this.winners = res.items;
        this.winnersCount = Number(res.count);
      }).then(() => {
        controller.init();
      });
    });
  }

  async getCarByID(id: number): Promise<Car> {
    return getCar(id).then((res) => {
      return res;
    });
  }

  async getCarsForPage(): Promise<Cars> {
    return getCars(this.carsPage).then((res) => {
      return res;
    });
  }

  async getWinnersForPage(): Promise<Winners> {
    return getWinners(this.winnersPage).then((res) => {
      return res;
    });
  }

  async createCar(name: string, color: string): Promise<void> {
    await createCar({ name, color });
  }

  async deleteCar(id: number) {
    await deleteCar(id);
  }

  async deleteWinner(id: number) {
    await deleteWinner(id);
  }

  async updateCar(id: number, car: CarBody) {
    updateCar(id, car).then(() => {
      getWinner(id).then((res) => {
        if (res) {
          updateWinner(id, res);
        }
      });
    });
  }

  async saveWinner(id: number, time: number) {
    await saveWinner(id, time);
  }

}