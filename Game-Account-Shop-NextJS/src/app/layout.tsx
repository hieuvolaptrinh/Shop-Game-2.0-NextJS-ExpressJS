import { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import { ClientProviders } from "@/providers/client-providers";
import { AuthProvider } from "@/providers/auth.provider";
import { ThemeProvider } from "@/providers/theme-provider";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default:
      "Shop Tài Khoản Game Uy Tín - Cửa Hàng Tài Khoản Game Cao Cấp | Liên Quân, Genshin Impact & Nhiều Game Khác",
    template: "%s | Shop Tài Khoản Game Uy Tín",
  },
  description:
    "Mua tài khoản game cao cấp: Liên Quân Mobile, Genshin Impact, Arknights, Mobile Legends, Honkai Star Rail, Wuthering Waves & nhiều game khác. Giao hàng ngay lập tức, giao dịch an toàn, hỗ trợ trọn đời. Được tin tưởng bởi hơn 50.000 game thủ.",
  keywords: [
    "mua tài khoản game",
    "bán tài khoản game uy tín",
    "acc liên quân mobile",
    "shop acc liên minh",
    "shop acc uy tín",
    "mua acc game giá rẻ",
    "tài khoản genshin impact",
    "tài khoản arknights",
    "tài khoản mobile legends",
    "tài khoản honkai star rail",
    "tài khoản wuthering waves",
    "tài khoản game cao cấp",
    "xác thực tài khoản game",
    "giao hàng ngay lập tức",
    "cửa hàng game an toàn",
    "mua tài khoản lol",
    "acc game giá rẻ",
    "tài khoản game hiếm",
    "thị trường tài khoản game",
    "người bán game uy tín",
    "shop tài khoản game",
    "mua acc online",
    "tài khoản game mmo",
    "tài khoản game moba",
  ],
  authors: [
    {
      name: "Shop Tài Khoản Game Uy Tín",
      url:
        process.env.NEXT_PUBLIC_SITE_URL ||
        "https://game-account-shop-next-js.vercel.app",
    },
  ],
  creator: "Shop Tài Khoản Game Uy Tín",
  publisher: "Shop Tài Khoản Game Uy Tín",
  formatDetection: {
    email: true,
    address: false,
    telephone: true,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ||
      "https://game-account-shop-next-js.vercel.app"
  ),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "/",
    title:
      "Shop Tài Khoản Game Uy Tín - Cửa Hàng Tài Khoản Game Cao Cấp | Liên Quân, Genshin Impact & Nhiều Game Khác",
    description:
      "Mua tài khoản game cao cấp: Liên Quân Mobile, Genshin Impact, Arknights, Mobile Legends, Honkai Star Rail & nhiều game khác. Giao hàng ngay lập tức, giao dịch an toàn, tin cậy tuyệt đối.",
    siteName: "Shop Tài Khoản Game Uy Tín",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Shop Tài Khoản Game Uy Tín - Tài Khoản Game Cao Cấp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shop Tài Khoản Game Uy Tín - Tài Khoản Game Cao Cấp",
    description:
      "Mua tài khoản game cao cấp: Liên Quân, Genshin Impact, Arknights, Mobile Legends, Star Rail & nhiều game khác. Giao hàng ngay lập tức, an toàn & uy tín.",
    images: ["/logo.jpg"],
    creator: "@BestGameAccounts",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code", // Thêm sau khi đăng ký với Google Search Console
  },
  category: "gaming",
  applicationName: "Shop Tài Khoản Game Uy Tín",
  referrer: "origin-when-cross-origin",
  appleWebApp: {
    capable: true,
    title: "Shop Tài Khoản Game Uy Tín",
    statusBarStyle: "black-translucent",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background transition-colors duration-300`}
      >
         <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ClientProviders>
              <AuthProvider>{children}</AuthProvider>
            </ClientProviders>
          </ThemeProvider>
      </body>
    </html>
  );
}
