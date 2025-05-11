import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@mm-app/ui/components/card";

export default function AdminAssetsPage() {
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

          <div>{/* <AssetsUploaderDialog /> */}</div>
        </CardHeader>

        <CardContent>{/* <AssetsList data={res.data ?? []} /> */}</CardContent>
      </Card>
    </div>
  );
}
