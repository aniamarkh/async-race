import { Car } from '../../../types/types';
import { Model } from '../../model/model';

export const getCarImg = (color: string): string => {
  const layout = `<?xml version='1.0' encoding = 'iso-8859-1' ?>
<svg version="1.1" xmlns = "http://www.w3.org/2000/svg" viewBox = "0 0 470 470"
xmlns: xlink = "http://www.w3.org/1999/xlink" enable - background="new 0 0 470 470" >
<g fill="${color}">
    <path
      d="m126.184,358.951c19.299,0 35-15.701 35-35s-15.701-35-35-35-35,15.701-35,35 15.701,35 35,35zm0-55c11.028,0 20,8.972 20,20s-8.972,20-20,20-20-8.972-20-20 8.971-20 20-20z" />
<path
      d="m343.816,288.951c-19.299,0-35,15.701-35,35s15.701,35 35,35 35-15.701 35-35-15.701-35-35-35zm0,55c-11.028,0-20-8.972-20-20s8.972-20 20-20 20,8.972 20,20-8.971,20-20,20z" />
<path
      d="m137.5,116.049h23.779c4.143,0 7.5-3.358 7.5-7.5s-3.357-7.5-7.5-7.5h-23.779c-10.423,0-27.031,7.176-34.177,14.767l-60.088,63.845c-2.051,2.179-2.609,5.368-1.423,8.115 1.187,2.747 3.893,4.525 6.885,4.525h290.271c2.562,0 4.945-1.307 6.323-3.467 1.377-2.159 1.558-4.873 0.478-7.195l-30.854-66.365c-3.315-7.046-14.628-14.225-22.415-14.225h-101.221c-4.143,0-7.5,3.358-7.5,7.5l-.001,68.752h-117.722l48.19-51.204c4.243-4.508 17.066-10.048 23.254-10.048zm61.279,0h93.7c2.203,0.103 7.842,3.681 8.849,5.581l25.883,55.671h-128.433l.001-61.252z" />
<path
      d="m470,257.692c0-26.631-20.555-55.149-45.819-63.57-0.017-0.006-35.078-11.693-35.078-11.693-5.854-1.951-13.576-8.812-16.203-14.394l-30.84-65.535c-8.299-17.636-30.068-31.451-49.56-31.451h-155c-18.639,0-43.247,10.632-56.022,24.206l-69.158,73.482c-6.909,7.34-12.32,20.984-12.32,31.064v94.15c0,20.678 16.822,37.5 37.5,37.5h14.06c3.775,37.846 35.8,67.5 74.624,67.5s70.849-29.654 74.624-67.5h45.509c4.143,0 7.5-3.358 7.5-7.5s-3.357-7.5-7.5-7.5h-45.509c-3.775-37.846-35.8-67.5-74.624-67.5s-70.849,29.654-74.624,67.5h-14.06c-12.406,0-22.5-10.093-22.5-22.5v-94.15c0-6.294 3.929-16.2 8.242-20.783l69.159-73.483c9.941-10.563 30.594-19.486 45.099-19.486h155c13.682,0 30.162,10.458 35.987,22.838l30.84,65.535c4.421,9.395 15.182,18.955 25.031,22.238l28.498,9.499c-0.492,2.841-0.748,5.729-0.748,8.642 0,25.238 18.65,46.198 42.892,49.831v29.32c0,12.407-8.357,22.5-18.631,22.5h-17.929c-3.775-37.846-35.8-67.5-74.624-67.5-41.355,0-75,33.645-75,75s33.645,75 75,75c38.824,0 70.849-29.654 74.624-67.5h17.929c18.544,0 33.631-16.822 33.631-37.5v-36.26zm-343.816,6.259c33.084,0 60,26.916 60,60s-26.916,60-60,60-60-26.916-60-60 26.916-60 60-60zm217.632,120c-33.084,0-60-26.916-60-60s26.916-60 60-60 60,26.916 60,60-26.916,60-60,60zm83.292-169.15c0-0.969 0.04-1.934 0.117-2.893 13.16,7.627 23.787,22.37 26.864,37.266-15.466-3.785-26.981-17.756-26.981-34.373z" />
</g>
</svg>
`;
  return layout;
};

export const getCarLayout = ({ id, name, color }: Car): string => {
  const layout = `
  <div class="car">
    <div class="car__btns">
      <button class="btn btn--select" id="select-car-${id}">Select</button>
      <button class="btn btn--remove" id="remove-car-${id}">Remove</button>
      <button class="btn btn--start" id="start-engine-${id}">
          start
      </button>
      <button class="btn btn--stop" id = "stop-engine-${id}" disabled>
          stop
      </button>
      <span class="car__name">${name}</span>
    </div>
    <div class="car__road">
      <div class="car__img" id = "car-${id}">
        ${getCarImg(color)}
      </div>
      <div class="finish__img" id = "finish-${id}">
        <img src="assets/race-flag-15.gif" alt = "finish" />
      </div>
    </div>
  </div>
  `;
  return layout;
};

export const getWinnersLayout = (model: Model): string => {
  const layout = `
  <h2 class='title'><span class="material-symbols-outlined">
  star
  </span>Winners (${model.winnersCount})</h2>
  <p class='text'>Page #${model.winnersPage}</p>
  <table class='table' cellspacing='0' border='0' cellpadding='0'>
    <thead>
      <th>Number</th>
      <th>Car</th>
      <th>Name</th>
      <th>Wins</th>
      <th>Best time(sec)</th>
    </thead>
    <tbody>
      ${model.winners.map((winner, i) => `
        <tr>
          <td>${`${model.winnersPage === 1 ? '' : model.winnersPage - 1}${i + 1}`}</td>
          <td>${getCarImg(winner.car.color)}</td>
          <td>${winner.car.name}</td>
          <td>${winner.wins}</td>
          <td>${winner.time}</td>
        </tr>
        `).join('')}
    </tbody>
  </table>
  <div class='pagination'>
    <button class='btn winners-btn' id='prev-win' disabled>PREV</button>
    <button class='btn winners-btn' id='next-win' disabled>NEXT</button>
  </div>
`;
  return layout;
};

export const getGarageLayout = (model: Model): string => {
  const layout = `
  <h2 class="title"> 
    <span class="material-symbols-outlined">
      directions_car
    </span>Garage (${model.carsCount} cars)
  </h2>
  <p class="text">Page #${model.carsPage}</p>
  <ul class="garage__cars">
    ${model.cars.map((car: Car) => `<li>${getCarLayout(car)}</li>`).join('')}
  </ul>
  `;
  return layout;
};
export const getPageLayout = (garageLayout: string, winnersLayout: string): string => {
  const layout = `
  <header class="header">
    <button type="button" class="btn header__garage" disabled>To Garage</button>
    <button type="button" class="btn header__winners">To Winners</button>
  </header>

  <main class="container">
    <div class="garage-view">
      <div class="garage-view__container">
        <div class="garage-view__forms">
          <form class="form from--create" id="form-create">
            <input class="input" id="create-name" name="name" type="text" required />
            <input class="color" id="create-color" name="color" type="color" value="#ffffff" />
            <button class="btn" type="submit">Create</button>
          </form>
          <form class="form form--update" id="form-update">
            <input class="input" id="update-name" name="name" type="text" disabled />
            <input class="color" id="update-color" name="color" type="color" value="#ffffff" disabled />
            <button class="btn" id="update-btn" type="submit" disabled>Update</button>
          </form>
          <div class="controls">
            <button class="btn controls--race" id="race">Race</button>
            <button class="btn controls--reset" id="reset" disabled>Reset</button>
            <button class="btn controls--gen" id="generate">Generate</button>
          </div>
        </div>

        <div class="garage-view__modal">
          <h2 class="winner-message hidden"></h2>
        </div>
      </div>
      <div class="garage-container">
      ${garageLayout}
      </div>
      <div class="pagination">
        <button class="btn btn--prev" id="prev" disabled>PREV</button>
        <button class="btn btn--next" id="next" disabled>NEXT</button>
      </div>
    </div>
    <div class="winners-view hidden">
      ${winnersLayout}
    </div>
  </main>
`;
  return layout;
};