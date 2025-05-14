interface _Doc {
  _id: string;
  id: string;
  name: string;
}

export interface VeggiePrice extends _Doc {
  category: VeggieCategory;
  date: string;
  dateISO: string;
  dateUnix: number;
  parentId: string;
  parentName: string;
  price: number[];
  tradingCenter: string;
}

export enum VeggieCategory {
  Solid = "SOLID",
  SariSari = "SARI-SARI",
}

export interface Veggie extends _Doc {
  imageUrl?: string;
  imageSource?: string;
}

export interface VeggieWithClasses extends Veggie {
  classes: VeggieClass[];
}

export interface VeggieClass extends _Doc {
  parentId: string;
}

export interface Config {
  latestDataDate: string;
  configId: number;
}

export interface LatestVeggiePrices {
  data: {
    parentId: string;
    parentName: string;
    category?: VeggieCategory;
    tradingCenter: string;
    classes: LatestVeggieClassPrices[];
  }[];
  latestDataDate: string;
}

export interface LatestVeggieClassPrices {
  id: string;
  name: string;
  price: number[];
}

export interface TradingCenter {
  _id: string;
  name: string;
  longName: string;
  slug: string;
}
