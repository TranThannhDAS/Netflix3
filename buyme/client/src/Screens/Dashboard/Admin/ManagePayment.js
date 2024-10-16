import SideBar from "../SideBar";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { TbPlayerTrackNext, TbPlayerTrackPrev } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { Empty } from "../../../Components/Notfications/Empty";
import Loader from "../../../Components/Notfications/Loader";
import {
  deleteAllMoviesAction,
  deleteMovieAction,
  getAllMoviesAction,
} from "../../../Redux/Actions/MoviesActions";
import { MdDelete } from "react-icons/md";

const Head = "text-xs text-left text-main font-semibold px-6 py-2 uppercase";
const Text = "text-sm text-left leading-6 whitespace-nowrap px-5 py-3";

const PaymentAdmin = () =>{
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
   return(
    <>
    <SideBar>
    <div className="flex flex-col gap-6">
        <div className="flex-btn gap-2">
          <h2 className="text-xl font-bold">Payment List</h2>
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
            <TablePayment
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
    </>
   )
};
function TablePayment({ data, admin, onDeleteHandler }) {
   return (
     <div className="overflow-x-scroll overflow-hidden relative w-full">
       <table className="w-full table-auto border border-border divide-y divide-border">
         <thead>
           <tr className="bg-dryGray">
             <th scope="col" className={`${Head}`}>
               PaymentID
             </th>
             <th scope="col" className={`${Head}`}>
               Email
             </th>
             <th scope="col" className={`${Head}`}>
               Full Name
             </th>
             <th scope="col" className={`${Head}`}>
              Subscription package
             </th>
             <th scope="col" className={`${Head}`}>
               Price
             </th>
             <th scope="col" className={`${Head} text-end`}>
               Actions
             </th>
           </tr>
         </thead>
         <tbody className="bg-main divide-y divide-gray-800">
           {data.map((movie, i) =>
             RowsPayment(movie, i, admin, onDeleteHandler)
           )}
         </tbody>
       </table>
     </div>
   );
 }
 const RowsPayment = (movie, i, admin, onDeleteHandler) => {
   return (
     <tr key={i}>
       <td className={`${Text}`}>
         <div className="w-12 p-1 bg-dry border border-border h-12 rounded overflow-hidden">
           <img
             className="h-full w-full object-cover"
             src={movie?.titleImage}
             alt={movie?.name}
           />
         </div>
       </td>
       <td className={`${Text} truncate`}>{movie.name}</td>
       <td className={`${Text}`}>{movie.category}</td>
       <td className={`${Text}`}>{movie.language}</td>
       <td className={`${Text}`}>{movie.year}</td>
       <td className={`${Text} float-right flex-rows gap-2`}>        
             <button
               onClick={() => onDeleteHandler(movie?._id)}
               className="bg-subMain text-white rounded flex-colo w-6 h-6"
             >
               <MdDelete />
             </button>
       </td>
     </tr>
   );
 };
export default PaymentAdmin;