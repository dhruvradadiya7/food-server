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

router.post('/cart', async (req, res) => {
    const { id, uid } = req.body;
    const user = await getUserById(uid);
    if (user) {
        let { cart } = user;

        // Remove Cart
        if (cart && cart.includes(id)) {
            cart = cart.replace(cart.includes(',') ? `,${id}` : id, '').replace(`${id},`, '')
        }
        else {
            cart = cart ? cart + `,${id}` : `${id}`;
        }

        const data = {
            ...user,
            cart
        }
        storeUserData(user.uid, data);
        return res.send(data)
    }
    return res.status(400).send("No user found!")
});

router.post('/favorites', async (req, res) => {
    const { id, uid } = req.body;
    const user = await getUserById(uid);
    if (user) {
        let { favorites } = user;

        // Remove Cart
        if (favorites && favorites.includes(id)) {
            favorites = favorites.replace(favorites.includes(',') ? `,${id}` : id, '').replace(`${id},`, '')
        }
        else {
            favorites = favorites ? favorites + `,${id}` : `${id}`;
        }

        const data = {
            ...user,
            favorites
        }
        storeUserData(user.uid, data);
        return res.send(data)
    }
    return res.status(400).send("No user found!")
});

router.post('/block', async (req, res) => {
    const { uid } = req.body;
    const user = await getUserById(uid);
    if (user) {
        let { blocked } = user;
        blocked = typeof blocked !== undefined ? !blocked : true;
        const data = {
            ...user,
            blocked
        }
        storeUserData(user.uid, data);
        return res.send(data)
    }
    return res.status(400).send("No user found!")
});

router.get('/all', async (req, res) => {
    const { uid } = req.query;

    if (uid) {
        const user = await getUserById(uid);
        if (user) {
            res.send(user)
        } else {
            res.status(400).send("No user found!")
        }
    } else {
        const dbRef = ref(getDatabase());
        get(child(dbRef, `users`)).then((snapshot) => {
            if (snapshot.exists()) {
                res.send(snapshot.val())
            } else {
                res.status(400).send("No data available")
            }
        }).catch((error) => {
            res.status(400).send(error);
        });
    }
});

router.post('/store-payment', async (req, res) => {
    const { uid, values } = req.body;
    try {
        const user = await getUserById(uid);
        if (user) {
            let { orders } = user;

            const data = {
                ...user,
                cart: '',
                orders: orders?.length ? [...orders, values] : [values]
            }
            storeUserData(user.uid, data);
            return res.send(data);
        }
        return res.status(400).send("No user found!");
    } catch (e) {
        console.log(e)
    }
})

module.exports = router;
