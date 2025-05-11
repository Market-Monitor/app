"use client";

import { AssetDoc } from "@/types/dt";
import Image from "next/image";
import { useState } from "react";
import AssetPreview from "./asset-preview";

export default function DataAssetsContainer(props: { data: AssetDoc[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<AssetDoc | null>(null);

  const handlePreview = (asset: AssetDoc) => {
    setSelectedAsset(asset);
    setIsOpen(true);
  };

  return (
    <div>
      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {props.data
          .sort(
            (a, b) =>
              new Date(b.uploadedDate).getTime() -
              new Date(a.uploadedDate).getTime(),
          )
          .map((item) => (
            <li key={item._id.toString()} className="relative h-[250px] group">
              <Image
                src={item.image}
                alt={item.image}
                fill
                priority
                className="h-full w-full rounded-lg z-10 object-cover brightness-90 hover:brightness-100 transition-all duration-300 cursor-pointer"
                sizes="100vw (max-width: 768px) 50vw, 33vw, (max-width: 1024px) 50vw, 25vw, (max-width: 1280px) 50vw, 20vw"
                title="Preview Asset"
                onClick={() => handlePreview(item)}
              />
            </li>
          ))}
      </ul>

      <AssetPreview
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        asset={selectedAsset}
      />
    </div>
  );
}
