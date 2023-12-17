import Image from 'next/image';

export default function ImagesAssets({ warna, jenis, petak }) {
  if (warna == 0) {
    if (jenis == 'shop')
      return (
        <Image
          src={`/assets/green-shop.png`}
          alt='green-shop'
          width={32}
          height={32}
          className={petak != -2? 'animate-pulse' : undefined}
        />
      );
    else {
      return (
        <Image
          src={`/assets/green-warehouse.png`}
          alt='green=warehouse'
          width={32}
          height={32}
          className={petak != -2? 'animate-pulse' : undefined}
        />
      );
    }
  }
  if (warna == 1) {
    if (jenis == 'shop')
      return (
        <Image
          src={`/assets/blue-shop.png`}
          alt='blue-shop'
          width={32}
          height={32}
          className={petak != -3? 'animate-pulse' : undefined}
        />
      );
    else {
      return (
        <Image
          src={`/assets/blue-warehouse.png`}
          alt='blue-warehouse'
          width={32}
          height={32}
          className={petak != -3? 'animate-pulse' : undefined}
        />
      );
    }
  }
  if (warna == 2) {
    if (jenis == 'shop')
      return (
        <Image
          src={`/assets/yellow-shop.png`}
          alt='yellow-shop'
          width={32}
          height={32}
          className={petak != -4? 'animate-pulse' : undefined}
        />
      );
    else {
      return (
        <Image
          src={`/assets/yellow-warehouse.png`}
          alt='yellow-warehouse'
          width={32}
          height={32}
          className={petak != -4? 'animate-pulse' : undefined}
        />
      );
    }
  }
  if (warna == 3) {
    if (jenis == 'shop')
      return (
        <Image
          src={`/assets/purple-shop.png`}
          alt='purple-shop'
          width={32}
          height={32}
          className={petak != -5? 'animate-pulse' : undefined}
        />
      );
    else {
      return (
        <Image
          src={`/assets/purple-warehouse.png`}
          alt='purple-warehouse'
          width={32}
          height={32}
          className={petak != -5? 'animate-pulse' : undefined}
        />
      );
    }
  }
  if (warna == 4) {
    if (jenis == 'shop')
      return (
        <Image
          src={`/assets/gray-shop.png`}
          alt='black-shop'
          width={32}
          height={32}
          className={petak != -6? 'animate-pulse' : undefined}
        />
      );
    else {
      return (
        <Image
          src={`/assets/gray-warehouse.png`}
          alt='black-warehouse'
          width={32}
          height={32}
          className={petak != -6? 'animate-pulse' : undefined}
        />
      );
    }
  }
  
}