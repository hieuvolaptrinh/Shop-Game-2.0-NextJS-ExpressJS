"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTranslations } from "next-intl";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "@/i18n/navigation";
import { useAuth } from "@/contexts/auth.context";

export function LoginForm() {
  const t = useTranslations("auth.login");
  const tv = useTranslations("auth.validation");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();

  const loginSchema = z.object({
    email: z.string().min(1, tv("required")).email(tv("email_invalid")),
    password: z.string().min(6, tv("password_min")),
  });

  type LoginFormData = z.infer<typeof loginSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setError("");
      await login(data.email, data.password);
    } catch (err: any) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white p-8 sm:p-10 shadow-xl">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-[#0f172a] mb-2">{t("title")}</h2>
          <p className="text-gray-500 font-medium">{t("subtitle") || "Đăng nhập vào hệ thống"}</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Email */}
          <div>
            <Label htmlFor="email" className="text-gray-700 font-bold">
              {t("username_email_label") || "Tài Khoản"}
            </Label>
            <div className="relative mt-2">
              <Input
                id="email"
                type="email"
                placeholder={t("username_email_placeholder") || "Nhập Tên Tài Khoản"}
                className="pl-4 h-11 bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 rounded-lg shadow-sm"
                {...register("email")}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <Label htmlFor="password" className="text-gray-700 font-bold">
              {t("password_label")}
            </Label>
            <div className="relative mt-2">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder={t("password_placeholder") || "Nhập Mật Khẩu Của Bạn"}
                className="pl-4 pr-10 h-11 bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 rounded-lg shadow-sm"
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Remember & Forgot Password */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
                <input 
                    type="checkbox" 
                    id="remember" 
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                />
                <label htmlFor="remember" className="text-gray-600 font-medium">
                    Ghi Nhớ Tài Khoản
                </label>
            </div>
            <button
              type="button"
              className="text-black font-bold hover:underline"
            >
              {t("forgot_password")}?
            </button>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#0f172a] hover:bg-[#1e293b] text-white font-bold py-6 text-base rounded-lg shadow-lg shadow-blue-900/10 transition-all transform hover:scale-[1.01]"
          >
            {isSubmitting ? "..." : t("login_button")}
          </Button>

          {/* Divider */}
           <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-200"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-gray-500 font-medium">Or continue with</span>
                </div>
            </div>

            {/* Social Icons (Mock) */}
             <div className="w-full">
                 <button type="button" className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200 bg-white group">
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span className="text-gray-700 font-semibold text-sm">Tiếp tục với Google</span>
                 </button>
             </div>
        </form>

        <div className="mt-8 text-center text-sm font-bold text-gray-500 uppercase tracking-wide">
          {t("no_account") || "BẠN CHƯA CÓ TÀI KHOẢN?"}{" "}
          <Link
            href="/register"
            className="text-[#0f172a] hover:text-blue-600 hover:underline ml-1"
          >
            {t("create_account") || "ĐĂNG KÝ NGAY"}
          </Link>
        </div>
      </div>
    </div>
  );
}
