"use client";

import { useState, useEffect, type ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  BookOpen,
  Menu,
  User,
  LogOut,
  Calendar,
  BookMarked,
  LayoutDashboard,
  Settings,
} from "lucide-react";
import { useUser } from "@/context/UserContext";
import { logout } from "@/services/AuthServices";
import { ProtectedRoutes } from "../constants";

type DashboardInfo = {
  link: string;
  icon?: ReactNode;
  label: string;
};

const Navbar = () => {
  const pathname = usePathname();
  const { user, setIsLoading } = useUser();
  console.log(user, `this name is ${user?.name}`);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    setIsLoading(true);
    if (ProtectedRoutes.some((route) => pathname.match(route))) {
      router.push("/");
    }
  };

  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/tutors", label: "Browse Tutors" },
    { href: "/about", label: "About Us" },
    { href: "/blog", label: "Blog" },
  ];

  // Get dashboard link and icon based on user role
  const getDashboardInfo = (role: string): DashboardInfo => {
    switch (role) {
      case "admin":
        return {
          link: "/admin",
          icon: <LayoutDashboard className="mr-2 h-4 w-4" />,
          label: "Admin Dashboard",
        };
      case "tutor":
        return {
          link: "/tutor",
          icon: <Calendar className="mr-2 h-4 w-4" />,
          label: "Tutor Dashboard",
        };
      case "student":
      default:
        return {
          link: "/student",
          icon: <BookMarked className="mr-2 h-4 w-4" />,
          label: "Student Dashboard",
        };
    }
  };

  // Only calculate dashboardInfo if user exists
  const dashboardInfo = user ? getDashboardInfo(user?.role) : null;

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-sm shadow-sm dark:bg-gray-900/95"
          : "bg-white dark:bg-gray-900"
      }`}
    >
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold tracking-tight">TutorLink</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === link.href
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Auth Buttons or User Menu */}
        <div className="flex items-center gap-2">
          {user ? (
            <>
              <Link href="/become-a-tutor" className="hidden md:block">
                <Button className="rounded-full">Become A Tutor</Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full"
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src="https://i.ibb.co/dKHwTp8/PS.png"
                        alt={user?.name}
                      />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {user.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{user?.name}</p>
                      <p className="text-xs text-muted-foreground capitalize">
                        {user?.role}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  {dashboardInfo && (
                    <DropdownMenuItem asChild>
                      <Link
                        href={dashboardInfo.link}
                        className="cursor-pointer flex w-full items-center"
                      >
                        {dashboardInfo.icon}
                        {dashboardInfo.label}
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem asChild>
                    <Link
                      href="/profile"
                      className="cursor-pointer flex w-full items-center"
                    >
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  {user.role === "admin" && (
                    <DropdownMenuItem asChild>
                      <Link
                        href="/admin/settings"
                        className="cursor-pointer flex w-full items-center"
                      >
                        <Settings className="mr-2 h-4 w-4" />
                        Platform Settings
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer text-red-600 focus:text-red-600"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button className="cursor-pointer" variant="ghost" size="sm">
                  Log in
                </Button>
              </Link>
              <Link href="/register">
                <Button className="cursor-pointer" size="sm">
                  Register
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">🎓</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle></SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 px-2 py-6">
                  <Link href="/" className="flex items-center gap-2">
                    <BookOpen className="h-6 w-6 text-primary" />
                    <span className="text-xl font-bold">TutorLink</span>
                    <span className="text-xl text-primary">🎓</span>
                  </Link>
                  <nav className="flex flex-col gap-4">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`text-sm font-medium transition-colors hover:text-primary ${
                          pathname === link.href
                            ? "text-primary"
                            : "text-muted-foreground"
                        }`}
                      >
                        {link.label}
                      </Link>
                    ))}
                    {user ? (
                      <>
                        <Button
                          className="rounded-full"
                          onClick={() => router.push("/become-a-tutor")}
                        >
                          Become A Tutor
                        </Button>
                        <div className="h-px bg-border my-2" />
                        {dashboardInfo && (
                          <Link
                            href={dashboardInfo.link}
                            className="flex items-center gap-2 text-sm font-medium"
                          >
                            {dashboardInfo.icon}
                            {dashboardInfo.label}
                          </Link>
                        )}
                        <Link
                          href="/profile"
                          className="flex items-center gap-2 text-sm font-medium"
                        >
                          <User className="h-4 w-4 mr-2" />
                          Profile
                        </Link>
                        {user.role === "admin" && (
                          <Link
                            href="/admin/settings"
                            className="flex items-center gap-2 text-sm font-medium"
                          >
                            <Settings className="h-4 w-4 mr-2" />
                            Platform Settings
                          </Link>
                        )}
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-2 text-sm font-medium text-red-600"
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          Log out
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="h-px bg-border my-2" />
                        <div className="flex flex-col gap-2">
                          <Link href="/login">
                            <Button
                              variant="outline"
                              className="w-full cursor-pointer"
                            >
                              Log in
                            </Button>
                          </Link>
                          <Link href="/register">
                            <Button className="w-full cursor-pointer">
                              Register
                            </Button>
                          </Link>
                        </div>
                      </>
                    )}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
