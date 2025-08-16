import { getMobileAppFeedbacks } from "@/lib/feedbacks/query";
import FeedbackActionsProvider from "@/modules/feedbacks/actions-provider";
import FeedbacksContainer from "@/modules/feedbacks/container";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@mm-app/ui/components/card";

export default async function DashboardFeedbacks() {
  const feedbacks = await getMobileAppFeedbacks();

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Feedbacks</CardTitle>
          <CardDescription>
            These are feedbacks collected from the mobile app users.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <FeedbackActionsProvider allFeedbacks={feedbacks}>
            <FeedbacksContainer />
          </FeedbackActionsProvider>
        </CardContent>
      </Card>
    </div>
  );
}
