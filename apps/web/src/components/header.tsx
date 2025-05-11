import { veggiesAPI } from "@/lib/veggies-api/client";
import SearchBar from "@/modules/search/search-bar";
import TradingCenterSelections from "@/modules/trading-centers/selection";
import SearchBarDataProvider, {
  SearchData,
} from "@/providers/searchbar-data-provider";
import Link from "next/link";
import AppLogo from "./app-logo";
import HeaderMobileMenu from "./header-mobile-menu";

export default async function Header(props: { tradingCenter: string }) {
  const tradingCenters = await veggiesAPI.getTradingCenters();
  const veggieClasses = await veggiesAPI.getVeggieClasses(props.tradingCenter);

  return (
    <header className="py-2 w-11/12 lg:w-5/6 mx-auto flex items-center justify-between">
      <AppLogo />

      <SearchBarDataProvider data={veggieClasses as unknown as SearchData}>
        <nav className="flex items-center justify-between space-x-4">
          <div className="hidden lg:inline-flex items-center space-x-8">
            <ul className="">
              <li>
                <Link
                  className="text-sm font-medium text-muted-foreground hover:text-primary duration-300 text-nowrap"
                  href={`/${props.tradingCenter}/vegetables/list`}
                >
                  Vegetables List
                </Link>
              </li>
            </ul>

            <SearchBar />
          </div>

          <TradingCenterSelections
            tradingCenters={tradingCenters.success ? tradingCenters.data : []}
            className="hidden md:flex"
          />

          <HeaderMobileMenu
            tradingCenters={tradingCenters.success ? tradingCenters.data : []}
            className="lg:hidden"
          />
        </nav>
      </SearchBarDataProvider>
    </header>
  );
}
