"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const registerSchema = z
    .object({
      email: z.string().min(1, "Trường này là bắt buộc").email("Email không hợp lệ"),
      password: z
        .string()
        .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
        .max(32, "Mật khẩu không được vượt quá 32 ký tự"),
      confirmPassword: z.string().min(1, "Trường này là bắt buộc"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Mật khẩu không khớp",
      path: ["confirmPassword"],
    });

  type RegisterFormData = z.infer<typeof registerSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setError("");
      console.log("Mock register with:", data);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert("Đăng ký thành công (Mock)");
    } catch (err: any) {
      setError("Đăng ký thất bại");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto font-sans">
      <div className="bg-card p-8 sm:p-10 shadow-xl border border-border rounded-xl transition-colors duration-300">
        <div className="text-center mb-5">
          <h2 className="text-3xl font-semibold text-foreground mb-3 tracking-tight">ĐĂNG KÝ</h2>
          <p className="text-muted-foreground font-medium">Khởi tạo hành trình mới cùng chúng tôi</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Error Message */}
          {error && (
            <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg text-sm font-medium animate-in fade-in slide-in-from-top-1 duration-200">
              {error}
            </div>
          )}

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-bold text-foreground/80 ml-1">
              Địa chỉ Email
            </Label>
            <div className="relative group">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary">
                <Mail className="w-5 h-5" />
              </div>
              <Input
                id="email"
                type="email"
                placeholder="yourname@example.com"
                className="pl-11 h-12 bg-muted/30 border-border hover:border-primary/50 text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:ring-primary/20 rounded-xl transition-all"
                {...register("email")}
              />
            </div>
            {errors.email && (
              <p className="text-destructive text-xs font-bold mt-1 ml-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-bold text-foreground/80 ml-1">
              Mật khẩu truy cập
            </Label>
            <div className="relative group">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary">
                <Lock className="w-5 h-5" />
              </div>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Từ 6-32 ký tự"
                className="pl-11 pr-11 h-12 bg-muted/30 border-border hover:border-primary/50 text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:ring-primary/20 rounded-xl transition-all"
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-destructive text-xs font-bold mt-1 ml-1">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-sm font-bold text-foreground/80 ml-1">
              Xác nhận mật khẩu
            </Label>
            <div className="relative group">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary">
                <Lock className="w-5 h-5" />
              </div>
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Nhập lại mật khẩu"
                className="pl-11 pr-11 h-12 bg-muted/30 border-border hover:border-primary/50 text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:ring-primary/20 rounded-xl transition-all"
                {...register("confirmPassword")}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-destructive text-xs font-bold mt-1 ml-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-foreground cursor-pointer hover:opacity-90 text-primary-foreground font-semibold py-6 text-lg rounded-lg transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {isSubmitting ? "Đang xử lý..." : "ĐĂNG KÝ TÀI KHOẢN"}
          </Button>

           {/* Divider */}
           <div className="relative my-3">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-border"></span>
                </div>
                <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-widest">
                    <span className="bg-card px-3 text-muted-foreground">Hoặc tiếp tục với</span>
                </div>
            </div>

            {/* Social Icons (Mock) */}
             <div className="w-full">
                 <button type="button" className="w-full flex items-center justify-center gap-3 px-4 py-3.5 border border-border rounded-lg hover:bg-muted/50 transition-all duration-300 bg-card group shadow-sm hover:shadow-md">
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span className="text-foreground font-bold text-sm">Google Account</span>
                 </button>
             </div>
        </form>

        <div className="mt-10 text-center text-xs font-bold text-muted-foreground uppercase tracking-widest">
          Đã có tài khoản trước đó?{" "}
          <Link
            href="/login"
            className="text-primary hover:underline underline-offset-4 ml-1"
          >
            Đăng Nhập Ngay
          </Link>
        </div>
      </div>
    </div>
  );
}
