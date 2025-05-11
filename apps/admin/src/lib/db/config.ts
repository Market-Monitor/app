export const mmCollections = {
  assets: "Assets",
  tradingCenters: "TradingCenters",
} as const;

export const tdCollections = {
  configurations: "Configurations",
  historyPrices: "HistoryPrices",
  veggies: "Veggies",
  veggiesClasses: "VeggiesClasses",
} as const;

export const MM_DB = "MarketMonitor";

export const getMmDb = (name: string) => `MM_${name.toUpperCase()}`;
