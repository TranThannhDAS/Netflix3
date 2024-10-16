import * as CategoriesConstant from "../Constants/CategoriesConstants";
import * as CategoriesApi from "../APIs/categoriesServices";
import { ErrorsAction, tokenProtaction } from "../Protection";
import toast from "react-hot-toast";

// get all categories action
export const getAllCategories = () => async (dispatch) => {
  try {
    dispatch({ type: CategoriesConstant.GET_ALL_CATEGORIES_REQUEST });
    const response = await CategoriesApi.getAllCategoriesService();
    dispatch({
      type: CategoriesConstant.GET_ALL_CATEGORIES_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, CategoriesConstant.GET_ALL_CATEGORIES_FAIL);
  }
};

// create category action
export const createCategory = (title) => async (dispatch, getState) => {
  try {
    dispatch({ type: CategoriesConstant.CREATE_CATEGORY_REQUEST });
    const response = await CategoriesApi.createCategoryService(
      title,
      tokenProtaction(getState)
    );
    dispatch({
      type: CategoriesConstant.CREATE_CATEGORY_SUCCESS,
      payload: response,
    });
    toast.success("Category created successfully");
  } catch (error) {
    ErrorsAction(error, dispatch, CategoriesConstant.CREATE_CATEGORY_FAIL);
  }
};

// update category action
export const updateCategory = (id, title) => async (dispatch, getState) => {
  try {
    dispatch({ type: CategoriesConstant.UPDATE_CATEGORY_REQUEST });
    const response = await CategoriesApi.updateCategoryService(
      id,
      title,
      tokenProtaction(getState)
    );
    dispatch({
      type: CategoriesConstant.UPDATE_CATEGORY_SUCCESS,
      payload: response,
    });
    toast.success("Category updated successfully");
    dispatch(getAllCategories());
  } catch (error) {
    ErrorsAction(error, dispatch, CategoriesConstant.UPDATE_CATEGORY_FAIL);
  }
};

// delete category action
export const deleteCategory = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: CategoriesConstant.DELETE_CATEGORY_REQUEST });
    const response = await CategoriesApi.deleteCategoryService(
      id,
      tokenProtaction(getState)
    );
    dispatch({
      type: CategoriesConstant.DELETE_CATEGORY_SUCCESS,
      payload: response,
    });
    toast.success("Category deleted successfully");
    dispatch(getAllCategories());
  } catch (error) {
    ErrorsAction(error, dispatch, CategoriesConstant.DELETE_CATEGORY_FAIL);
  }
};
