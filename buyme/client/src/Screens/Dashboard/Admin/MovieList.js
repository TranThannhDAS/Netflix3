import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { TbPlayerTrackNext, TbPlayerTrackPrev } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { Empty } from "../../../Components/Notfications/Empty";
import Loader from "../../../Components/Notfications/Loader";
import Table from "../../../Components/Table";
import {
  deleteAllMoviesAction,
  deleteMovieAction,
  getAllMoviesAction,
} from "../../../Redux/Actions/MoviesActions";
import SideBar from "../SideBar";

function MoviesList() {
  const dispatch = useDispatch();
  // all movies state
  const { isLoading, isError, movies, pages, page } = useSelector(
    (state) => state.moviesList
  );
  // delete movie state
  const { isLoading: deleteLoading, isError: deleteError } = useSelector(
    (state) => state.deleteMovie
  );
  // delete all movies state
  const { isLoading: deleteAllLoading, isError: deleteAllError } = useSelector(
    (state) => state.deleteAllMovies
  );

  // delete movie handler
  const deleteMovieHandler = (id) => {
    window.confirm("Are you sure you want to delete this movie?") &&
      dispatch(deleteMovieAction(id));
  };

  // delete all movies handler
  const deleteAllMoviesHandler = () => {
    window.confirm("Are you sure you want to delete all movies?") &&
      dispatch(deleteAllMoviesAction());
  };

  useEffect(() => {
    // get all movies
    dispatch(getAllMoviesAction({}));
    // errors
    if (isError || deleteError || deleteAllError) {
      toast.error(isError || deleteError || deleteAllError);
    }
  }, [dispatch, isError, deleteError, deleteAllError]);

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
    <SideBar>
      <div className="flex flex-col gap-6">
        <div className="flex-btn gap-2">
          <h2 className="text-xl font-bold">Movies List</h2>
          {movies?.length > 0 && (
            <button
              disabled={deleteAllLoading}
              onClick={deleteAllMoviesHandler}
              className="bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded"
            >
              {deleteAllLoading ? "Deleting..." : "Delete All"}
            </button>
          )}
        </div>
        {isLoading || deleteLoading ? (
          <Loader />
        ) : movies?.length > 0 ? (
          <>
            <Table
              data={movies}
              admin={true}
              onDeleteHandler={deleteMovieHandler}
            />
            {/* next and previous */}
            <div className="w-full flex-rows gap-6 my-5">
              <button
                disabled={page === 1}
                onClick={prevPage}
                className=" text-white p-2 rounded border border-subMain hover:bg-subMain"
              >
                <TbPlayerTrackPrev className="text-sm" />
              </button>
              <button
                disabled={page === pages}
                onClick={nextPage}
                className="text-white p-2 rounded border border-subMain hover:bg-subMain"
              >
                <TbPlayerTrackNext className="text-sm" />
              </button>
            </div>
          </>
        ) : (
          <Empty message="Empty" />
        )}
      </div>
    </SideBar>
  );
}

export default MoviesList;
