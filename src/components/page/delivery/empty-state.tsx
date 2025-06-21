import { Card, CardContent } from "@/components/ui/card";

export const EmptyState = ({ message }: { message: string }) => (
  <Card>
    <CardContent className="p-12 text-center">
      <p className="text-muted-foreground">{message}</p>
    </CardContent>
  </Card>
);