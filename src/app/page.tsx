import CardFeature from "./components/CardFeature";
import CardFooter from "./components/CardFooter";
import CardHero from "./components/CardHero";
import CardOur from "./components/CardOur";
import Navbar from "./components/Navbar/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <CardHero />
      <CardFeature />
      <CardOur />
      <CardFooter />
    </>
  );
}
