import ImagesAssets from "../components/ImagesAssets";

export const renderAsset = (levels, indexRow, indexCol, type, hitungAssets, board) => {
  const assetType = levels.board[indexRow][indexCol];

  if (assetType === type) {
    const assetIndex = type - 2; // Assuming types start from 2
    const hitungAssetsValue = hitungAssets[assetIndex]++;
    const warna = assetIndex;

    return (
      <ImagesAssets
        warna={warna}
        jenis={'shop'}
        petak={board[indexRow][indexCol]}
      />
    );
  }

  return null;
};