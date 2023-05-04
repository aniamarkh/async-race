import { Car, Cars, Engine, Winners, Winner, CarBody } from '../../types/types';

const base = 'http://localhost:3000';

export const getCars = async (page: number, limit = 7): Promise<Cars> => {
  const responseponse = await fetch(`${base}/garage/?_page=${page}&_limit=${limit}`);

  return {
    items: await responseponse.json(),
    count: responseponse.headers.get('X-Total-Count'),
  };
};

export const getCar = async (id: number): Promise<Car> => (await fetch(`${base}/garage/${id}`)).json();

export const createCar = async (car: CarBody): Promise<Car> => (await fetch(`${base}/garage`, {
  method: 'POST',
  body: JSON.stringify(car),
  headers: {
    'Content-Type': 'application/json',
  },
})).json();

export const deleteCar = async (id: number): Promise<Car> => (await fetch(`${base}/garage/${id}`, {
  method: 'DELETE',
})).json();

export const updateCar = async (id: number, body: CarBody): Promise<Car> => (await fetch(`${base}/garage/${id}`, {
  method: 'PUT',
  body: JSON.stringify(body),
  headers: {
    'Content-Type': 'application/json',
  },
})).json();

export const startEngine = async (id: number): Promise<Engine> => (await fetch(`${base}/engine?id=${id}&status=started`, { method: 'PATCH' })).json();

export const stopEngine = async (id: number): Promise<Engine> => (await fetch(`${base}/engine?id=${id}&status=stopped`, { method: 'PATCH' })).json();

export const drive = async (id: number): Promise<{ success: boolean }> => {
  const response = await fetch(`${base}/engine?id=${id}&status=drive`, { method: 'PATCH' }).catch();
  return response.status !== 200 ? { success: false } : { ...(await response.json()) };
};

export const getSortOrder = (sort: string | undefined, order: string | undefined): string => {
  if (sort && order) return `&_sort=${sort}&_order=${order}`;
  return '';
};

export const getWinners =
  async (page: number, limit = 10): Promise<Winners> => {
    const response = await fetch(`${base}/winners?_page=${page}&_limit=${limit}}`);
    const items = await response.json();

    return {
      items: await Promise.all(items.map(async (winner: Winner) =>
        ({ ...winner, car: await getCar(winner.id) }))),
      count: response.headers.get('X-Total-Count'),
    };
  };

export const getWinner = async (id: number): Promise<Winner> => (await fetch(`${base}/winners/${id}`)).json();

export const getWinnerStatus = async (id: number): Promise<number> => (await fetch(`${base}/winners/${id}`)).status;

export const deleteWinner = async (id: number): Promise<void> => (await fetch(`${base}/winners/${id}`, { method: 'DELETE' })).json();

export const createWinner = async (body: Winner): Promise<void> => (await fetch(`${base}/winners`, {
  method: 'POST',
  body: JSON.stringify(body),
  headers: {
    'Content-Type': 'application/json',
  },
})).json();

export const updateWinner = async (id: number, body: Winner): Promise<void> => (await fetch(`${base}/winners/${id}`, {
  method: 'PUT',
  body: JSON.stringify(body),
  headers: {
    'Content-Type': 'application/json',
  },
})).json();

export const saveWinner = async (id: number, time: number): Promise<void> => {
  const winnerStatus = await getWinnerStatus(id);

  if (winnerStatus === 404) {
    await createWinner({
      id,
      wins: 1,
      time,
    });
  } else {
    const winner = await getWinner(id);
    await updateWinner(id, {
      id,
      wins: winner.wins + 1,
      time: time < winner.time ? time : winner.time,
    });
  }
};