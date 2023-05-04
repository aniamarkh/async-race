import { Car, Cars, CarBody } from '../../types/types';
import { startEngine, stopEngine, drive } from '../api/api';
import { View } from '../view/view';
import { Model } from '../model/model';
import { generateCars } from '../utils/generate-cars';
import { getPageLayout, getGarageLayout, getWinnersLayout } from '../utils/templates/render-page';
import { animateCar, getDistanceBetweenElem } from '../utils/animation';

export class Controller {
  model: Model;

  view: View;

  constructor(model: Model, view: View) {
    this.model = model;
    this.view = view;
    this.model.init(this);
  }

  init() {
    this.view.renderPage(this);
    this.view.listenCarBtns(this);
    this.view.listenCreateCar(this);
    this.view.listenGenerateBtn(this);
    this.view.listenNextPage(this);
    this.view.listenPrevPage(this);
    this.view.listenRace(this);
  }

  async getCar(id: number): Promise<Car> {
    return this.model.getCarByID(id).then((res) => {
      return res;
    });
  }

  async getCars(): Promise<Cars> {
    return this.model.getCarsForPage().then((res) => {
      return res;
    });
  }

  async addCar(name: string, color: string): Promise<void> {
    this.model.createCar(name, color).then(() => {
      this.view.updateGarageContainer(this);
    });
  }

  async deleteCar(id: number) {
    this.model.deleteCar(id).then(() => {
      this.view.updateGarageContainer(this);
      this.model.deleteWinner(id).then(() => {
        this.view.updateWinnersContainer(this);
      });
    });
  }

  async updateCar(id: number, car: CarBody) {
    this.model.updateCar(id, car).then(() => {
      this.view.updateWinnersContainer(this);
      this.view.updateGarageContainer(this);
    });
  }

  async generateCars() {
    const generatedCars = generateCars();
    await Promise.all(generatedCars.map(async car => this.model.createCar(car.name, car.color)));
  }

  async getAnimationTime(id: number) {
    const { velocity, distance } = await startEngine(id);
    const time = Math.round(distance / velocity);
    return time;
  }

  async startDriving(id: number, car: HTMLElement, finish: HTMLElement, animationTime: number): Promise<{ success: boolean, id: number, animationTime: number }> {
    const distance = Math.floor(getDistanceBetweenElem(car, finish) + 50);
    this.model.animation[id] = animateCar(car, distance, animationTime);

    const { success } = await drive(id);
    if (!success) window.cancelAnimationFrame(this.model.animation[id].id);

    return { success, id, animationTime };
  }

  async stopDriving(id: number) {
    await stopEngine(id);
    if (this.model.animation[id]) window.cancelAnimationFrame(this.model.animation[id].id);
  }

  async saveWinner(id: number, time: number) {
    await this.model.saveWinner(id, time);
  }

  getCarsCount(): number {
    return this.model.carsCount;
  }

  getWinnersCount(): number {
    return this.model.carsCount;
  }

  getCarsPageCount(): number {
    return this.model.carsPage;
  }

  getWinnersPageCount(): number {
    return this.model.winnersPage;
  }

  getPagesLayouts() {
    const garage = getGarageLayout(this.model);
    const winners = getWinnersLayout(this.model);

    const pages: string = getPageLayout(garage, winners);
    return pages;
  }

  async updateGarage(): Promise<string> {
    let layout = '';
    return this.model.getCarsForPage()
      .then((res) => {
        this.model.cars = res.items;
        this.model.carsCount = Number(res.count);
        layout = getGarageLayout(this.model);
        return layout;
      });
  }

  async updateWinners(): Promise<string> {
    let layout = '';
    return this.model.getWinnersForPage()
      .then((res) => {
        this.model.winners = res.items;
        this.model.winnersCount = Number(res.count);
        layout = getWinnersLayout(this.model);
        return layout;
      });

  }

  setModelView(view: 'winners' | 'garage') {
    this.model.view = view;
  }

  setPage(view: 'winners' | 'garage', page: 'next' | 'prev') {
    if (view === 'winners') {
      if (page === 'next') {
        this.model.winnersPage += 1;
      } else if (page === 'prev') {
        this.model.winnersPage -= 1;
      }
    } else if (view === 'garage') {
      if (page === 'next') {
        this.model.carsPage += 1;
      } else if (page === 'prev') {
        this.model.carsPage -= 1;
      }
    }
  }

}