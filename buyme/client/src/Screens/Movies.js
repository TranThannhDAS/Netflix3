import React, { useEffect } from "react";
import Filters from "../Components/Filters";
import Layout from "../Layout/Layout";
import Movie from "../Components/Movie";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { RiMovie2Line } from "react-icons/ri";
import Loader from "../Components/Notfications/Loader";
import { useParams } from "react-router-dom";
import { getAllMoviesAction } from "../Redux/Actions/MoviesActions";
import { TbPlayerTrackNext, TbPlayerTrackPrev } from "react-icons/tb";

function MoviesPage() {
  const { search } = useParams();
  const sameClass = "w-full gap-6 flex-colo min-h-screen";
  const dispatch = useDispatch();
  // all movies
  const { isLoading, isError, movies, pages, page } = useSelector(
    (state) => state.moviesList
  );
  // get all categories
  const { categories } = useSelector((state) => state.categoriesList);

  useEffect(() => {
    // errors
    if (isError) {
      toast.error(isError);
    }
  }, [dispatch, isError]);

  // pagination function for next page and prev page
  const nextPage = () => {
    dispatch(
      getAllMoviesAction({
        pageNumber: page + 1,
      })
    );
  };
  const prevPage = () => {
    dispatch(
      getAllMoviesAction({
        pageNumber: page - 1,
      })
    );
  };

  return (
    <Layout>
      <div className="min-height-screen container mx-auto px-2 my-6">
        <Filters categories={categories} search={search} />
        <p className="text-lg font-medium my-6">
          Total{" "}
          <span className="font-bold text-subMain">
            {movies ? movies.length : 0}
          </span>{" "}
          items Found
        </p>
        {isLoading ? (
          <div className={sameClass}>
            <Loader />
          </div>
        ) : movies?.length > 0 ? (
          <>
            <div className="grid sm:mt-10 mt-6 xl:grid-cols-4 2xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 gap-6">
              {movies.map((movie) => (
                <Movie key={movie?._id} movie={movie} />
              ))}
            </div>
            {/* next and previous */}
            <div className="w-full flex-rows gap-6 md:my-20 my-10">
              <button
                disabled={page === 1}
                onClick={prevPage}
                className=" text-white py-2 px-4 rounded font-semibold border-2 border-subMain hover:bg-subMain"
              >
                <TbPlayerTrackPrev className="text-xl" />
              </button>
              <button
                disabled={page === pages}
                onClick={nextPage}
                className="text-white py-2 px-4 rounded font-semibold border-2 border-subMain hover:bg-subMain"
              >
                <TbPlayerTrackNext className="text-xl" />
              </button>
            </div>
          </>
        ) : (
          <div className={sameClass}>
            <div className="w-24 h-24 p-5 rounded-full mb-4 bg-main text-subMain text-4xl flex-colo">
              <RiMovie2Line />
            </div>
            <p className="text-border text-sm">
              It seem's like we dont have any movie
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default MoviesPage;
