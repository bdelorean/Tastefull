import BreakfastRecipes from "../components/BreakfastRecipes";
import HeroSection from "../components/HeroSection";
import MainCourseRecipes from "../components/MainCourseRecipes";
import PopularRecipes from "../components/PopularRecipes";
import SearchBar from "../components/SearchBar";

const Home = () => {
  return (
    <div className="page">
      <HeroSection
        backgroundImage="/images/heroImage.jpg"
        title="A balanced diet is a cookie in each hand!"
        subtitle="Find the perfect dessert to make your day even better!"
        buttonLink="/category/desserts"
        buttonText="Discover more"
      />
      <main className="px-12">
        <SearchBar />
        <PopularRecipes />
        <BreakfastRecipes />
        <MainCourseRecipes />
      </main>
    </div>
  );
};

export default Home;
