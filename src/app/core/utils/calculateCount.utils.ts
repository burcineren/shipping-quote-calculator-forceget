export const convertInchesToCm = (inches: number): number => {
  return inches * 2.54;
};

export const calculateCounts = (packageType: string, mode: string): { boxCount: number | null; palletCount: number | null } => {
  const carton = { width: convertInchesToCm(12), length: convertInchesToCm(12), height: convertInchesToCm(12) };
  const box = { width: convertInchesToCm(24), length: convertInchesToCm(16), height: convertInchesToCm(12) };
  const pallet = { width: convertInchesToCm(40), length: convertInchesToCm(48), height: convertInchesToCm(60) };

  let boxCount: number | null = null;
  let palletCount: number | null = null;

  if (packageType === "Cartons") {
    boxCount = Math.floor(box.width / carton.width) *
      Math.floor(box.length / carton.length) *
      Math.floor(box.height / carton.height);
    palletCount = Math.floor(pallet.width / box.width) *
      Math.floor(pallet.length / box.length) *
      Math.floor(pallet.height / box.height);
  } else if (packageType === "Boxes") {
    palletCount = Math.floor(pallet.width / box.width) *
      Math.floor(pallet.length / box.length) *
      Math.floor(pallet.height / box.height);
  } else if (packageType === "Pallets") {
    palletCount = 1;
  }

  return { boxCount, palletCount };
}