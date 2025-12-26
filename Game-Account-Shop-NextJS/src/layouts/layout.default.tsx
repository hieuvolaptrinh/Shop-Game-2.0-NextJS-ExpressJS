import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import SocialFloating from "@/components/common/social-floating";


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