import prisma from "../DB/db.config.js";


// Create New User Handle
const createUser = async (req, res) => {
    try {
        const { email, password, name } = req.body;

        console.log("Creating user:", email, password, name);

        const existingUser = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (existingUser) {
            return res.status(400).json({ message: "Email is already in use" });
        }

        const newUser = await prisma.user.create({
            data: {
                email,
                password,
                name
            }
        });

        console.log("User created:", newUser);

        return res.status(201).json({ newUser, message: "User Created" });
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};


// Get All Users Handle
const getUsers = async (req, res) => {
    try {
        const getAllUsers = await prisma.user.findMany({});

        if (getAllUsers.length > 0) {
            return res.json({ users: getAllUsers });
        } else {
            return res.json({ message: "Users not found" });
        }
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};


// Get All User Post
const userPosts = async (req, res) => {
    try {
        const { id } = req.body;

        const getUserPosts = await prisma.user.findUnique({
            where: {
                id
            }, include: {
                posts: true
            }
        })

        if (getUserPosts) {
            const userPosts = getUserPosts.posts;
            return res.json({ userPosts })
        } else {
            return res.json({ message: "User not found" });
        }
    } catch (error) {
        console.log(error)
    }
}

// get Details about User
const getUserDetailsWithId = async (req, res) => {
    const { id } = req.body;

    const getUserDetails = await prisma.user.findUnique({
        where: { id },
        include: {
            posts: true
        }
    })

    if (getUserDetails) {
        return res.json({ getUserDetails })
    } else {
        res.json({ message: "User not found" });
    }
}

export default { createUser, getUsers, userPosts, getUserDetailsWithId };
