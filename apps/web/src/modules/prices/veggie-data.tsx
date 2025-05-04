import PesoSign from "@/components/peso-sign";
import { VeggiePrice, VeggieWithClasses } from "@mm-app/internal/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@mm-app/ui/components/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@mm-app/ui/components/tooltip";
import { InfoIcon } from "lucide-react";
import Image from "next/image";
import SelectionClasses from "./selection-classes";

export default function PricesVeggieData({
  veggieData,
  params,
  pricesData,
}: {
  veggieData: VeggieWithClasses;
  params: {
    id: string;
    classId: string;
  };
  pricesData: VeggiePrice[];
}) {
  const latestPriceData = pricesData.sort(
    (a, b) => b.dateUnix - a.dateUnix,
  )[0]!;

  return (
    <CardHeader className="grid md:grid-cols-2 gap-6 p-3">
      <Card>
        <CardHeader>
          <p className="text-sm text-muted-foreground">
            {new Date(latestPriceData.dateUnix).toDateString()}
          </p>
        </CardHeader>

        <CardContent className="h-full">
          <div className="flex flex-col space-y-8">
            <div>
              <CardTitle className="text-2xl lg:text-3xl font-black text-primary">
                {veggieData.name}
              </CardTitle>
              <CardDescription className="text-lg">
                {veggieData.classes
                  .find((item) => item.id === params.classId)!
                  .name.replace(veggieData.name, "")
                  .trim()}
              </CardDescription>
            </div>

            <div className="space-y-3">
              <h3 className="text-5xl font-black">
                <PesoSign />
                {latestPriceData.price[0]} - <PesoSign />
                {latestPriceData.price[1]}
              </h3>
            </div>
            <SelectionClasses
              id={params.id}
              selections={veggieData.classes.map((item) => ({
                name: item.name.replace(veggieData.name, "").trim(),
                value: item.name
                  .replace(veggieData.name, "")
                  .trim()
                  .toLowerCase(),
                id: item.id,
              }))}
              currentSelection={veggieData.classes
                .find((item) => item.id === params.classId)!
                .name.replace(veggieData.name, "")
                .trim()
                .toLowerCase()}
            />
          </div>
        </CardContent>
      </Card>

      <div className="space-y-1">
        <div className="h-80 w-full rounded-lg border relative">
          {veggieData.imageUrl ? (
            <Image
              src={veggieData.imageUrl}
              alt={veggieData.name}
              title={veggieData.name}
              priority
              fill
              className="object-cover rounded-lg"
              sizes="80vw, (max-width: 1024px) 35vw, 30vw"
            />
          ) : (
            <></>
          )}
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-between">
            {veggieData.imageUrl && veggieData.imageSource ? (
              <small className="text-muted-foreground">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href={veggieData.imageSource}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      Source
                    </a>
                  </TooltipTrigger>

                  <TooltipContent>View image source</TooltipContent>
                </Tooltip>
              </small>
            ) : (
              <></>
            )}

            <small className="text-muted-foreground">
              <Tooltip>
                <TooltipTrigger asChild>
                  <InfoIcon className="size-3" />
                </TooltipTrigger>

                <TooltipContent>
                  Image may or may not be accurate from the{" "}
                  <strong>
                    vegetable
                    {`'`}s
                  </strong>{" "}
                  actual appearance. Please do your own research.
                </TooltipContent>
              </Tooltip>
            </small>
          </div>
        </div>
      </div>
    </CardHeader>
  );
}
