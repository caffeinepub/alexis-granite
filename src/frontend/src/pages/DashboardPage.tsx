import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetAllInquiries, useGetCallerUserProfile } from '../hooks/useQueries';
import LoginButton from '../components/LoginButton';
import ProfileSetupModal from '../components/ProfileSetupModal';
import AccessDeniedScreen from '../components/AccessDeniedScreen';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Mail, Phone, MapPin, MessageSquare } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function DashboardPage() {
  const { identity, isInitializing } = useInternetIdentity();
  const isAuthenticated = !!identity;

  const { data: userProfile, isLoading: profileLoading, isFetched: profileFetched } = useGetCallerUserProfile();
  const { data: inquiries, isLoading: inquiriesLoading, error: inquiriesError } = useGetAllInquiries();

  // Show loading while initializing auth
  if (isInitializing) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mb-4 text-lg text-muted-foreground">Loading...</div>
        </div>
      </div>
    );
  }

  // Show login prompt if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Dashboard Access</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-center text-muted-foreground">
              Please sign in to view inquiries
            </p>
            <div className="flex justify-center">
              <LoginButton />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show profile setup modal if needed
  const showProfileSetup = isAuthenticated && !profileLoading && profileFetched && userProfile === null;
  if (showProfileSetup) {
    return <ProfileSetupModal />;
  }

  // Show access denied if authorization error
  if (inquiriesError) {
    const errorMessage = inquiriesError instanceof Error ? inquiriesError.message : 'Unknown error';
    if (errorMessage.includes('Unauthorized') || errorMessage.includes('Only admins')) {
      return <AccessDeniedScreen />;
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Inquiries Dashboard</h1>
        <p className="text-muted-foreground">
          View and manage granite work inquiries
        </p>
      </div>

      {inquiriesLoading ? (
        <Card>
          <CardContent className="py-12">
            <div className="text-center text-muted-foreground">Loading inquiries...</div>
          </CardContent>
        </Card>
      ) : inquiriesError ? (
        <Alert variant="destructive">
          <AlertDescription>
            Failed to load inquiries: {inquiriesError instanceof Error ? inquiriesError.message : 'Unknown error'}
          </AlertDescription>
        </Alert>
      ) : !inquiries || inquiries.length === 0 ? (
        <Card>
          <CardContent className="py-12">
            <div className="text-center text-muted-foreground">No inquiries yet</div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Recent Inquiries ({inquiries.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Message</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inquiries.slice().reverse().map((inquiry, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{inquiry.name}</TableCell>
                      <TableCell>
                        <div className="space-y-1 text-sm">
                          {inquiry.email && (
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-muted-foreground" />
                              <span>{inquiry.email}</span>
                            </div>
                          )}
                          {inquiry.phone && (
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-muted-foreground" />
                              <span>{inquiry.phone}</span>
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-md">
                          <div className="flex items-start gap-2">
                            <MessageSquare className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{inquiry.message}</span>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
