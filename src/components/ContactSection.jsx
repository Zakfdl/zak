import React, { useState, useRef, useEffect } from 'react';
import {
  Phone,
  Mail,
  Linkedin,
  Send,
  FileText,
  Download,
  Share2,
  Twitter,
  Facebook,
  Copy,
  Check,
  MessageCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const shareRef = useRef(null);

  const contactInfo = [
    {
      icon: Phone,
      label: 'Phone',
      value: '+966570674043',
      href: 'tel:+966570674043',
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'zakfdl22@gmail.com',
      href: 'mailto:zakfdl22@gmail.com',
      color: 'from-blue-500 to-[#1E3A8A]'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'Connect on LinkedIn',
      href: 'https://www.linkedin.com/in/zakaria-fadl-56b3b4384/',
      color: 'from-[#0077B5] to-[#1E3A8A]'
    }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (shareRef.current && !shareRef.current.contains(event.target)) {
        setIsShareOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://formspree.io/f/xlgwyjar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error("Failed");

      toast({
        title: "✅ Thank You!",
        description: "Message Sent Successfully!"
      });

      setFormData({ name: "", email: "", message: "" });

    } catch (error) {
      toast({
        title: "❌ Error",
        description: "Something went wrong. Please try again."
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText('https://berrizak.com');

    setCopied(true);

    toast({
      title: "Link Copied!",
      description: "Portfolio link copied to clipboard."
    });

    setTimeout(() => {
      setCopied(false);
      setIsShareOpen(false);
    }, 2000);
  };

  const shareLinks = [
    {
      icon: Linkedin,
      href: 'https://www.linkedin.com/sharing/share-offsite/?url=https://berrizak.com',
      color: 'text-[#0077B5] hover:bg-[#0077B5]/10'
    },
    {
      icon: Twitter,
      href: 'https://twitter.com/intent/tweet?url=https://berrizak.com&text=Check%20out%20my%20portfolio',
      color: 'text-[#1DA1F2] hover:bg-[#1DA1F2]/10'
    },
    {
      icon: Facebook,
      href: 'https://www.facebook.com/sharer/sharer.php?u=https://berrizak.com',
      color: 'text-[#4267B2] hover:bg-[#4267B2]/10'
    }
  ];

  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-gray-900 to-black text-white relative overflow-hidden">

      <div className="container mx-auto px-6 relative z-10">

        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Get In <span className="text-[#1E3A8A]">Touch</span>
          </h2>

          <div className="w-24 h-1 bg-[#1E3A8A] mx-auto rounded-full"></div>

          <p className="text-gray-400 mt-6 text-lg max-w-2xl mx-auto">
            Let's discuss how we can work together to drive your e-commerce success
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">

          {/* Contact Cards */}
          <div className="space-y-6">

            <h3 className="text-2xl font-bold mb-8">Contact Information</h3>

            {contactInfo.map((info, index) => {

              const IconComponent = info.icon;

              return (
                <a
                  key={index}
                  href={info.href}
                  target={info.label === 'LinkedIn' ? '_blank' : undefined}
                  rel={info.label === 'LinkedIn' ? 'noopener noreferrer' : undefined}
                  className="group block bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 border border-gray-700 hover:border-[#1E3A8A] hover:-translate-y-1"
                >

                  <div className="flex items-center gap-4">

                    <div className={`p-4 rounded-xl bg-gradient-to-br ${info.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="text-white" size={28} />
                    </div>

                    <div className="flex-1">
                      <p className="text-sm text-gray-400 mb-1">{info.label}</p>

                      <p className="text-lg font-semibold text-white group-hover:text-[#1E3A8A] transition-colors">
                        {info.value}
                      </p>
                    </div>

                  </div>

                </a>
              );
            })}

            {/* WhatsApp Card */}
            <a
              href="https://wa.me/966570674043?text=Hello%20Zakaria%2C%20I%20found%20your%20portfolio%20and%20would%20like%20to%20connect."
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 border border-gray-700 hover:border-green-500 hover:-translate-y-1"
            >

              <div className="flex items-center gap-4">

                <div className="p-4 rounded-xl bg-gradient-to-br from-green-500 to-green-600 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <MessageCircle className="text-white" size={28} />
                </div>

                <div className="flex-1">
                  <p className="text-sm text-gray-400 mb-1">WhatsApp</p>

                  <p className="text-lg font-semibold text-white-400 group-hover:text-white-300 transition-colors">
                    Chat on WhatsApp
                  </p>
                </div>

              </div>

            </a>

          </div>

          {/* Contact Form */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700">

            <h3 className="text-2xl font-bold mb-6">Send a Message</h3>

            <form onSubmit={handleSubmit} className="space-y-6">

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white"
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                required
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white"
              />

              <textarea
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell me about your project..."
                required
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white"
              />

              <button
                type="submit"
                className="w-full px-6 py-4 bg-[#1E3A8A] text-white rounded-lg font-semibold hover:bg-[#2D4BA8] flex items-center justify-center gap-2"
              >
                Send Message
                <Send size={20} />
              </button>

            </form>

          </div>

        </div>

      </div>

    </section>
  );
};

export default ContactSection;