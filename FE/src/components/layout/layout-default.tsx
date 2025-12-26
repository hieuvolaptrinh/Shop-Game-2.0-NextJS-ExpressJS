
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import SocialFloating from "@/components/layout/social-floating";


function LayoutDefault({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex flex-col transition-colors duration-300">
      <Header />
      <main className="flex-1 relative">{children}</main>
      <SocialFloating />
      <Footer />
    </div>
  );
}

export default LayoutDefault;