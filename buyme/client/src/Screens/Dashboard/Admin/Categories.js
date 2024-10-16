import React, { useEffect, useState } from "react";
import { HiPlusCircle } from "react-icons/hi";
import Table2 from "../../../Components/Table2";
import SideBar from "../SideBar";
import CategoryModal from "../../../Components/Modals/CategoryModal";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../Components/Notfications/Loader";
import { Empty } from "../../../Components/Notfications/Empty";
import {
  deleteCategory,
  getAllCategories,
} from "../../../Redux/Actions/CategoriesActions";
import toast from "react-hot-toast";

function Categories() {
  const [modalOpen, setModalOpen] = useState(false);
  const [category, setCategory] = useState();
  const dispatch = useDispatch();

  const { categories, isLoading } = useSelector(
    (state) => state.categoriesList
  );
  const { isError: deleteError, isSuccess } = useSelector(
    (state) => state.deleteCategory
  );

  // admin delete category handler
  const adminDeleteUserHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      dispatch(deleteCategory(id));
    }
  };

  const OnEditFunction = (id) => {
    setCategory(id);
    setModalOpen(!modalOpen);
  };

  useEffect(() => {
    // get all categories
    dispatch(getAllCategories());

    if (deleteError) {
      toast.error(deleteError);
      dispatch({
        type: "DELETE_CATEGORY_RESET",
      });
    }
    if (isSuccess) {
      dispatch({
        type: "DELETE_CATEGORY_RESET",
      });
    }
    if (modalOpen === false) {
      setCategory();
    }
  }, [modalOpen, deleteError, dispatch, isSuccess]);

  return (
    <SideBar>
      <CategoryModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        category={category}
      />
      <div className="flex flex-col gap-6">
        <div className="flex-btn gap-2">
          <h2 className="text-xl font-bold">Categories</h2>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-subMain flex-rows gap-4 font-medium transitions hover:bg-main border border-subMain text-white py-2 px-4 rounded"
          >
            <HiPlusCircle /> Create
          </button>
        </div>
        {isLoading ? (
          <Loader />
        ) : categories?.length > 0 ? (
          <Table2
            data={categories}
            users={false}
            OnEditFunction={OnEditFunction}
            onDeleteFunction={adminDeleteUserHandler}
          />
        ) : (
          <Empty message="You have no category" />
        )}
      </div>
    </SideBar>
  );
}

export default Categories;
