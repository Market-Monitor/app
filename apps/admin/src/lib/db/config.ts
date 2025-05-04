export const mmCollections = {
  tradingCenters: "TradingCenters",
};

export const tdCollections = {
  assets: "Assets",
  configurations: "Configurations",
  historyPrices: "HistoryPrices",
  veggies: "Veggies",
  veggiesClasses: "VeggiesClasses",
};

export const MM_DB = "MarketMonitor";

export const getMmDb = (name: string) => `MM_${name}`;
