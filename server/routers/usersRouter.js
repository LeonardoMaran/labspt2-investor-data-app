const express = require("express");
const router = express.Router();
const users = require("../data/helpers/usersModel");
const axios = require("axios");
const bcrypt = require("bcryptjs");
const { authenticate, generateToken } = require("../data/auth/authenticate");

/* TODO:
    Add either a route get/users and authenticate the route for
    front end use and viewing. 


*/
// Added routes for signin and authenticate the username and password for front end use.
module.exports = router => {
<<<<<<< HEAD
  router.get("/signin", signin);
  router.get("/signin", signup);
  router.get("/:id", authenticate, userById);
};
=======
    router.get("/signin", signin);
    router.get("/signin", signup);
    router.get("/:id", userById);
    // router.get("/:id", authenticate, userById);
    router.put("/:id", update)
}
>>>>>>> 74f249f99505dbd10d739bf7697ae85e9fcf367c

/************************************ USERS SECTION ***********************************/
// protect this route, only authenticated users should see it
/* router.get('/', protect, (req, res) => {
    users.findUsers()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).send(err);
    })
  }); */
/********* Get Users *************/
router.get("/", (req, res) => {
  users
    .get()
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      res.status(500).json({ error: "The users could not be retrieved." });
    });
});

signin = (req, res) => {
  //implementing user signin
  const creds = req.body;
  users
    .get(creds.username)
    .then(user => {
      //Check to see is username is valid
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        const token = generateToken(user);
        res.json({ id: user.id, token });
      } else {
        res.status(404).json({ err: "Invalid username or password" });
      }
    })
    .catch(err => res.status(500).send(err));
};

signup = (req, res) => {
  const user = req.body;
  user.password = bcrypt.hashSync(user.password, 12);
  users.insert(user).then(ids => {
    users
      .getByUser([ids[0]])
      .then(user => {
        const token = generateToken(user);
        res.status(201).json({ id: user.id, token });
      })
      .catch(err => {
        res.status(500).send(err);
      });
  });
};

/********* Get Single User *************/
router.get('/:id', (req, res) => {
    const { id } = req.params
    users.getById(id)
        .then(user => {
            if (user) {
                res.json(user);
            } else {
                res
                    .status(404)
                    .json({ message: "The user with the specified ID does not exist." })
            }
        })
        .catch(err => {
            res
                .status(500)
                .json({ error: "The users information could not be retrieved." });
        });
});

// Update user's settings
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    users.update(id, changes)
        .then(count => {
            if (count) {
                // If user's settings have been updated, return count of rows (1) that have been updated.
                res
                    .status(201)
                    .json({ count });
            }
            else {
                // If user does not exist, return 404 error.
                res
                    .status(404)
                    .json({ message: 'The user with the specified ID does not exist.' });
            }
        })
        .catch(err => {
            // If there's an error in the helper method or database, return a 500 error.
            res
                .status(500)
                .json({ message: `Database error. The user's settings could not be updated at this time.`});
        });
});



module.exports = router;
