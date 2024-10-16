import React, { useEffect, useState } from "react";
import MainModal from "./MainModal";
import { Input } from "../UsedInputs";
import { useDispatch, useSelector } from "react-redux";
import {
  createCategory,
  updateCategory,
} from "../../Redux/Actions/CategoriesActions";
import toast from "react-hot-toast";

function CategoryModal({ modalOpen, setModalOpen, category }) {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const { isSuccess, isLoading, isError } = useSelector(
    (state) => state.createCategory
  );
  const {
    isSuccess: upSuccess,
    isLoading: upLoading,
    isError: upError,
  } = useSelector((state) => state.updateCategory);

  // create category handler
  const submitCategoryHandler = (e) => {
    e.preventDefault();
    if (title) {
      // if category is not empty then create category else update category
      if (category) {
        dispatch(updateCategory(category?._id, { title: title }));
        setModalOpen(!modalOpen);
      } else {
        dispatch(createCategory({ title: title }));
        setTitle("");
      }
    } else {
      toast.error("Please enter a title");
    }
  };

  // useEffect
  useEffect(() => {
    // if create category is failed or update category is failed then show error
    if (isError || upError) {
      toast.error(isError || upError);
      dispatch({
        type: isError ? "CREATE_CATEGORY_RESET" : "UPDATE_CATEGORY_RESET",
      });
    }

    // if success or update success then reset the store
    if (isSuccess || upSuccess) {
      dispatch({
        type: isSuccess ? "CREATE_CATEGORY_RESET" : "UPDATE_CATEGORY_RESET",
      });
    }

    // if category is not null then set title to category title
    if (category) {
      setTitle(category?.title);
    }

    // if modal is closed then set title to empty
    if (modalOpen === false) {
      setTitle("");
    }
  }, [dispatch, isSuccess, isError, upSuccess, upError, category, modalOpen]);

  return (
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div className="inline-block sm:w-4/5 border border-border md:w-3/5 lg:w-2/5 w-full align-middle p-10 overflow-y-auto h-full bg-main text-white rounded-2xl">
        <h2 className="text-3xl font-bold">{category ? "Update" : "Create"}</h2>
        <form
          onSubmit={submitCategoryHandler}
          className="flex flex-col gap-6 text-left mt-6"
        >
          <Input
            label="Category Name"
            placeholder={"Actions"}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            bg={false}
          />
          <button className="w-full flex-rows gap-4 py-3 text-lg transitions hover:bg-dry border-2 border-subMain rounded bg-subMain text-white">
            {isLoading || upLoading
              ? "Loading..."
              : category
              ? "Update"
              : "Create"}
          </button>
        </form>
      </div>
    </MainModal>
  );
}

export default CategoryModal;
