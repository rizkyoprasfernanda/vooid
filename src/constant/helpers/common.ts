import {Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window'); // Ambil tinggi dan lebar layar perangkat

interface DimensionPercentage {
  (percentage: number): number;
}

const hp: DimensionPercentage = percentage => {
  return (percentage * height) / 100; // Menghitung persentase tinggi
};

interface DimensionPercentage {
  (percentage: number): number;
}

const wp: DimensionPercentage = percentage => {
  return (percentage * width) / 100; // Menghitung persentase lebar
};

export {hp, wp};
