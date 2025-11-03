
export interface Component {
  id: string;
  name: string;
  type: 'cpu' | 'gpu' | 'ram' | 'storage' | 'motherboard' | 'psu' | 'case' | 'cooling';
  brand: string;
  price: number;
  description: string;
  specs: string[];
}

export interface PCConfiguration {
  id: string;
  name: string;
  price: number;
  category: 'entry' | 'mid' | 'high';
  type: 'prebuild' | 'custom';
  description: string;
  performance: string;
  imageUrl: string;
  components: Component[];
  recommended: boolean;
}

export type ConfigCategory = 'all' | 'entry' | 'mid' | 'high';
export type ConfigType = 'all' | 'prebuild' | 'custom';
