"use client";
import React, { useState } from "react";
import {
  User,
  ChevronDown,
  Calendar,
  Wallet,
  ShieldCheck,
  Menu,
  X,
  LogIn,
  UserPlus,
  LogOut,
  RefreshCw,
} from "lucide-react";
import { ThemeToggle } from "@/components/buttons/theme-toggle";
import Link from "next/link";
import { ROUTES } from "@/routes";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/utils/payment.util";
import useClickOutSide from "@/hooks/useClickOutside";
import { useAuth } from "@/contexts/auth.context";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Get current user from AuthProvider
  const { user, isAuthenticated, logout, isLoading, refetchUser } = useAuth();
  const userDisplayName = user?.email?.split("@")[0] || "Khách";

  // Close dropdown when clicking outside
  const { nodeRef: dropdownRef } = useClickOutSide(() => {
    setDropdownOpen(false);
  });

  const { nodeRef: mobileDropdownRef } = useClickOutSide(() => {
    setDropdownOpen(false);
  });

  // Handler for refresh balance with loading effect
  const handleRefreshBalance = async () => {
    await refetchUser();
  };

  return (
    <header className="w-full bg-background border-b border-border sticky top-0 z-50 shadow-sm transition-colors duration-300">
      {/* Top Bar with Account Info */}
      <div className="bg-muted/50 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between text-sm">
          <div className="flex items-center gap-6 text-muted-foreground">
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#3f9ced]" />
              <span className="hidden sm:inline">Uy tín - An toàn - Chất lượng</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            {isAuthenticated && (
              <>
                <span className="text-muted-foreground hidden md:inline">
                  Số dư:
                </span>
                <span className="font-bold text-[#3f9ced]">
                  {formatCurrency(user?.money || 0)}
                </span>
                <button
                  aria-label="Làm mới số dư"
                  title="Làm mới số dư"
                  onClick={handleRefreshBalance}
                  className="p-1 rounded-full hover:bg-muted transition flex items-center justify-center"
                >
                  <RefreshCw
                    className="w-4 h-4 text-[#3f9ced]"
                    strokeWidth={3}
                  />
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={ROUTES.HOME} className="flex items-center gap-3 group">
            <img
              src="/images/logo.png"
              alt="Best Game Account Store"
              className="h-18 w-auto object-contain transition-all duration-300 group-hover:scale-110 dark:invert"
            />
          </Link>

          {/* Center Content - Desktop */}
          <div className="hidden lg:flex flex-1 max-w-2xl mx-8 items-center justify-center">
            <div className="text-center space-y-1.5">
              <h2 className="text-lg font-bold bg-gradient-to-r from-blue-600 via-indigo-400 to-purple-600 dark:from-blue-400 dark:via-blue-300 dark:to-indigo-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto] tracking-wide">
                Cửa Hàng Tài Khoản Game Cao Cấp
              </h2>
              <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-blue-500/50 to-transparent rounded-full opacity-50"></div>
            </div>
          </div>

          {/* Navigation Links - Desktop */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              href={ROUTES.DEPOSIT as any}
              className="flex items-center gap-2 px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-all"
            >
              <Wallet className="w-4 h-4 text-[#3f9ced]" />
              <span className="text-sm font-medium text-blue-500">Nạp Tiền</span>
            </Link>
            <Link
              href={ROUTES.POLICIES as any}
              className="flex items-center gap-2 px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-all"
            >
              <ShieldCheck className="w-4 h-4 text-[#3f9ced]" />
              <span className="text-sm font-medium text-blue-500">
                Chính Sách Bảo Hành
              </span>
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <ThemeToggle />
            </div>

            {/* User Dropdown - Desktop */}
            <div className="hidden md:block relative" ref={dropdownRef}>
              <Button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-card border border-border hover:border-primary/50 hover:bg-accent cursor-pointer rounded-lg text-foreground transition-all shadow-sm"
              >
                <User className="w-5 h-5 text-primary" />
                <span className="text-sm font-bold">
                  {isLoading ? "..." : userDisplayName}
                </span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform text-muted-foreground ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </Button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-popover border border-border rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
                  <div className="p-3">
                    <div className="px-3 py-2 text-[10px] text-muted-foreground font-bold uppercase tracking-widest border-b border-border mb-2.5">
                      Tài khoản người dùng
                    </div>

                    {!isAuthenticated ? (
                      <>
                        <Link
                          href={ROUTES.LOGIN as any}
                          className="flex items-center gap-3 px-3 py-2.5 mt-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-all"
                        >
                          <LogIn className="w-4 h-4 text-[#3f9ced]" />
                          <span className="text-sm font-medium text-blue-500">
                            Đăng nhập
                          </span>
                        </Link>
                        <Link
                          href={ROUTES.REGISTER as any}
                          className="flex items-center gap-3 px-3 py-2.5 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-all"
                        >
                          <UserPlus className="w-4 h-4 text-[#3f9ced]" />
                          <span className="text-sm font-medium text-blue-500">
                            Đăng ký
                          </span>
                        </Link>
                      </>
                    ) : (
                      <>
                        <div className="px-3 py-2.5 mb-1 bg-muted/40 rounded-lg border border-border/50">
                          <p className="text-[10px] text-muted-foreground font-bold uppercase mb-0.5">Email</p>
                          <p className="text-sm text-foreground font-bold truncate">
                            {user?.email}
                          </p>
                        </div>
                        <div className="px-3 py-2.5 mb-2 bg-primary/5 rounded-lg border border-primary/10">
                          <p className="text-[10px] text-primary/70 font-bold uppercase mb-0.5">
                            Số dư khả dụng:
                          </p>
                          <p className="text-sm text-[#3f9ced] font-black">
                            {formatCurrency(user?.money || 0)}
                          </p>
                        </div>
                        <Link
                          href={ROUTES.HISTORIES as any}
                          className="flex items-center gap-3 px-3 py-2.5 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-all"
                        >
                          <Calendar className="w-4 h-4 text-primary" />
                          <span className="text-sm font-bold truncate">Lịch Sử Mua Hàng</span>
                        </Link>
                        <button
                          onClick={logout}
                          className="w-full flex items-center gap-3 px-3 py-2.5 mt-1 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-all font-bold text-sm"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Đăng xuất</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <Button
              onClick={() => setMenuOpen(!menuOpen)}
              className="bg-card md:hidden p-2 text-muted-foreground hover:text-foreground hover:bg-accent border border-border rounded-lg transition-all"
            >
              {menuOpen ? (
                <X className="w-6 h-6 text-primary" />
              ) : (
                <Menu className="w-6 h-6 text-primary" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 border-t border-border pt-4 animate-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col gap-1 px-2">
              <Link
                href={ROUTES.DEPOSIT as any}
                className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-all"
              >
                <Wallet className="w-5 h-5 text-blue-500" />
                <span className="font-medium text-sm text-blue-500">Nạp Tiền</span>
              </Link>
              <Link
                href={ROUTES.POLICIES as any}
                className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-all"
              >
                <ShieldCheck className="w-5 h-5 text-blue-500" />
                <span className="font-medium text-sm text-blue-500">Chính Sách Bảo Hành</span>
              </Link>
              <Link
                href={ROUTES.HISTORIES as any}
                className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-all"
              >
                <Calendar className="w-5 h-5 text-blue-500" />
                <span className="font-medium text-sm text-blue-500">Lịch Sử</span>
              </Link>

              {/* Mobile User Actions */}
              <div
                className="mt-2 pt-2 border-t border-border space-y-2"
                ref={mobileDropdownRef}
              >
                <div className="flex items-center justify-between px-4 py-2">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Tài khoản người dùng
                  </span>
                    <ThemeToggle />
                </div>

                {!isAuthenticated ? (
                  <div className="grid grid-cols-2 gap-3 px-2">
                    <Link
                      href={ROUTES.LOGIN as any}
                      className="flex items-center justify-center gap-2 px-4 py-3 text-muted-foreground hover:text-foreground bg-muted border border-border rounded-lg transition-all font-medium text-sm"
                    >
                      <LogIn className="w-4 h-4 text-blue-500" />
                      <span className="text-blue-500">Đăng nhập</span>
                    </Link>
                    <Link
                      href={ROUTES.REGISTER as any}
                      className="flex items-center justify-center gap-2 px-4 py-3 text-white bg-blue-600 hover:opacity-90 rounded-lg transition-all font-bold text-sm shadow-md"
                    >
                      <UserPlus className="w-4 h-4" />
                      Đăng ký
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-2 px-2">
                    <div className="p-4 bg-muted/30 rounded-xl border border-border">
                      <div className="flex items-center justify-between mb-3">
                         <div className="flex items-center gap-3">
                             <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-lg">
                                 {userDisplayName.charAt(0).toUpperCase()}
                             </div>
                             <div className="flex flex-col">
                                 <span className="text-sm font-bold text-foreground truncate max-w-[150px]">{userDisplayName}</span>
                                 <span className="text-xs text-muted-foreground">{user?.email}</span>
                             </div>
                         </div>
                      </div>
                      
                      <div className="flex items-center justify-between bg-card p-3 rounded-lg border border-border shadow-sm">
                          <span className="text-xs font-bold text-muted-foreground uppercase">Số dư:</span>
                          <span className="text-[#3f9ced] font-black text-lg">{formatCurrency(user?.money || 0)}</span>
                      </div>
                    </div>

                    <button
                      onClick={logout}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 text-destructive hover:text-white hover:bg-destructive bg-destructive/10 rounded-lg transition-all font-bold text-sm mt-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
