import React, { useContext, useEffect } from "react";
import Table from "../../Components/Table";
import SideBar from "./SideBar";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Components/Notfications/Loader";
import {
  deleteLikedMoviesAction,
  getLikedMoviesAction,
} from "../../Redux/Actions/UserActions";
import { Empty } from "../../Components/Notfications/Empty";
import toast from "react-hot-toast";
import { DownloadFile } from "../../Context/Functionalities";
import FileSaver from "file-saver";
import { SidebarContext } from "../../Context/DrawerContext";

function FavoritesMovies() {
  const dispatch = useDispatch();
  const { progress, setProgress } = useContext(SidebarContext);
  const { isLoading, isError, likedMovies } = useSelector(
    (state) => state.userGetLikedMovies
  );
  const {
    isLoading: deleteLoading,
    isError: deleteError,
    isSuccess,
  } = useSelector((state) => state.deleteLikedMovies);

  // delete all liked movies handler
  const deleteLikedMoviesHandler = () => {
    window.confirm("Are you sure you want to delete all liked movies?") &&
      dispatch(deleteLikedMoviesAction());
  };

  // function to download movie
  const downloadImage = async (url, name) => {
    await DownloadFile(url, setProgress).then((data) => {
      setProgress(0);
      FileSaver.saveAs(data, name);
    });
  };

  useEffect(() => {
    // get all liked movies
    dispatch(getLikedMoviesAction());
    if (isError || deleteError) {
      toast.error(isError || deleteError);
      dispatch({
        type: isError
          ? "USER_GET_LIKED_MOVIES_RESET"
          : "DELETE_ALL_FAVORITES_RESET",
      });
    }
  }, [dispatch, isError, deleteError, isSuccess]);

  return (
    <SideBar>
      <div className="flex flex-col gap-6">
        <div className="flex-btn gap-2">
          <h2 className="text-xl font-bold">Favorites Movies</h2>
          {likedMovies?.length > 0 && (
            <button
              disabled={deleteLoading}
              onClick={deleteLikedMoviesHandler}
              className="bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded"
            >
              {deleteLoading ? "Deleting..." : "Delete All"}
            </button>
          )}
        </div>
        {isLoading ? (
          <Loader />
        ) : likedMovies?.length > 0 ? (
          <Table
            data={likedMovies}
            admin={false}
            downloadImage={downloadImage}
            progress={progress}
          />
        ) : (
          <Empty message="You have no favorites movies" />
        )}
      </div>
    </SideBar>
  );
}

export default FavoritesMovies;
