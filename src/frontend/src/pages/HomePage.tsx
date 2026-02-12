import { useState } from 'react';
import { CheckCircle2, MapPin, Phone, Mail, Ruler, Truck } from 'lucide-react';
import InquiryForm from '../components/InquiryForm';
import { Card, CardContent } from '@/components/ui/card';

export default function HomePage() {
  const [showSuccess, setShowSuccess] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 opacity-10">
          <img
            src="/assets/generated/granite-texture.dim_1024x1024.png"
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <div className="container relative mx-auto px-4 py-20 md:py-32">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="text-amber-400 text-lg font-semibold tracking-wide uppercase">
                  Alexis Granite
                </div>
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
                  Premium Granite
                  <span className="block text-amber-400">Craftsmanship</span>
                </h1>
                <p className="text-xl text-slate-300 md:text-2xl">
                  Transform your space with expert granite countertops, installation, and fabrication
                </p>
              </div>

              {/* Key Value Props */}
              <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
                <div className="flex items-center gap-3 rounded-lg bg-amber-500/20 px-6 py-4 backdrop-blur-sm border border-amber-500/30">
                  <CheckCircle2 className="h-8 w-8 text-amber-400 flex-shrink-0" />
                  <div>
                    <div className="text-2xl font-bold text-white">Free Estimates</div>
                    <div className="text-sm text-slate-300">No obligation quotes</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg bg-blue-500/20 px-6 py-4 backdrop-blur-sm border border-blue-500/30">
                  <Truck className="h-8 w-8 text-blue-400 flex-shrink-0" />
                  <div>
                    <div className="text-2xl font-bold text-white">Travel Anywhere</div>
                    <div className="text-sm text-slate-300">We come to you</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="overflow-hidden rounded-2xl shadow-2xl border-4 border-slate-700">
                <img
                  src="/assets/generated/granite-hero.dim_1600x900.png"
                  alt="Premium granite countertop installation"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-slate-50 dark:bg-slate-900 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl mb-4">
              Expert Granite Services
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Professional craftsmanship for residential and commercial projects
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
            <Card className="border-2 hover:border-amber-500/50 transition-colors">
              <CardContent className="pt-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-amber-500/10">
                  <Ruler className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Custom Fabrication</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Precision cutting and shaping to match your exact specifications and design vision
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-amber-500/50 transition-colors">
              <CardContent className="pt-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-amber-500/10">
                  <CheckCircle2 className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Professional Installation</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Expert installation ensuring perfect fit, level surfaces, and lasting durability
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-amber-500/50 transition-colors">
              <CardContent className="pt-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-amber-500/10">
                  <MapPin className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">On-Site Consultation</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  We travel to your location for measurements, planning, and installation
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-16 md:py-24 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl mb-4">
                Get Your Free Estimate
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Tell us about your project and we'll provide a detailed quote at no cost
              </p>
            </div>

            <InquiryForm onSuccess={() => setShowSuccess(true)} showSuccess={showSuccess} />
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="bg-slate-900 py-12 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-amber-400" />
              <span className="text-slate-300">Call for immediate assistance</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-amber-400" />
              <span className="text-slate-300">Email inquiries welcome</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-amber-400" />
              <span className="text-slate-300">Serving all locations</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
