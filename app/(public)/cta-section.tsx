import { CheckCheck } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { paths } from "@/utils/paths";

const benefits = [
  "Track your service history",
  "Save favorite service providers",
  "Get personalized recommendations",
  "Request services with one click",
];

export default function CTASection() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="bg-slate-900 rounded-2xl overflow-hidden">
          <div className="flex flex-col md:flex-row items-center">
            {/* Left — text */}
            <div className="md:w-1/2 p-8 md:p-12 lg:p-16">
              <p className="text-blue-400 text-sm font-semibold mb-3 uppercase tracking-wider">
                For Customers
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Create Your Account Today
              </h2>
              <p className="text-slate-400 mb-8 leading-relaxed text-sm">
                Sign up to track your service history, save favorite providers,
                and get personalized recommendations.
              </p>

              <div className="space-y-3 mb-8">
                {benefits.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCheck className="w-4 h-4 text-blue-400 flex-shrink-0" />
                    <p className="text-white/80 text-sm">{item}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <Link href={paths.register}>
                  <Button
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Create Account
                  </Button>
                </Link>
                <Link href={paths.login}>
                  <Button
                    size="lg"
                    className="bg-transparent border border-slate-600 text-white hover:bg-slate-800 hover:text-white"
                  >
                    Sign in
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right — visual */}
            <div className="md:w-1/2 relative hidden md:block">
              <img
                src="https://static.vecteezy.com/system/resources/thumbnails/010/491/672/small_2x/row-of-group-five-african-college-students-spending-time-together-on-campus-at-university-yard-black-afro-friends-studying-education-theme-photo.jpg"
                alt="Happy students"
                className="w-full h-full object-cover min-h-[400px]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/40 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
