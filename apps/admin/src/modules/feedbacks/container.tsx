"use client";

import { Card, CardContent } from "@mm-app/ui/components/card";
import { useFeedbackActions } from "./actions-provider";
import { feedbackColumns } from "./columns";
import FeedbackDataTable from "./data-table";

export default function FeedbacksContainer() {
  const { allFeedbacks } = useFeedbackActions();

  return (
    <Card>
      <CardContent>
        <FeedbackDataTable data={allFeedbacks} columns={feedbackColumns} />
      </CardContent>
    </Card>
  );
}
