import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "../Layout/Layout";
import { BiArrowBack } from "react-icons/bi";
import { FaCloudDownloadAlt, FaHeart, FaPlay } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RiMovie2Line } from "react-icons/ri";
import Loader from "../Components/Notfications/Loader";
import {
  DownloadFile,
  IfMovieIsLiked,
  LikeMovie,
} from "../Context/Functionalities";
import { getMovieByIdAction } from "../Redux/Actions/MoviesActions";
import FileSaver from "file-saver";
import { SidebarContext } from "../Context/DrawerContext";
import { GetDetailPayment } from "../Redux/APIs/PaymentServices";
import Modal from "./Modals";
import { useNavigate } from "react-router-dom";

function WatchPage() {
  const navigate = useNavigate();

  const sameClass = "w-full gap-6 flex-colo min-h-screen";
  const [play, setPlay] = useState(false);
  const { progress, setProgress } = useContext(SidebarContext);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [isWatch, setWatch] = useState(false);
  const [showModal, setShowModal] = useState(false); // State for controlling modal visibility

  // get movie by id
  const { isLoading, isError, movie } = useSelector(
    (state) => state.movieDetails
  );
  // get user info
  const { userInfo } = useSelector((state) => state.userLogin);
  // liked movie
  const { isLoading: likeLoading } = useSelector(
    (state) => state.userLikeMovie
  );

  // function to check if movie is liked by user
  const isLiked = (movie) => {
    return IfMovieIsLiked(movie);
  };

  // function to download movie
  const downloadImage = async (url, name) => {
    await DownloadFile(url, setProgress).then((data) => {
      setProgress(0);
      FileSaver.saveAs(data, name);
    });
  };

  useEffect(() => {
    const fetchAPI = async () => {
      // Lấy giá trị từ localStorage
      const storedData = localStorage.getItem("userInfo");

      if (!storedData) {
        window.location.href = "/login";
        return;
      }

      const data1 = JSON.parse(storedData);

      const data = await GetDetailPayment(data1.email);
      setWatch(data.isWatch);
      
      // Hiển thị modal nếu user không thể xem video
      if (!data.isWatch) {
        setShowModal(true); 
      }
    };

    fetchAPI();
  }, []);

  useEffect(() => {
    // get movie details
    dispatch(getMovieByIdAction(id));
  }, [dispatch, id]);

  const closeModal = () => {
    navigate("/payment");
  };

  return (
    <Layout>
      <Modal isOpen={showModal} closeModal={closeModal} /> {/* Render modal */}

      <div className="container mx-auto bg-dry p-6 mb-12">
        <div className="flex-btn flex-wrap mb-6 gap-2 bg-main rounded border border-gray-800 p-6">
          <Link
            to={`/movie/${id}`}
            className="md:text-xl text-sm flex gap-3 items-center font-bold text-dryGray"
          >
            <BiArrowBack /> {movie?.name}
          </Link>
          <div className="flex-btn sm:w-auto w-full gap-5">
            <button
              onClick={() => LikeMovie(movie, dispatch, userInfo)}
              disabled={likeLoading}
              className={` hover:text-subMain
                ${isLiked(movie) ? "text-subMain" : " text-white"}
                transitions bg-opacity-30 bg-white rounded px-4 py-3 text-sm`}
            >
              <FaHeart />
            </button>
            <button
              disabled={progress > 0 && progress < 100}
              onClick={() => downloadImage(movie?.video, movie?.name)}
              className="bg-subMain flex-rows gap-2 hover:text-main transitions text-white rounded px-8 font-medium py-3 text-sm"
            >
              <FaCloudDownloadAlt /> Download
            </button>
          </div>
        </div>

        {/* watch video */}
        {play ? (
          <video style={{ height: "475px" }} controls autoPlay={play} className="w-full h-full rounded">
          <source src={movie?.video} type="video/mp4" title={movie?.name} />
          </video>
        ) : (
          <div className="w-full h-screen rounded-lg overflow-hidden relative" style={{height: "475px"}}>
            {isLoading ? (
              <div className={sameClass}>
                <Loader />
              </div>
            ) : isError ? (
              <div className={sameClass}>
                <div className="w-24 h-24 p-5 rounded-full mb-4 bg-main text-subMain text-4xl flex-colo">
                  <RiMovie2Line />
                </div>
                <p className="text-border text-lg">{isError}</p>
              </div>
            ) : (
              <>
                <div className="absolute top-0 left-0 bottom-0 right-0 bg-main bg-opacity-30 flex-colo">
                  <button
                    onClick={() => setPlay(true)}
                    className="bg-white text-subMain flex-colo border border-subMain rounded-full w-20 h-20 font-medium text-xl"
                  >
                    <FaPlay />
                  </button>
                </div>
                <img
                  src={movie?.image ? movie.image : "images/user.png"}
                  alt={movie?.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default WatchPage;
