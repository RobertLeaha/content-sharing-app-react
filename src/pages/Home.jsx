import Navigation from "../components/Navigation";
import Header from "../components/Header";
import Body from "../components/Body";
import Footer from "../components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-sky-100">
      <Navigation />
      <Header />
      <Body />
      <Footer />
    </div>
  );
}
