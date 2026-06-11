'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Send, CheckCircle, Loader2 } from 'lucide-react';

export default function ContactSection() {
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('loading');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setFormState('success');
        setFormData({ name: '', email: '', company: '', message: '' });
        setTimeout(() => setFormState('idle'), 3000);
      }
    } catch {
      setFormState('idle');
    }
  };

  return (
    <section className="bg-[#F8F5F2] py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Left */}
          <div className="lg:w-5/12">
            <p className="text-xs tracking-[0.3em] text-gray-400 mb-4 font-sans-body">
              GET IN TOUCH
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif-display text-[#1A1A1A] mb-6">
              Let&apos;s start a <span className="text-[#4A2364]">conversation</span>.
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed font-sans-body mb-8">
              Whether you have a project in mind or simply want to explore possibilities,
              our team is ready to listen. Share your details and we&apos;ll respond
              within one business day.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#4A2364]/5 flex items-center justify-center">
                  <span className="text-sm">📞</span>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-sans-body">Phone</p>
                  <p className="text-sm font-medium text-[#1A1A1A] font-sans-body">18666422531</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#4A2364]/5 flex items-center justify-center">
                  <span className="text-sm">✉️</span>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-sans-body">Email</p>
                  <p className="text-sm font-medium text-[#1A1A1A] font-sans-body">250552975@qq.com</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#4A2364]/5 flex items-center justify-center">
                  <span className="text-sm">📍</span>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-sans-body">Address</p>
                  <p className="text-sm font-medium text-[#1A1A1A] font-sans-body">
                    No. 29, Sanling Road, Gaoming, Foshan
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div className="lg:w-7/12">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5 font-sans-body">
                    Your Name
                  </label>
                  <Input
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="rounded-xl font-sans-body"
                    placeholder="John Smith"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5 font-sans-body">
                    Email
                  </label>
                  <Input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="rounded-xl font-sans-body"
                    placeholder="john@hotelbrand.com"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-xs font-medium text-gray-500 mb-1.5 font-sans-body">
                  Company / Property
                </label>
                <Input
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="rounded-xl font-sans-body"
                  placeholder="Hilton, Marriott, IHG..."
                />
              </div>
              <div className="mb-6">
                <label className="block text-xs font-medium text-gray-500 mb-1.5 font-sans-body">
                  Message
                </label>
                <Textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="rounded-xl min-h-[120px] font-sans-body"
                  placeholder="Tell us about your project — property type, number of keys, timeline..."
                />
              </div>
              <Button
                type="submit"
                disabled={formState === 'loading'}
                className="w-full bg-[#4A2364] hover:bg-[#6B3F8E] text-white rounded-xl py-6 font-sans-body text-sm font-medium"
              >
                {formState === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : formState === 'success' ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Message Sent!
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
