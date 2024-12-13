export const convertDimensionsToCm = (dimensions: { width: number; length: number; height: number }) => {
    return {
      width: dimensions.width * 2.54,
      length: dimensions.length * 2.54,
      height: dimensions.height * 2.54,
    };
  };
 export const calculateBoxCount = (
    carton: { width: number; length: number; height: number },
    box: { width: number; length: number; height: number }
  ): number => {
    return (
      Math.floor(box.width / carton.width) *
      Math.floor(box.length / carton.length) *
      Math.floor(box.height / carton.height)
    );
  };
 export const calculatePalletCount = (
    box: { width: number; length: number; height: number },
    pallet: { width: number; length: number; height: number }
  ): number => {
    return (
      Math.floor(pallet.width / box.width) *
      Math.floor(pallet.length / box.length) *
      Math.floor(pallet.height / box.height)
    );
  };