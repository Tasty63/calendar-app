export const getClosestElement = (target: EventTarget, closestElementClass: string) => {
  if (!(target instanceof Element)) {
    return;
  }

  return target.closest(closestElementClass);
};
