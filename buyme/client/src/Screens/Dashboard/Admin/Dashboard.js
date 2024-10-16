import React, { useEffect } from "react";
import { FaRegListAlt, FaUser } from "react-icons/fa";
import SideBar from "../SideBar";
import { HiViewGridAdd } from "react-icons/hi";
import Table from "../../../Components/Table";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteMovieAction,
  getAllMoviesAction,
} from "../../../Redux/Actions/MoviesActions";
import toast from "react-hot-toast";
import Loader from "../../../Components/Notfications/Loader";
import { Empty } from "../../../Components/Notfications/Empty";
import { getAllUsersAction } from "../../../Redux/Actions/UserActions";
import { getAllCategories } from "../../../Redux/Actions/CategoriesActions";

function Dashboard() {
  const dispatch = useDispatch();
  // all movies
  const { isLoading, isError, movies, totalMovies } = useSelector(
    (state) => state.moviesList
  );
  const {
    isLoading: userLoading,
    isError: userError,
    users,
  } = useSelector((state) => state.getAllUsers);
  const { categories, isLoading: catLoading } = useSelector(
    (state) => state.categoriesList
  );

  // delete movie handler
  const deleteMovieHandler = (id) => {
    window.confirm("Are you sure you want to delete this movie?") &&
      dispatch(deleteMovieAction(id));
  };

  useEffect(() => {
    // get all movies
    dispatch(getAllMoviesAction({}));
    // get all users
    dispatch(getAllUsersAction());
    // get all categories
    dispatch(getAllCategories());
    // errors
    if (isError || userError) {
      toast.error(isError || userError);
    }
  }, [dispatch, isError, userError]);

  // dashboard data
  const DashboardData = [
    {
      bg: "bg-orange-600",
      icon: FaRegListAlt,
      title: "Total Movies",
      total: isLoading ? "Loading.." : totalMovies || 0,
    },
    {
      bg: "bg-blue-700",
      icon: HiViewGridAdd,
      title: "Total Categories",
      total: catLoading ? "Loading.." : categories?.length || 0,
    },
    {
      bg: "bg-green-600",
      icon: FaUser,
      title: "Total Users",
      total: userLoading ? "Loading.." : users?.length || 0,
    },
  ];

  return (
    <SideBar>
      <h2 className="text-xl font-bold">Dashboard</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {DashboardData.map((data, index) => (
          <div
            key={index}
            className="p-4 rounded bg-main border-border grid grid-cols-4 gap-2"
          >
            <div
              className={`col-span-1 rounded-full h-12 w-12 flex-colo ${data.bg}`}
            >
              <data.icon />
            </div>
            <div className="col-span-3">
              <h2>{data.title}</h2>
              <p className=" mt-2 font-bold">{data.total}</p>
            </div>
          </div>
        ))}
      </div>
      <h3 className="text-md font-medium my-6 text-border">Recent Movies</h3>
      {isLoading ? (
        <Loader />
      ) : movies?.length > 0 ? (
        <Table
          data={movies?.slice(0, 5)}
          admin={true}
          onDeleteHandler={deleteMovieHandler}
        />
      ) : (
        <Empty message="Empty" />
      )}
    </SideBar>
  );
}

export default Dashboard;
