import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from '@tanstack/react-router';

export default function AccessDeniedScreen() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
            <ShieldAlert className="h-8 w-8 text-destructive" />
          </div>
          <CardTitle>Access Denied</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <p className="text-muted-foreground">
            You don't have permission to view this page. Only authorized administrators can access the dashboard.
          </p>
          <Button asChild variant="outline">
            <Link to="/">Return to Home</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
