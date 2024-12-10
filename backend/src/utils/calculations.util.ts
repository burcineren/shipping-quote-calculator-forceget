export const utilCalculateBoxCount = (carton: any, box: any): number => {
    if (!carton || !box) throw new Error("Invalid dimensions for box count calculation.");
    return (
        Math.floor(box.width / carton.width) *
        Math.floor(box.length / carton.length) *
        Math.floor(box.height / carton.height)
    );
};

export const utilCalculatePalletCount = (box: any, pallet: any): number => {
    if (!box || !pallet) throw new Error("Invalid dimensions for pallet count calculation.");
    return (
        Math.floor(pallet.width / box.width) *
        Math.floor(pallet.length / box.length) *
        Math.floor(pallet.height / box.height)
    );
};