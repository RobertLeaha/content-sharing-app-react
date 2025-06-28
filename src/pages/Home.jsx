import Navigation from "../components/Navigation";
import Header from "../components/Header";
import Body from "../components/Body";

export default function Home() {
  return (
    <div className="min-h-screen bg-sky-100">
      <Navigation />
      <Header />
      <Body />
    </div>
  );
}
