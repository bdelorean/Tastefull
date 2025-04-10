import BreakfastRecipes from "../components/BreakfastRecipes";
import HeroSection from "../components/HeroSection";
import MainCourseRecipes from "../components/MainCourseRecipes";
import PopularRecipes from "../components/PopularRecipes";
import SearchBar from "../components/SearchBar";

const Home = () => {
  return (
    <>
      <HeroSection />
      <main className="px-12">
        <SearchBar />
        <PopularRecipes data-aos="fade-up"/>
        <BreakfastRecipes />
        <MainCourseRecipes />
      </main>
    </>
  );
};

export default Home;
