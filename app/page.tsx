import AboutUs from "@/components/landingPage/AboutUs";
import Blog from "@/components/landingPage/Blog";
import Features from "@/components/landingPage/Features";
import Footer from "@/components/landingPage/Footer";
import Header from "@/components/landingPage/Header";
import Landing from "@/components/landingPage/Landing";

const Page = () => {
  return (
    <div className="scroll-smooth">
      <Header />
      <Landing />
      <AboutUs />
      <Features />
      <Blog />
      <Footer />
    </div>
  );
};

export default Page;
