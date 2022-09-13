const {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} = require("firebase/auth");
const { getDatabase, ref, child, get } = require("@firebase/database");
const { storeUserData } = require("./controller");

const router = require("express").Router();

const getUserById = (uid) => {
  const dbRef = ref(getDatabase());
  return get(child(dbRef, `users/${uid}`)).then((snapshot) => {
    if (snapshot.exists()) {
      return snapshot.val();
    }
  });
};

router.post("/register", (req, res) => {
  const { email, password, passwordConfirmation, ...rest } = req.body;
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      // Signed in
      const user = userCredential.user;
      const data = { email, ...rest, role: "standard", uid: user.uid, cart: '', favorites: '' };
      storeUserData(user.uid, data);
      res.send(data);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      // Signed in
      const user = userCredential.user;
      const userDB = await getUserById(user.uid);
      if(userDB.blocked){
        res.status(400).send('User is blocked, contact admin for further assistance!')
      }
      if (userDB) {
        return res.send(userDB || {});
      }
      res.status(400).send("User doesn't exist!");
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

module.exports = router;
