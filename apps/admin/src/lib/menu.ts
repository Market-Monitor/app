import {
  ImagesIcon,
  LayoutDashboardIcon,
  LeafyGreenIcon,
  PhilippinePesoIcon,
  StoreIcon,
  VeganIcon,
} from "lucide-react";

export const sidebarMenu = [
  {
    group: "Menu",
    items: [
      {
        label: "Dashboard",
        href: "/dashboard/",
        icon: LayoutDashboardIcon,
      },
    ],
  },
  {
    group: "Price Management",
    items: [
      {
        label: "Update Prices",
        href: "/dashboard/updates/prices",
        icon: PhilippinePesoIcon,
      },
    ],
  },
  {
    group: "Data Management",
    items: [
      {
        label: "Historical Prices",
        href: "/dashboard/data-management/historical-prices",
        icon: PhilippinePesoIcon,
      },
      {
        label: "Vegetables",
        href: "/dashboard/data-management/vegetables",
        icon: LeafyGreenIcon,
      },
      {
        label: "Vegetable Categories",
        href: "/dashboard/data-management/vegetable-categories",
        icon: VeganIcon,
      },
    ],
  },
  {
    group: "Service",
    items: [
      {
        label: "Assets",
        href: "/dashboard/service/assets",
        icon: ImagesIcon,
      },
      {
        label: "Trading Centers",
        href: "/dashboard/service/trading-centers",
        icon: StoreIcon,
      },
    ],
  },
];

export const allMenuRoutes = sidebarMenu
  .map((group) =>
    group.items.map((item) => ({
      ...item,
      group: group.group,
    })),
  )
  .flat();
