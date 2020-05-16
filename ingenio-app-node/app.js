"use strict";

//read json file
let categories = require("./data.json");

const getCategoryById = (categoryId) => {
  //numeric value validation
  if (!isNaN(categoryId)) {
    const category = categories.find(
      (_category) => _category.categoryId === categoryId
    );

    category.keywords = findKeywordFromParent(category, categories);
    return `ParentCategoryID=${category.parentCategoryId}, Name=${category.name}, Keywords=${category.keywords}`;
  } else return "entered category Id is not a valid number!";
};

const getCategoryIdsByLevel = (categoryLevel) => {
  //numeric value validation
  if (!isNaN(categoryLevel)) {
    if (categoryLevel === 1)
      categories = categories.filter(
        (_category) => _category.parentCategoryId == -1
      );
    else
      categories = categories.filter(
        (_category) => _category.parentCategoryId % 10 == categoryLevel - 2
      );

    return categories.map((_category) => _category.categoryId);
  } else return "entered category level is not a valid number!";
};

let findKeywordFromParent = (category, categories) => {
  if (category.hasOwnProperty("keywords")) {
    if (category.keywords) return category.keywords;
  }

  return findKeywordFromParent(
    categories.find((_category) => {
      return _category.categoryId === category.parentCategoryId;
    }),
    categories
  );
};

console.clear();
console.log(
  "Problem 1: Write a function that, given a category id, returns an output string of each category property delimited with a comma.\n"
);
console.log("call getCategoryById(202) for test");
console.log(getCategoryById(202));
console.log(
  "**************************************************************************************************"
);
console.log(
  "Problem 2: Write a function that, given category level as parameter (say N), returns the category ids of the categories which are of N’th level in the hierarchy.\n"
);
console.log("call getCategoryIdsByLevel(3) for test");
console.log(getCategoryIdsByLevel(3));
console.log(
  "**************************************************************************************************"
);
