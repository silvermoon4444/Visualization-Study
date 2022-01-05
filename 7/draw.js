export function drFill(
  points,
  context,
  { fillStyle = "black", close = false, rule = "nonzero" } = {}
) {
  context.beginPath();
  context.moveTo(...points[0]);
  for (let i = 1; i < points.length; i++) {
    context.lineTo(...points[i]);
  }
  if (close) context.closePath();
  context.fillStyle = fillStyle;
  context.fill(rule);
}
