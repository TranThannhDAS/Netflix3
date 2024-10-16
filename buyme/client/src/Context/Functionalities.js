// check if movie is liked by user
import toast from "react-hot-toast";
import { IoMdCloudDownload } from "react-icons/io";
import { useSelector } from "react-redux";
import { likeMovieAction } from "../Redux/Actions/UserActions";
import Axios from "../Redux/APIs/Axios";

const IfMovieIsLiked = (movie) => {
  const { likedMovies } = useSelector((state) => state.userGetLikedMovies);
  return likedMovies?.find((likedMovie) => likedMovie?._id === movie?._id);
};

// Like movie functionality
const LikeMovie = (movie, dispatch, userInfo) => {
  return !userInfo
    ? toast.error("Please Login to like a movie")
    : dispatch(likeMovieAction({ movieId: movie?._id }));
};

// download images/video url functionality
const DownloadFile = async (url, setProgress) => {
  const { data } = await Axios({
    url: url,
    method: "GET",
    responseType: "blob", // important
    onDownloadProgress: (progressEvent) => {
      let percentComplete = progressEvent.loaded / progressEvent.total;
      percentComplete = parseInt(percentComplete * 100);
      setProgress(percentComplete);
      if (percentComplete > 0 && percentComplete < 100) {
        toast.loading(`Downloading... ${percentComplete}%`, {
          id: "download",
          duration: 1000000,
          position: "bottom-right",
          style: {
            background: "#0B0F29",
            color: "#fff",
            borderRadius: "10px",
            border: ".5px solid #F20000",
            padding: "16px",
          },
          icon: <IoMdCloudDownload className="text-2xl mr-2 text-subMain" />,
        });
      } else {
        toast.dismiss("download");
      }
    },
  });
  return data;
};
export { IfMovieIsLiked, LikeMovie, DownloadFile };
