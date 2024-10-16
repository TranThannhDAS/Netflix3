import Axios from "./Axios";

// get all categories Function
const getAllCategoriesService = async () => {
  const { data } = await Axios.get("/categories");
  return data;
};

// create new category Function
const createCategoryService = async (title, token) => {
  const { data } = await Axios.post("/categories", title, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// update category Function
const updateCategoryService = async (id, title, token) => {
  const { data } = await Axios.put(`/categories/${id}`, title, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// delete category Function
const deleteCategoryService = async (id, token) => {
  const { data } = await Axios.delete(`/categories/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export {
  getAllCategoriesService,
  createCategoryService,
  updateCategoryService,
  deleteCategoryService,
};
