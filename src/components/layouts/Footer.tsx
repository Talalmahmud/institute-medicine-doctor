import { Stethoscope, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const links = {
  Services: [
    "Find a Doctor",
    "Video Consultation",
    "Order Medicines",
    "Lab Tests",
    "Upload Reports",
    "Download Prescription",
  ],
  Company: [
    "About Us",
    "How It Works",
    "Careers",
    "Press",
    "Blog",
    "Contact",
  ],
  Legal: [
    "Privacy Policy",
    "Terms of Service",
    "Refund Policy",
    "Cookie Policy",
  ],
};

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                <Stethoscope className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white">
                Medi<span className="text-primary">Connect</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-6 max-w-xs">
              Quality healthcare, anywhere and anytime. Book certified doctors, get digital prescriptions,
              and order medicines — all in one platform.
            </p>
            {/* Contact */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-2.5 text-sm text-slate-400">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <span>+880 1800-MEDICONNECT</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-slate-400">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <span>support@mediconnect.com.bd</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-slate-400">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                <span>Dhaka, Bangladesh</span>
              </div>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([heading, items]) => (
            <div key={heading}>
              <h4 className="text-white font-semibold text-sm mb-4">{heading}</h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-slate-400 hover:text-white transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="border border-slate-700 rounded-2xl p-6 mb-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
          <div>
            <h4 className="text-white font-semibold mb-1">Health Tips in Your Inbox</h4>
            <p className="text-sm text-slate-400">Subscribe for weekly health advice from our doctors.</p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Input
              placeholder="your@email.com"
              className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-500 focus-visible:ring-primary sm:w-56"
            />
            <Button className="shrink-0">Subscribe</Button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© 2026 MediConnect. All rights reserved.</p>
          <p>Built for better healthcare in Bangladesh.</p>
        </div>
      </div>
    </footer>
  );
}
