export const exhibitPositions = [
  [-6.8, 0, -5.4],
  [-2.1, 0, -6.1],
  [2.6, 0, -5.5],
  [7.0, 0, -4.2],
  [7.2, 0, 0.8],
  [4.1, 0, 4.9],
  [0.0, 0, 6.4],
  [-4.1, 0, 4.9],
  [-7.2, 0, 0.8],
  [-7.0, 0, -1.9],
  [-2.4, 0, -1.2],
  [2.4, 0, -1.2],
]

export const getExhibitPosition = (rank) => exhibitPositions[rank - 1] ?? [0, 0, 0]

export const getCameraForExhibit = (rank) => {
  const [x, , z] = getExhibitPosition(rank)
  const centerPull = Math.atan2(-z, -x)
  const distance = 5.25
  const cameraX = x + Math.cos(centerPull) * distance
  const cameraZ = z + Math.sin(centerPull) * distance
  return {
    position: [cameraX, 3.45, cameraZ],
    target: [x, 1.45, z],
  }
}
