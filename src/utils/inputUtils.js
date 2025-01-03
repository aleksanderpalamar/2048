export function handleSwipeGesture(startX, startY, endX, endY) {
  const dx = endX - startX;
  const dy = endY - startY;
  const absDx = Math.abs(dx);
  const absDy = Math.abs(dy);

  if (Math.max(absDx, absDy) > 50) {
      if (absDx > absDy) {
          return dx > 0 ? 'right' : 'left';
      } else {
          return dy > 0 ? 'down' : 'up';
      }
  }
  return null;
}

