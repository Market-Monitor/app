import { EmptyCard } from "@/components/empty-card";
import { getAssets } from "@/lib/db-queries/assets";
import DataAssetsContainer from "@/modules/dt/assets/container";
import AssetsUploaderDialog from "@/modules/dt/assets/uploader-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@mm-app/ui/components/card";

export default async function AdminAssetsPage() {
  const res = await getAssets();

  if (!res.success) {
    return (
      <div>
        <EmptyCard
          title="Failed to fetch assets"
          description="An error occurred while fetching assets."
        />
      </div>
    );
  }

  return (
    <div>
      <Card>
        <CardHeader className="flex flex-row items-start justify-between">
          <div>
            <CardTitle>Assets Management</CardTitle>
            <CardDescription>
              Upload assets, images or videos, to be used within the
              application.
            </CardDescription>
          </div>

          <div>
            <AssetsUploaderDialog />
          </div>
        </CardHeader>

        <CardContent>
          <DataAssetsContainer data={res.data ?? []} />
        </CardContent>
      </Card>
    </div>
  );
}
