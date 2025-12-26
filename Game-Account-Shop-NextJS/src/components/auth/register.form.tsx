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

export function RegisterForm() {
  const t = useTranslations("auth.register");
  const tv = useTranslations("auth.validation");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const { register: registerUser } = useAuth();

  const registerSchema = z
    .object({
      email: z.string().min(1, tv("required")).email(tv("email_invalid")),
      password: z
        .string()
        .min(6, tv("password_min"))
        .max(32, tv("password_max")),
      confirmPassword: z.string().min(1, tv("required")),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: tv("password_mismatch"),
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
      await registerUser(data.email, data.password);
      // Auto redirect to "/" after successful registration (handled by AuthProvider)
    } catch (err: any) {
      setError(err.message || "Đăng ký thất bại");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white  p-8 sm:p-10 shadow-xl">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-[#0f172a] mb-2">{t("title")}</h2>
          <p className="text-gray-500 font-medium">{t("subtitle") || "Tạo tài khoản mới"}</p>
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
              {t("email_label")}
            </Label>
            <div className="relative mt-2">
              <Input
                id="email"
                type="email"
                placeholder={t("email_placeholder") || "Nhập Email"}
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
                placeholder={t("password_placeholder") || "Nhập Mật Khẩu"}
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

          {/* Confirm Password */}
          <div>
            <Label htmlFor="confirmPassword" className="text-gray-700 font-bold">
              {t("confirm_password_label")}
            </Label>
            <div className="relative mt-2">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder={t("confirm_password_placeholder") || "Nhập Lại Mật Khẩu"}
                className="pl-4 pr-10 h-11 bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 rounded-lg shadow-sm"
                {...register("confirmPassword")}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#0f172a] hover:bg-[#1e293b] text-white font-bold py-6 text-base rounded-lg shadow-lg shadow-blue-900/10 transition-all transform hover:scale-[1.01]"
          >
            {isSubmitting ? "..." : t("register_button")}
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
          {t("have_account") || "ĐÃ CÓ TÀI KHOẢN?"}{" "}
          <Link
            href="/login"
            className="text-[#0f172a] hover:text-blue-600 hover:underline ml-1"
          >
            {t("login_link") || "ĐĂNG NHẬP NGAY"}
          </Link>
        </div>
      </div>
    </div>
  );
}
