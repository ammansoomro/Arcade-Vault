const customConstants = {
  API_IMAGES: "http://localhost:4007/images/",

  // ITEM CONSTANTS
  API_ADD_ITEM: "http://localhost:4007/api/items/add",
  API_LIST_ITEMS: "http://localhost:4007/api/items/list",
  API_REMOVE_ITEM: "http://localhost:4007/api/items/remove",

  INITIAL_ADD_ITEM_INPUT: {
    name: "",
    desc: "",
    price: "",
    category: "Games",
  },

  // CATEGORY CONSTANTS
  API_ADD_CATEGORY: "http://localhost:4007/api/categories/add",
  API_LIST_CATEGORIES: "http://localhost:4007/api/categories/list",
  API_REMOVE_CATEGORY: "http://localhost:4007/api/categories/remove",

  INITIAL_ADD_CATEGORY_INPUT: {
    name: "",
    desc: "",
  },
};

export default customConstants;
