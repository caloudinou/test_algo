const errorNoBestWay = "no best way"

/**
 * skip the current way if is not the best
 * @param maxSeeds
 * @param seedsCurrentWay
 * @return {boolean}
 */
function skipWay (maxSeeds, seedsCurrentWay) {
  return maxSeeds >= seedsCurrentWay
}

/**
 * iteration on all way
 * @param chessboard
 * @param mapMaxSeeds
 * @param posx
 * @param posy
 * @param currentSeeds
 * @return {string|void}
 */
function iter(chessboard, mapMaxSeeds, posx, posy, currentSeeds) {
  currentSeeds += chessboard[posx][posy];

  if (skipWay(mapMaxSeeds[posx][posy], currentSeeds)) {
    return errorNoBestWay
  }

  mapMaxSeeds[posx][posy] = currentSeeds
  // right
  if ( posx + 1 < chessboard[0].length) {
    iter (chessboard, mapMaxSeeds, posx+1, posy, currentSeeds)
  }

  //down
  if ( posy + 1 < chessboard.length) {
    iter (chessboard, mapMaxSeeds, posx, posy+1, currentSeeds)
  }

}

/**
 * sum seeds collected on the best way
 * @param chessboard
 * @return {number}
 */
function best(chessboard) {
  const H = chessboard.length
  const L = chessboard[0].length

  const mapMaxSeedsCollected = createNewMap(H, L)

  iter(chessboard, mapMaxSeedsCollected, 0, 0, 0)
  return mapMaxSeedsCollected[H-1][L-1]
}

/**
 * create a new map
 * @param height
 * @param width
 * @return {[]}
 */
function createNewMap(height = 0, width = 0) {
  const map = []
  for (let i = 0; i < height; i ++) {
    const x = [];
    for (let j = 0; j < width; j++) {
      x.push(-1);
    }
    map.push(x);
  }
  return map
}

// exemple 1
console.log(
  best([
    [1, 2, 3],
    [4, 5, 6],
    [7, 0, 9]
  ])
)

// exemple 2
console.log(
  best([
    [0, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1]
  ])
)