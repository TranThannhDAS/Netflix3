import * as CategoriesConstant from "../Constants/CategoriesConstants";

// GET ALL CATEGORIES

export const categoriesListReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case CategoriesConstant.GET_ALL_CATEGORIES_REQUEST:
      return { isLoading: true };
    case CategoriesConstant.GET_ALL_CATEGORIES_SUCCESS:
      return { isLoading: false, categories: action.payload };
    case CategoriesConstant.GET_ALL_CATEGORIES_FAIL:
      return { isLoading: false, isError: action.payload };
    default:
      return state;
  }
};

// CREATE CATEGORY

export const createCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case CategoriesConstant.CREATE_CATEGORY_REQUEST:
      return { isLoading: true };
    case CategoriesConstant.CREATE_CATEGORY_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case CategoriesConstant.CREATE_CATEGORY_FAIL:
      return { isLoading: false, isError: action.payload };
    case CategoriesConstant.CREATE_CATEGORY_RESET:
      return {};
    default:
      return state;
  }
};

// UPDATE CATEGORY

export const updateCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case CategoriesConstant.UPDATE_CATEGORY_REQUEST:
      return { isLoading: true };
    case CategoriesConstant.UPDATE_CATEGORY_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case CategoriesConstant.UPDATE_CATEGORY_FAIL:
      return { isLoading: false, isError: action.payload };
    case CategoriesConstant.UPDATE_CATEGORY_RESET:
      return {};
    default:
      return state;
  }
};

// DELETE CATEGORY

export const deleteCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case CategoriesConstant.DELETE_CATEGORY_REQUEST:
      return { isLoading: true };
    case CategoriesConstant.DELETE_CATEGORY_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case CategoriesConstant.DELETE_CATEGORY_FAIL:
      return { isLoading: false, isError: action.payload };
    case CategoriesConstant.DELETE_CATEGORY_RESET:
      return {};
    default:
      return state;
  }
};
