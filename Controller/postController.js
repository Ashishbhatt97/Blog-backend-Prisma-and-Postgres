import prisma from "../DB/db.config.js"

//Create Post
const createPostHandler = async (req, res) => {
    const { id, title, description } = req.body;

    try {
        // Check if the author with the given authorId exists
        const existingAuthor = await prisma.user.findUnique({
            where: {
                id
            }
        });

        if (!existingAuthor) {
            return res.status(400).json({ message: "Author not found" });
        }

        // Create a new post
        const createPost = await prisma.post.create({
            data: {
                title,
                description,
                author: {
                    connect: { id: existingAuthor.id }
                },
            }

        });

        return res.status(201).json({ message: "Post created", createPost });
    } catch (error) {
        console.error("Error creating post:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Update Post Handler
const updatePostHandler = async (req, res) => {

    const { title, description, authorId, id } = req.body;

    try {
        const updatePost = {};

        if (title) updatePost.title = title;
        if (description) updatePost.description = description;


        const updatedPost = await prisma.post.update({
            data: updatePost,
            where: {
                id
            },
        });

        if (updatedPost) {
            return res.json({
                message: "Post Updated Successfully"
                , updatedPost
            })
        } else {
            return res.json({
                message: "Failed to update"
            })
        }


    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

// Delete the post 
const deletePostHandler = async (req, res) => {
    const { postId } = req.body;

    try {
        const deletePost = await prisma.post.delete({
            where: { id: postId },
        })

        if (deletePost) {
            return res.json({ message: "Post Deleted", deletePost });
        }
        else {
            return res.json({ messsage: "Post Unavailable" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export default { updatePostHandler, createPostHandler, deletePostHandler }