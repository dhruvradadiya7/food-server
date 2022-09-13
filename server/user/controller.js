const { getDatabase, ref, set } = require("firebase/database");

function storeUserData(userId, data) {
  const db = getDatabase();
  try {
    set(ref(db, "users/" + userId), data);
  } catch (e) {
    console.log(e)
  }
}


// Recipe store
const storeRecipe = (id, data) => {
  return new Promise((resolve, reject) => {
    const db = getDatabase();
    try {
      set(ref(db, "recipes/" + id), data);
      resolve("Recipe updated successfully!");
    } catch (e) {
      reject(e);
    }
  });
}


module.exports = {
  storeUserData, storeRecipe
};
