import Link from "next/link";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  maxWidthClass?: string;
}

export default function AuthLayout({ children, title, subtitle, maxWidthClass = "max-w-md" }: AuthLayoutProps) {
  return (
    <div className="h-screen w-full flex bg-white font-sans overflow-hidden">
      {/* Left Panel - Image (Hidden on Mobile) */}
      <div className="hidden lg:flex w-1/2 h-full relative bg-slate-900 items-end p-12 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 bg-blue-600/20 mix-blend-multiply z-10" />
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob" />
        <div className="absolute top-1/4 -right-24 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-24 left-1/4 w-96 h-96 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000" />
        
        {/* Premium Photography */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-60" 
          style={{ backgroundImage: "url('/auth-hero.png')" }}
        />
        
        {/* Decorative Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent z-10" />

        {/* Branding on Image */}
        <div className="relative z-20 w-full max-w-md">
          <Link href="/" className="inline-flex items-center gap-2 mb-8 group">
            <span className="text-3xl font-bold text-white tracking-tight">
              haven<span className="text-blue-500">.</span>
            </span>
          </Link>
          <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
            Connecting you with the best artisans around you.
          </h2>
          <p className="text-lg text-slate-300">
            Join thousands of users and trusted professionals making life easier every single day.
          </p>
        </div>
      </div>

      {/* Right Panel - Form Container */}
      <div className="w-full lg:w-1/2 h-full overflow-y-auto relative">
        {/* Minimalist Mobile Header */}
        <div className="lg:hidden absolute top-0 left-0 right-0 p-6 flex justify-center border-b border-slate-100 bg-white z-50">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-slate-900 tracking-tight">
              haven<span className="text-blue-600">.</span>
            </span>
          </Link>
        </div>

        {/* Scrollable Form Content */}
        <div className="min-h-full w-full flex flex-col px-6 py-24 sm:px-12 md:px-16 lg:px-20 xl:px-24">
          <div className={`w-full ${maxWidthClass} mx-auto my-auto animate-in fade-in slide-in-from-bottom-8 duration-700`}>
            <div className="text-center lg:text-left mb-10">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">
                {title}
              </h1>
              <p className="text-slate-500 text-lg">
                {subtitle}
              </p>
            </div>
            
            {/* Actual Form Injected Here */}
            {children}
            
            {/* Minimalist Footer inside Form area */}
            <div className="mt-12 text-center">
              <p className="text-sm text-slate-400">
                &copy; {new Date().getFullYear()} Haven. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
