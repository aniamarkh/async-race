import { Car, CarBody, Cars } from '../../types/types';
import { Controller } from '../controller/controller';

export class View {

  renderPage = (controller: Controller): void => {
    const layout = controller.getPagesLayouts();
    document.body.innerHTML = layout;
    const nextBtnGarage = <HTMLButtonElement>document.getElementById('next');
    const nextBtnWin = <HTMLButtonElement>document.getElementById('next-win');

    this.listenWinners(controller);
    if (controller.getCarsCount() > 7) {
      nextBtnGarage.disabled = false;
    }
    if (controller.getWinnersCount() > 10) {
      nextBtnWin.disabled = false;
    }
  };

  async updateGarageContainer(controller: Controller) {
    const garageContainer = document.querySelector('.garage-container');
    const nextBtn = <HTMLButtonElement>document.getElementById('next');
    const prevBtn = <HTMLButtonElement>document.getElementById('prev');

    const layout = await controller.updateGarage();

    if (garageContainer) {
      garageContainer.innerHTML = layout;
    }

    if (controller.getCarsPageCount() < (controller.getCarsCount() / 7)) {
      nextBtn.disabled = false;
    } else {
      nextBtn.disabled = true;
    }

    if (controller.getCarsPageCount() !== 1) {
      prevBtn.disabled = false;
    } else {
      prevBtn.disabled = true;
    }
  }

  async updateWinnersContainer(controller: Controller) {
    const winnersView = document.querySelector('.winners-view');
    const layout = await controller.updateWinners();

    if (winnersView) {
      winnersView.innerHTML = layout;

      const nextBtnWin = <HTMLButtonElement>document.getElementById('next-win');
      const prevBtnWin = <HTMLButtonElement>document.getElementById('prev-win');


      if (controller.getWinnersPageCount() < (controller.getWinnersCount() / 10)) {
        nextBtnWin.disabled = false;
      } else {
        nextBtnWin.disabled = true;
      }

      if (controller.getWinnersPageCount() !== 1) {
        prevBtnWin.disabled = false;
      } else {
        prevBtnWin.disabled = true;
      }

      this.listenPrevPageWin(controller);
      this.listenNextPageWin(controller);
    }

  }

  listenWinners(controller: Controller) {
    const winBtn = document.querySelector<HTMLButtonElement>('.header__winners');
    const garageBtn = document.querySelector<HTMLButtonElement>('.header__garage');
    const winnersContainer = document.querySelector<HTMLElement>('.winners-view');
    const garageContainer = document.querySelector<HTMLElement>('.garage-view');

    if (winBtn && garageBtn && winnersContainer && garageContainer) {
      winBtn.addEventListener('click', () => {
        winnersContainer.classList.remove('hidden');
        garageContainer.classList.add('hidden');
        controller.setModelView('winners');

        garageBtn.disabled = false;
        winBtn.disabled = true;

        this.listenGarage(controller);
      });
    }
  }

  listenGarage(controller: Controller) {
    const winBtn = document.querySelector<HTMLButtonElement>('.header__winners');
    const garageBtn = document.querySelector<HTMLButtonElement>('.header__garage');
    const winnersContainer = document.querySelector<HTMLElement>('.winners-view');
    const garageContainer = document.querySelector<HTMLElement>('.garage-view');

    if (winBtn && garageBtn && winnersContainer && garageContainer) {
      garageBtn.addEventListener('click', () => {
        winnersContainer.classList.add('hidden');
        garageContainer.classList.remove('hidden');
        controller.setModelView('garage');

        garageBtn.disabled = true;
        winBtn.disabled = false;

        this.listenWinners(controller);
      });
    }
  }

  listenCreateCar(controller: Controller): void {
    const createForm = document.getElementById('form-create');
    const nameInput = <HTMLInputElement>(document.getElementById('create-name'));
    const colorInput = <HTMLInputElement>(document.getElementById('create-color'));

    if (createForm) {
      createForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const name = nameInput.value;
        const color = colorInput.value;
        if (name && color) controller.addCar(name, color);
        nameInput.value = '';
      });
    }
  }

  listenUpdateCar(controller: Controller, id: number): void {
    const updateForm = document.getElementById('form-update');
    const nameInput = <HTMLInputElement>(document.getElementById('update-name'));
    const colorInput = <HTMLInputElement>(document.getElementById('update-color'));
    const submitBtn = <HTMLButtonElement>(document.getElementById('update-btn'));
    nameInput.disabled = false;
    colorInput.disabled = false;
    submitBtn.disabled = false;
    if (updateForm) {
      updateForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const name = nameInput.value;
        const color = colorInput.value;
        const currentCar = await controller.getCar(id);


        const car: CarBody = {
          name: name ? name : currentCar.name,
          color: color,
        };
        controller.updateCar(id, car);

        nameInput.value = '';
        nameInput.disabled = true;
        colorInput.disabled = true;
        submitBtn.disabled = true;
      });
    }
  }

  listenCarBtns(controller: Controller): void {
    window.addEventListener('click', async (event) => {
      const eventTarget = <HTMLElement>event.target;
      const id = Number(eventTarget.id.split('-')[2]);
      switch (eventTarget.className) {
        case 'btn btn--remove':
          controller.deleteCar(id);
          break;

        case 'btn btn--select':
          this.listenUpdateCar(controller, id);
          break;

        case 'btn btn--start':
          this.startDriving(controller, id);
          break;

        case 'btn btn--stop':
          this.stopDriving(controller, id);
          break;
      }
    });
  }

  listenGenerateBtn(controller: Controller) {
    const generateBtn = <HTMLButtonElement>document.getElementById('generate');
    if (generateBtn) {
      generateBtn.addEventListener('click', async () => {
        generateBtn.disabled = true;
        await controller.generateCars();
        await this.updateGarageContainer(controller);
        const nextBtn = <HTMLButtonElement>document.getElementById('next');
        nextBtn.disabled = false;
        generateBtn.disabled = false;
      });
    }
  }

  resetRaceResetBtns() {
    const raceBtn = <HTMLButtonElement>(document.getElementById('race'));
    const resetBtn = <HTMLButtonElement>(document.getElementById('reset'));
    resetBtn.disabled = true;
    raceBtn.disabled = false;
  }

  listenNextPage(controller: Controller) {
    const nextBtn = <HTMLButtonElement>document.getElementById('next');

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        controller.setPage('garage', 'next');
        this.resetRaceResetBtns();
        this.updateGarageContainer(controller);
      });
    }
  }

  listenNextPageWin(controller: Controller) {
    const nextBtnWin = <HTMLButtonElement>document.getElementById('next-win');

    if (nextBtnWin) {
      nextBtnWin.addEventListener('click', () => {
        controller.setPage('winners', 'next');
        this.updateWinnersContainer(controller);
      });
    }
  }

  listenPrevPage(controller: Controller) {
    const prevBtn = <HTMLButtonElement>document.getElementById('prev');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        this.resetRaceResetBtns();

        if (controller.getCarsPageCount() > 1) {
          controller.setPage('garage', 'prev');
          this.updateGarageContainer(controller);
        }
      });
    }
  }

  listenPrevPageWin(controller: Controller) {
    const prevBtnWin = <HTMLButtonElement>document.getElementById('prev-win');


    if (prevBtnWin) {
      prevBtnWin.addEventListener('click', () => {
        controller.setPage('winners', 'prev');
        this.updateWinnersContainer(controller);
      });
    }
  }

  async startDriving(controller: Controller, id: number) {
    const startBtn = <HTMLButtonElement>(document.getElementById(`start-engine-${id}`));
    const stopBtn = <HTMLButtonElement>(document.getElementById(`stop-engine-${id}`));

    startBtn.disabled = true;
    stopBtn.disabled = false;

    const animationTime = await controller.getAnimationTime(id);
    const car = document.getElementById(`car-${id}`);
    const finish = document.getElementById(`finish-${id}`);

    if (car && finish) {
      return controller.startDriving(id, car, finish, animationTime);
    }
  }

  async stopDriving(controller: Controller, id: number) {
    const startBtn = <HTMLButtonElement>(document.getElementById(`start-engine-${id}`));
    const stopBtn = <HTMLButtonElement>(document.getElementById(`stop-engine-${id}`));
    startBtn.disabled = false;
    stopBtn.disabled = true;

    await controller.stopDriving(id);

    const car = document.getElementById(`car-${id}`);
    if (car) {
      car.style.transform = 'translateX(0)';
    }
  }

  listenRace(controller: Controller) {
    const raceBtn = <HTMLButtonElement>(document.getElementById('race'));
    const resetBtn = <HTMLButtonElement>(document.getElementById('reset'));
    let raceResult: {
      success: boolean;
      id: number;
      animationTime: number
    } | undefined;

    let winnerTime: number;

    raceBtn.addEventListener('click', async () => {
      let isWinner = false;

      resetBtn.disabled = false;
      raceBtn.disabled = true;

      const cars = await controller.getCars();
      cars.items.forEach(async (car: Car) => {
        raceResult = await this.startDriving(controller, car.id);

        if (raceResult && raceResult.success && !isWinner) {
          isWinner = true;
          winnerTime = Number((raceResult.animationTime / 1000).toFixed(1));

          this.showWinnerMessage(car.name, winnerTime);
          await controller.saveWinner(raceResult.id, winnerTime);
          this.updateWinnersContainer(controller);
        }
      });

      this.listenReset(controller, cars);
    });
  }

  showWinnerMessage(name: string, time: number) {
    const message = document.querySelector<HTMLElement>('.winner-message');
    const messageText = `The winner is ${name}, time is ${time}`;
    if (message) {
      message.classList.remove('hidden');
      message.innerHTML = messageText;
      setTimeout(() => {
        message?.classList.add('hidden');
      }, 3000);
    }
  }

  listenReset(controller: Controller, cars: Cars) {
    const raceBtn = <HTMLButtonElement>(document.getElementById('race'));
    const resetBtn = <HTMLButtonElement>(document.getElementById('reset'));

    resetBtn.addEventListener('click', async () => {
      resetBtn.disabled = true;
      raceBtn.disabled = false;
      cars.items.forEach((car: Car) => {
        this.stopDriving(controller, car.id);
      });
    });
  }

}
