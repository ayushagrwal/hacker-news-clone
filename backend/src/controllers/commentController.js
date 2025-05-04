const { prisma } = require('../config');

// Create a new comment
exports.createComment = async (req, res, next) => {
    try {
        const { postId, text, parentId } = req.body;
        const authorId = req.user.id;

        if (!postId || !text) {
            return res.status(400).json({ error: "Post ID and comment text are required" });
        }

        // Verify the post exists
        const post = await prisma.post.findUnique({
            where: { id: parseInt(postId) }
        });

        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        // If parentId is provided, verify the parent comment exists
        if (parentId) {
            const parentComment = await prisma.comment.findUnique({
                where: { id: parseInt(parentId) }
            });

            if (!parentComment) {
                return res.status(404).json({ error: "Parent comment not found" });
            }
        }

        const comment = await prisma.comment.create({
            data: {
                text,
                authorId,
                postId: parseInt(postId),
                parentId: parentId ? parseInt(parentId) : null
            },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        });

        res.status(201).json(comment);
    } catch (err) {
        next(err);
    }
};

// Get comments for a post
// exports.getPostComments = async (req, res, next) => {
//     try {
//         const { postId } = req.params;
        
//         // Verify the post exists
//         const post = await prisma.post.findUnique({
//             where: { id: parseInt(postId) }
//         });

//         if (!post) {
//             return res.status(404).json({ error: "Post not found" });
//         }

//         // Get top-level comments (parentId is null)
//         const comments = await prisma.comment.findMany({
//             where: { 
//                 postId: parseInt(postId),
//                 parentId: null
//             },
//             include: {
//                 author: {
//                     select: {
//                         id: true,
//                         name: true
//                     }
//                 },
//                 children: {
//                     include: {
//                         author: {
//                             select: {
//                                 id: true,
//                                 name: true
//                             }
//                         },
//                         children: {
//                             include: {
//                                 author: {
//                                     select: {
//                                         id: true,
//                                         name: true
//                                     }
//                                 }
//                             }
//                         }
//                     }
//                 }
//             },
//             orderBy: { createdAt: 'desc' }
//         });

//         res.json(comments);
//     } catch (err) {
//         next(err);
//     }
// };

exports.getPostComments = async (req, res, next) => {
    try {
        const { postId } = req.params;

        // Verify the post exists
        const post = await prisma.post.findUnique({
            where: { id: parseInt(postId) }
        });

        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        // Fetch all comments related to the post
        const comments = await prisma.comment.findMany({
            where: { postId: parseInt(postId) },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            },
            orderBy: { createdAt: 'asc' } // so parents come before children
        });

        // Build a map of comments by id
        const commentMap = {};
        comments.forEach(comment => {
            comment.children = [];
            commentMap[comment.id] = comment;
        });

        const rootComments = [];

        // Construct the tree
        comments.forEach(comment => {
            if (comment.parentId === null) {
                rootComments.push(comment);
            } else if (commentMap[comment.parentId]) {
                commentMap[comment.parentId].children.push(comment);
            }
        });

        res.json(rootComments);
    } catch (err) {
        next(err);
    }
};


// Update a comment
exports.updateComment = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { text } = req.body;
        const userId = req.user.id;

        if (!text) {
            return res.status(400).json({ error: "Comment text is required" });
        }

        const comment = await prisma.comment.findUnique({
            where: { id: parseInt(id) },
            select: { authorId: true }
        });

        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }

        if (comment.authorId !== userId) {
            return res.status(403).json({ error: "You are not authorized to update this comment" });
        }

        const updatedComment = await prisma.comment.update({
            where: { id: parseInt(id) },
            data: { text },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        });

        res.json(updatedComment);
    } catch (err) {
        next(err);
    }
};

// Delete a comment
exports.deleteComment = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const comment = await prisma.comment.findUnique({
            where: { id: parseInt(id) },
            select: { authorId: true }
        });

        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }

        if (comment.authorId !== userId) {
            return res.status(403).json({ error: "You are not authorized to delete this comment" });
        }

        await prisma.comment.delete({
            where: { id: parseInt(id) }
        });

        res.json({ message: "Comment deleted successfully" });
    } catch (err) {
        next(err);
    }
};

// Get replies for a comment
exports.getCommentReplies = async (req, res, next) => {
    try {
        const { commentId } = req.params;
        
        // Verify the comment exists
        const comment = await prisma.comment.findUnique({
            where: { id: parseInt(commentId) }
        });

        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }

        // Get all replies for this comment
        const replies = await prisma.comment.findMany({
            where: { parentId: parseInt(commentId) },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                children: {
                    include: {
                        author: {
                            select: {
                                id: true,
                                name: true
                            }
                        }
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        res.json(replies);
    } catch (err) {
        next(err);
    }
}; 