import {
  Config,
  LatestVeggiePrices,
  TradingCenter,
  Veggie,
  VeggieClass,
  VeggiePrice,
  VeggieWithClasses,
} from "@mm-app/internal/api";

const VEGGIE_API = process.env.VEGGIES_API!;

const fetcherClient = async <T>(
  endpoint: string,
  tradingCenterId: string | null = null,
  options: {
    headers?: HeadersInit;
    method: "GET" | "POST" | "PUT" | "DELETE";
    params?: Record<string, string>;
    cache?: RequestCache;
    next?: NextFetchRequestConfig;
    key?: string;
  },
): Promise<
  | {
      success: false;
      error: {
        status: number;
        statusText: string;
      };
    }
  | {
      success: true;
      data: T;
    }
> => {
  const url = new URL(
    tradingCenterId
      ? `/api/${tradingCenterId}/${endpoint}`
      : `/api/${endpoint}`,
    VEGGIE_API,
  );

  if (options.params) {
    Object.keys(options.params).forEach((key) => {
      url.searchParams.append(key, options.params![key]!);
    });
  }

  const res = await fetch(url.toString(), {
    method: options.method,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    cache: options.cache,
    next: options.next,
  });

  if (!res.ok) {
    return {
      success: false,
      error: {
        status: res.status,
        statusText: res.statusText,
      },
    };
  }

  const data = await res.json();
  const keyData = options.key ? data[options.key] : data;

  return {
    success: true,
    data: keyData as T,
  };
};

export const veggiesAPI = {
  getTradingCenters() {
    return fetcherClient<TradingCenter[]>("trading-centers", null, {
      method: "GET",
      cache: "force-cache",
    });
  },
  getVeggiePrices(
    tradingCenterId: string,
    params: { veggieId: string; veggieClassId: string },
  ) {
    return fetcherClient<VeggiePrice[]>("prices", tradingCenterId, {
      method: "GET",
      params: {
        id: params.veggieId,
        class: params.veggieClassId,
      },
      key: "data",
    });
  },
  getVeggie(tradingCenterId: string, params: { veggieId: string }) {
    return fetcherClient<VeggieWithClasses>(
      `veggies/${params.veggieId}`,
      tradingCenterId,
      {
        method: "GET",
        next: { tags: ["veggie-data"] },
        key: "data",
      },
    );
  },
  getListVegggies(tradingCenterId: string) {
    return fetcherClient<Veggie[]>("veggies", tradingCenterId, {
      method: "GET",
      key: "data",
    });
  },
  getLatestPrices(tradingCenterId: string) {
    return fetcherClient<LatestVeggiePrices>(
      "history-prices/latest",
      tradingCenterId,
      {
        method: "GET",
        next: { tags: ["latest-prices"] },
        key: "data",
      },
    );
  },
  getVeggieClasses(tradingCenterId: string) {
    return fetcherClient<VeggieClass[]>("veggies/classes", tradingCenterId, {
      method: "GET",
      next: { tags: ["veggie-classes"] },
      key: "data",
    });
  },

  getConfig(tradingCenterId: string) {
    return fetcherClient<Config>("config", tradingCenterId, {
      method: "GET",
      key: "data",
    });
  },
};
