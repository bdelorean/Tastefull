import HeroSection from "../components/HeroSection";
import PopularRecipes from "../components/PopularRecipes";
import SearchBar from "../components/SearchBar";

const Home = () => {
  return (
    <>
      <HeroSection />
      <main className="px-12">
        <SearchBar />
        <PopularRecipes />
      </main>
    </>
  );
};

export default Home;
