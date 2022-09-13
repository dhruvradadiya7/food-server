const { getDatabase, ref, child, get } = require("@firebase/database");
const { storeRecipe } = require("../user/controller");

const router = require("express").Router();

router.get("/fetch-all", (req, res) => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `recipes`)).then((snapshot) => {
        if (snapshot.exists()) {
            res.send(snapshot.val())
        } else {
            res.status(400).send("No data available")
        }
    }).catch((error) => {
        res.status(400).send(error);
    });
});

router.post("/store-recipe", async (req, res) => {
    const {id, data} = req.body;
    try{
        const result = await storeRecipe(id, data);
        res.status(200).send(result);
    } catch(e){
        console.log(e);
        res.status(400).send('Firebase store failed!')
    }
});

router.get("/fetch-by-id", (req, res) => {
    let { ids } = req.query;
    const dbRef = ref(getDatabase());
    if(!ids){
        return res.send("No ids are given!");
    }
    get(child(dbRef, `recipes`)).then((snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            const result = {};
            ids = ids.split(',');
            ids.forEach(id => result[id] = data[id]);
            res.send(result);
        } else {
            return res.status(400).send("No data available")
        }
    }).catch((error) => {
        return res.status(400).send(error);
    });
});

module.exports = router;