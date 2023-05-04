const getElemPosition = (elem: HTMLElement) => {
  const { top, left, width, height } = elem.getBoundingClientRect();

  return {
    x: left + width / 2,
    y: top + height / 2,
  };
};

export const getDistanceBetweenElem = (a: HTMLElement, b: HTMLElement): number => {
  const aPosition = getElemPosition(a);
  const bPosition = getElemPosition(b);

  return Math.hypot(aPosition.x - bPosition.x, aPosition.y - bPosition.y);
};

export const animateCar = (car: HTMLElement, distance: number, animationTime: number): { id: number } => {
  let start: number | null = null;
  const state: { id: number; } = { id: 1 };

  const getStep = (timestamp: number) => {
    if (!start) start = timestamp;
    const time = timestamp - start;
    const passed = Math.round(time * (distance / animationTime));
    car.style.transform = `translateX(${Math.min(passed, distance)}px)`;

    if (passed < distance) state.id = window.requestAnimationFrame(getStep);
  };

  state.id = window.requestAnimationFrame(getStep);

  return state;
};