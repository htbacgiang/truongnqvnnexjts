function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffleWithSeed(items, seed) {
  const rand = mulberry32(seed);
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Build garden cells with wishes:
 * - Keep any prefilled `cell.wishes` as-is.
 * - Fill other cells from pool, targeting 2-3 wishes/cell (configurable).
 * - Distribution is deterministic with a seed.
 */
export function buildEmotionGarden({
  cells,
  poolWishes,
  seed = 2026,
  minPerCell = 2,
  maxPerCell = 3,
}) {
  const safeCells = (cells || []).map((c) => ({
    ...c,
    wishes: Array.isArray(c.wishes) ? [...c.wishes] : [],
  }));

  const taken = new Set();
  for (const c of safeCells) {
    for (const w of c.wishes) taken.add(w);
  }

  const remainingPool = (poolWishes || []).filter((w) => !taken.has(w));
  const shuffledPool = shuffleWithSeed(remainingPool, seed);

  let cursor = 0;
  const takeOne = () => {
    if (cursor >= shuffledPool.length) return null;
    const w = shuffledPool[cursor];
    cursor += 1;
    return w;
  };

  // Pass 1: ensure minPerCell for every cell (except those already above min).
  for (const c of safeCells) {
    while (c.wishes.length < minPerCell) {
      const w = takeOne();
      if (!w) break;
      c.wishes.push(w);
    }
  }

  // Pass 2: distribute remaining up to maxPerCell.
  // Round-robin by id for stable feel.
  const roundRobin = [...safeCells].sort((a, b) => (a.id ?? 0) - (b.id ?? 0));
  let progressed = true;
  while (cursor < shuffledPool.length && progressed) {
    progressed = false;
    for (const c of roundRobin) {
      if (cursor >= shuffledPool.length) break;
      if (c.wishes.length >= maxPerCell) continue;
      const w = takeOne();
      if (!w) break;
      c.wishes.push(w);
      progressed = true;
    }
  }

  // If there are still leftover wishes (e.g., many prefilled cells),
  // put them into the special cell (id: 9) as an "extra wish" stack.
  const special = safeCells.find((c) => c.id === 9) || safeCells[0];
  while (cursor < shuffledPool.length) {
    const w = takeOne();
    if (!w) break;
    special.wishes.push(w);
  }

  return safeCells;
}

export function coerceSeed(value, fallback = 2026) {
  const n = Number(value);
  if (!Number.isFinite(n)) return fallback;
  return Math.floor(n) || fallback;
}


