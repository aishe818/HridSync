import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Mail, MessageCircle, Users, BookOpen, Send, CheckCircle } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    if (formData.name && formData.email && formData.message) {
      setIsSubmitted(true);
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          subject: '',
          category: '',
          message: ''
        });
      }, 3000);
    } else {
      toast.error('Please fill in all required fields.');
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex justify-center items-center space-x-2 mb-4">
          <Mail className="w-8 h-8 text-primary" />
          <h1 className="text-3xl">Contact Us</h1>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Have questions about HridSync? Want to provide feedback or explore collaboration opportunities? 
          We'd love to hear from you!
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Contact Information */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageCircle className="w-5 h-5 text-primary" />
                <span>Get in Touch</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <BookOpen className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h4>Academic Inquiries</h4>
                    <p className="text-sm text-muted-foreground">
                      Questions about the research methodology or educational aspects
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Users className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h4>Collaboration</h4>
                    <p className="text-sm text-muted-foreground">
                      Interested in similar projects or research partnerships
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <MessageCircle className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h4>Feedback</h4>
                    <p className="text-sm text-muted-foreground">
                      Share your thoughts on the user experience and features
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-secondary/30">
            <CardContent className="pt-6">
              <h4 className="mb-3">Response Time</h4>
              <p className="text-sm text-muted-foreground mb-3">
                As this is an academic project, we typically respond to inquiries within 2-3 business days.
              </p>
              <Badge variant="secondary">University Project</Badge>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Send us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              {isSubmitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl mb-2">Message Sent Successfully!</h3>
                  <p className="text-muted-foreground">
                    Thank you for reaching out. We'll get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select inquiry type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Question</SelectItem>
                        <SelectItem value="academic">Academic Inquiry</SelectItem>
                        <SelectItem value="collaboration">Collaboration</SelectItem>
                        <SelectItem value="feedback">Feedback</SelectItem>
                        <SelectItem value="technical">Technical Issue</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      placeholder="Brief subject line"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Please provide details about your inquiry..."
                      rows={6}
                      required
                    />
                  </div>

                  <div className="bg-secondary/30 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      <strong>Note:</strong> This is an educational project contact form. 
                      For actual medical concerns, please consult healthcare professionals.
                    </p>
                  </div>

                  <Button type="submit" className="w-full">
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Additional Information */}
      <Card className="bg-muted/30">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <h3>Frequently Asked Questions</h3>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div>
                <h4 className="mb-2">Is this a real medical service?</h4>
                <p className="text-sm text-muted-foreground">
                  No, HridSync is an educational project created for university research purposes. 
                  It is not intended for actual medical use.
                </p>
              </div>
              <div>
                <h4 className="mb-2">Can I use this for my own project?</h4>
                <p className="text-sm text-muted-foreground">
                  This is an academic demonstration. Please contact us if you're interested 
                  in collaboration or have questions about the methodology.
                </p>
              </div>
              <div>
                <h4 className="mb-2">How accurate are the risk assessments?</h4>
                <p className="text-sm text-muted-foreground">
                  The assessments are based on simplified models for educational purposes 
                  and should not be used for actual health decisions.
                </p>
              </div>
              <div>
                <h4 className="mb-2">Do you store my health data?</h4>
                <p className="text-sm text-muted-foreground">
                  This is a demonstration platform. In a real implementation, proper data 
                  privacy measures would be essential for any health-related application.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}