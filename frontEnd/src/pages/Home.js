import CreateCategory from "../components/categoryComponents/CreateCategory";
import ListCategories from "../components/categoryComponents/ListCategories";

//Show categories page.
const Home = () => {
  return (
    <>
      <CreateCategory />
      <ListCategories />
    </>
  );
};

export default Home;
