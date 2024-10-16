import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieCasts from "../Components/Single/MovieCasts";
import MovieInfo from "../Components/Single/MovieInfo";
import MovieRates from "../Components/Single/MovieRates";
import Titles from "../Components/Titles";
import Layout from "../Layout/Layout";
import { BsCollectionFill } from "react-icons/bs";
import Movie from "../Components/Movie";
import ShareMovieModal from "../Components/Modals/ShareModal";
import { useDispatch, useSelector } from "react-redux";
import { getMovieByIdAction } from "../Redux/Actions/MoviesActions";
import Loader from "../Components/Notfications/Loader";
import { RiMovie2Line } from "react-icons/ri";
import { DownloadFile } from "../Context/Functionalities";
import FileSaver from "file-saver";
import { SidebarContext } from "../Context/DrawerContext";

function SingleMovie() {
  const sameClass = "w-full gap-6 flex-colo min-h-screen";
  const [modalOpen, setModalOpen] = useState(false);
  const { progress, setProgress } = useContext(SidebarContext);
  const { id } = useParams();
  const dispatch = useDispatch();
  // get movie by id
  const { isLoading, isError, movie } = useSelector(
    (state) => state.movieDetails
  );
  const { movies } = useSelector((state) => state.moviesList);
  // related movies
  const RelatedMovies = movies?.filter((m) => m.category === movie?.category);

  // function to download movie
  const downloadImage = async (url, name) => {
    await DownloadFile(url, setProgress).then((data) => {
      setProgress(0);
      FileSaver.saveAs(data, name);
    });
  };

  useEffect(() => {
    // get movie details
    dispatch(getMovieByIdAction(id));
  }, [dispatch, id]);

  return (
    <Layout>
      {isLoading ? (
        <div className={sameClass}>
          <Loader />
        </div>
      ) : isError ? (
        <div className={sameClass}>
          <div className="w-24 h-24 p-5 rounded-full mb-4 bg-dry text-subMain text-4xl flex-colo">
            <RiMovie2Line />
          </div>
          <p className="text-border text-lg">{isError}</p>
        </div>
      ) : (
        <>
          <ShareMovieModal
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            movie={movie}
          />
          <MovieInfo
            movie={movie}
            setModalOpen={setModalOpen}
            downloadImage={downloadImage}
            progress={progress}
          />
          <div className="container mx-auto min-h-screen px-2 my-6">
            <MovieCasts movie={movie} />
            {/* rate */}
            <MovieRates movie={movie} />
            {/* related */}
            {RelatedMovies?.length > 0 && (
              <div className="my-16">
                <Titles title="Related Movies" Icon={BsCollectionFill} />
                <div className="grid sm:mt-10 mt-6 xl:grid-cols-4 2xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 gap-6">
                  {RelatedMovies?.map((movie) => (
                    <Movie key={movie?._id} movie={movie} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </Layout>
  );
}

export default SingleMovie;
