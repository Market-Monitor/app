export interface TradingCenter {
  name: string;
  longName: string;
  addedDate?: string;
  slug: string;
}

export interface Asset {
  image: string;
  uploadedDate: string;
  fileSize: number;
  source: string;
}

export type AssetDoc = Asset & {
  _id: string;
};

export type TradingCenterDoc = TradingCenter & {
  _id: string;
};
