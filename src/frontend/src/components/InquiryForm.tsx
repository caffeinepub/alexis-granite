import { useState } from 'react';
import { useSubmitInquiry } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2, Loader2 } from 'lucide-react';

interface InquiryFormProps {
  onSuccess: () => void;
  showSuccess: boolean;
}

export default function InquiryForm({ onSuccess, showSuccess }: InquiryFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const submitInquiry = useSubmitInquiry();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your full name';
    }

    if (!formData.email.trim() && !formData.phone.trim()) {
      newErrors.contact = 'Please provide either an email address or phone number';
    }

    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please describe your project';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await submitInquiry.mutateAsync({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        message: formData.message.trim(),
      });

      // Clear form
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
      });
      setErrors({});
      onSuccess();

      // Hide success message after 5 seconds
      setTimeout(() => {
        onSuccess();
      }, 5000);
    } catch (error) {
      setErrors({
        submit: error instanceof Error ? error.message : 'Failed to submit inquiry. Please try again.',
      });
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Request Your Free Estimate</CardTitle>
      </CardHeader>
      <CardContent>
        {showSuccess && (
          <Alert className="mb-6 border-green-500 bg-green-50 dark:bg-green-950">
            <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
            <AlertDescription className="text-green-800 dark:text-green-200">
              Thank you! We've received your inquiry and will contact you soon.
            </AlertDescription>
          </Alert>
        )}

        {errors.submit && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{errors.submit}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">
              Full Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="John Smith"
              className={errors.name ? 'border-destructive' : ''}
            />
            {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="john@example.com"
                className={errors.email ? 'border-destructive' : ''}
              />
              {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="(555) 123-4567"
              />
            </div>
          </div>

          {errors.contact && <p className="text-sm text-destructive">{errors.contact}</p>}

          <div className="space-y-2">
            <Label htmlFor="message">
              Project Details <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleChange('message', e.target.value)}
              placeholder="Tell us about your granite project: location, type of work needed, timeline, etc."
              rows={5}
              className={errors.message ? 'border-destructive' : ''}
            />
            {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full bg-amber-600 hover:bg-amber-700 text-white"
            disabled={submitInquiry.isPending}
          >
            {submitInquiry.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              'Get Free Estimate'
            )}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            We'll review your inquiry and contact you within 24 hours
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
