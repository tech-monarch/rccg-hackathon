"use client";

import {
  Search, Menu, X, Tag, Home, LayoutDashboard, Info, UserPlus, BookOpen, Bot,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { paths } from "@/utils/paths";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { isLoggedIn, getStoredRole, clearTokens, authApi } from "@/lib/api";

const categoryLinks = [
  { href: "/providers", label: "Services" },
  { href: "/housing", label: "Housing" },
  { href: "/providers?cat=cleaning", label: "Cleaning" },
  { href: "/providers?cat=repairs", label: "Repairs" },
  { href: "/providers?cat=laundry", label: "Laundry" },
  { href: "/providers?cat=tutoring", label: "Tutoring" },
  { href: "/providers?cat=food", label: "Food & Snacks" },
  { href: "/providers?cat=tech", label: "Tech Help" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<"CUSTOMER" | "PROVIDER" | null>(null);
  const [userName, setUserName] = useState("");
  const [searchVal, setSearchVal] = useState("");

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [sidebarOpen]);

  // Re-read auth state on every route change
  useEffect(() => {
    const li = isLoggedIn();
    const role = getStoredRole() as "CUSTOMER" | "PROVIDER" | null;
    setLoggedIn(li);
    setUserRole(role);

    if (li && role === "PROVIDER") {
      const stored = localStorage.getItem("haven_provider_profile");
      if (stored) {
        try { setUserName(JSON.parse(stored).businessName || "Provider"); } catch {}
      }
    } else if (li && role === "CUSTOMER") {
      const stored = localStorage.getItem("haven_customer_profile");
      if (stored) {
        try { setUserName(JSON.parse(stored).fullName || "Customer"); } catch {}
      }
    } else {
      setUserName("");
    }
  }, [pathname]);

  useEffect(() => {
    const q = searchParams?.get("search") || "";
    setSearchVal(q);
  }, [searchParams]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchVal(val);
    if (pathname === "/providers" || pathname === "/housing") {
      const params = new URLSearchParams(window.location.search);
      val ? params.set("search", val) : params.delete("search");
      router.push(`${pathname}?${params.toString()}`);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const targetPath = pathname === "/housing" ? "/housing" : "/providers";
    router.push(`${targetPath}?search=${encodeURIComponent(searchVal)}`);
  };

  const handleLogout = async () => {
    await authApi.logout();
    localStorage.removeItem("haven_provider_profile");
    localStorage.removeItem("haven_customer_profile");
    setLoggedIn(false);
    setUserRole(null);
    setUserName("");
    setSidebarOpen(false);
    window.location.href = "/";
  };

  const isHome = pathname === "/";
  const showSolid = scrolled || !isHome;
  const isDashboard = pathname?.startsWith("/customer/") || pathname?.startsWith("/provider/");
  const isSearchPage = pathname === "/providers" || pathname === "/housing";
  const showSearchAndCategories = isSearchPage || (showSolid && !isDashboard);
  const dashboardUrl = userRole === "PROVIDER" ? "/provider/dashboard" : "/customer/dashboard";

  const navLinks = [
    { href: paths.providers, label: "Find Providers" },
    { href: paths.housing, label: "Housing" },
    ...(loggedIn ? [{ href: dashboardUrl, label: "Dashboard" }] : []),
  ];

  const mobileSidebarSections = [
    {
      label: "Discover",
      links: [
        { href: "/providers", label: "Find Providers", icon: Search },
        { href: "/housing", label: "Find Housing", icon: Home },
      ],
    },
    ...(loggedIn
      ? [{ label: "My Account", links: [{ href: dashboardUrl, label: "My Dashboard", icon: LayoutDashboard }] }]
      : [{ label: "Haven", links: [{ href: "/auth/register?type=provider", label: "Become a Provider", icon: UserPlus }] }]
    ),
  ];

  const isAuthPage = pathname?.startsWith("/auth") || pathname?.includes("/login") || pathname?.includes("/register");
  if (isAuthPage) return null;

  return (
    <>
      <div
        onClick={() => setSidebarOpen(false)}
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-72 bg-white flex flex-col shadow-2xl transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <Link href={paths.home} className="flex items-center gap-2" onClick={() => setSidebarOpen(false)}>
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">H</span>
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">
              haven<span className="text-blue-600">.</span>
            </span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-3">
          {mobileSidebarSections.map((section) => (
            <div key={section.label}>
              <p className="px-5 pt-4 pb-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-widest">
                {section.label}
              </p>
              {section.links.map(({ href, label, icon: Icon }) => (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center gap-3 px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 border-l-2 border-transparent hover:border-blue-600 transition-all"
                >
                  <Icon size={16} className="flex-shrink-0 text-slate-400" />
                  {label}
                </Link>
              ))}
            </div>
          ))}

          <div className="px-5 pt-6">
            <button
              onClick={() => {
                setSidebarOpen(false);
                window.open(`https://wa.me/2349017335663?text=${encodeURIComponent("Hello Haven Bot, I need help finding a service professional")}`, "_blank");
              }}
              className="flex items-center gap-3 w-full px-4 py-2.5 text-sm font-medium text-green-700 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors"
            >
              <Bot size={16} className="flex-shrink-0" />
              Chat with Haven Bot
            </button>
          </div>
        </nav>

        <div className="p-4 border-t border-slate-100 flex flex-col gap-2">
          {loggedIn ? (
            <>
              <div className="px-1 py-1 text-sm text-slate-600">
                Logged in as <span className="font-semibold text-slate-900">{userName}</span>
              </div>
              <Button onClick={handleLogout} className="w-full bg-slate-900 hover:bg-slate-800 text-white">
                Log out
              </Button>
            </>
          ) : (
            <>
              <Link href={paths.login} onClick={() => setSidebarOpen(false)}>
                <Button variant="outline" className="w-full">Sign in</Button>
              </Link>
              <Link href={paths.register} onClick={() => setSidebarOpen(false)}>
                <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white">Join</Button>
              </Link>
            </>
          )}
        </div>
      </aside>

      <header
        className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
          showSolid ? "bg-white border-b border-slate-200 shadow-[0_1px_3px_rgba(0,0,0,0.06)]" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href={paths.home} className="flex items-center gap-2 group flex-shrink-0">
              <span className={`text-2xl font-bold tracking-tight transition-colors ${showSolid ? "text-slate-900" : "text-white"}`}>
                haven<span className="text-blue-500">.</span>
              </span>
            </Link>

            {showSearchAndCategories && (
              <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center flex-1 max-w-lg mx-8">
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="What service are you looking for?"
                    value={searchVal}
                    onChange={handleSearchChange}
                    className="w-full pl-4 pr-12 py-2 text-sm border border-slate-300 rounded-md focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-colors bg-white text-slate-900 placeholder:text-slate-400"
                  />
                  <button type="submit" className="absolute right-0 top-0 bottom-0 px-3 bg-slate-900 text-white rounded-r-md hover:bg-slate-800 transition-colors">
                    <Search size={16} />
                  </button>
                </div>
              </form>
            )}

            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    showSolid ? "text-slate-600 hover:text-slate-900 hover:bg-slate-50" : "text-white/80 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {loggedIn ? (
                <>
                  <span className={`mx-2 h-4 w-px ${showSolid ? "bg-slate-200" : "bg-white/20"}`} />
                  <span className={`px-3 py-2 text-sm font-medium ${showSolid ? "text-slate-700" : "text-white"}`}>
                    Hi, <span className="font-semibold">{userName}</span>
                  </span>
                  <Button
                    variant="outline"
                    onClick={handleLogout}
                    className={`h-9 px-4 text-sm font-medium transition-all ${
                      showSolid ? "border-slate-300 text-slate-700 hover:bg-slate-50" : "border-white/30 text-white hover:bg-white/10 bg-transparent"
                    }`}
                  >
                    Log out
                  </Button>
                </>
              ) : (
                <>
                  <span className={`mx-2 h-4 w-px ${showSolid ? "bg-slate-200" : "bg-white/20"}`} />
                  <Link
                    href="/auth/register?type=provider"
                    className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      showSolid ? "text-slate-600 hover:text-slate-900 hover:bg-slate-50" : "text-white/80 hover:text-white"
                    }`}
                  >
                    Become a Provider
                  </Link>
                  <Link href={paths.login}>
                    <span className={`px-3 py-2 text-sm font-medium transition-colors ${
                      showSolid ? "text-slate-600 hover:text-slate-900" : "text-white/80 hover:text-white"
                    }`}>Sign in</span>
                  </Link>
                  <Link href={paths.register}>
                    <span className={`inline-flex items-center px-5 py-2 text-sm font-semibold rounded-md border transition-all ${
                      showSolid ? "bg-slate-900 text-white border-slate-900 hover:bg-slate-800" : "bg-transparent text-white border-white hover:bg-white hover:text-slate-900"
                    }`}>Join</span>
                  </Link>
                </>
              )}
            </nav>

            <button onClick={() => setSidebarOpen(true)} className="md:hidden p-2 rounded-md transition-colors">
              <Menu size={22} className={showSolid ? "text-slate-700" : "text-white"} />
            </button>
          </div>
        </div>

        {showSearchAndCategories && (
          <div className="hidden md:block border-t border-slate-100 bg-white">
            <div className="container mx-auto px-4">
              <div className="flex items-center gap-6 h-10 overflow-x-auto scrollbar-hide">
                {categoryLinks.map((cat) => (
                  <Link
                    key={cat.label}
                    href={cat.href}
                    className="text-sm text-slate-500 hover:text-slate-900 whitespace-nowrap transition-colors hover:border-b-2 hover:border-slate-900 pb-2 pt-2"
                  >
                    {cat.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>
      {!isHome && <div className={showSearchAndCategories ? "h-16 md:h-[104px]" : "h-16"} />}
    </>
  );
}
