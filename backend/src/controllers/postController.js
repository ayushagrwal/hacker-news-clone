const { prisma } = require('../config');

// Create a new post
exports.createPost = async (req, res, next) => {
    try {
        const { title, url, text } = req.body;
        const authorId = req.user.id;

        if (!title) {
            return res.status(400).json({ error: "Title is required" });
        }

        // Either URL or text should be provided
        if (!url && !text) {
            return res.status(400).json({ error: "Either URL or text content is required" });
        }

        const post = await prisma.post.create({
            data: {
                title,
                url,
                text,
                authorId
            }
        });

        res.status(201).json(post);
    } catch (err) {
        next(err);
    }
};

// Get all posts with pagination and sorting
exports.getPosts = async (req, res, next) => {
    try {
        const { page = 1, limit = 10, sort = "new" } = req.query;
        const skip = (parseInt(page) - 1) * parseInt(limit);
        
        let orderBy = {};
        
        switch(sort) {
            case "top":
                orderBy = { points: 'desc' };
                break;
            case "best":
                orderBy = [
                    { points: 'desc' },
                    { createdAt: 'desc' }
                ];
                break;
            case "new":
            default:
                orderBy = { createdAt: 'desc' };
        }

        const [posts, totalPosts] = await Promise.all([
            prisma.post.findMany({
                skip,
                take: parseInt(limit),
                orderBy,
                include: {
                    author: {
                        select: {
                            id: true,
                            name: true
                        }
                    },
                    _count: {
                        select: {
                            comments: true
                        }
                    }
                }
            }),
            prisma.post.count()
        ]);

        res.json({
            posts,
            totalPages: Math.ceil(totalPosts / parseInt(limit)),
            currentPage: parseInt(page)
        });
    } catch (err) {
        next(err);
    }
};

// Get a single post by ID
exports.getPostById = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        const post = await prisma.post.findUnique({
            where: { id: parseInt(id) },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                _count: {
                    select: {
                        comments: true
                    }
                }
            }
        });

        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        res.json(post);
    } catch (err) {
        next(err);
    }
};

// Search posts
exports.searchPosts = async (req, res, next) => {
    try {
        const { query, page = 1, limit = 10 } = req.query;
        
        if (!query) {
            return res.status(400).json({ error: "Search query is required" });
        }

        const skip = (parseInt(page) - 1) * parseInt(limit);
        
        const [posts, totalPosts] = await Promise.all([
            prisma.post.findMany({
                where: {
                    OR: [
                        { title: { contains: query, mode: 'insensitive' } },
                        { text: { contains: query, mode: 'insensitive' } }
                    ]
                },
                skip,
                take: parseInt(limit),
                orderBy: { createdAt: 'desc' },
                include: {
                    author: {
                        select: {
                            id: true,
                            name: true
                        }
                    },
                    _count: {
                        select: {
                            comments: true
                        }
                    }
                }
            }),
            prisma.post.count({
                where: {
                    OR: [
                        { title: { contains: query, mode: 'insensitive' } },
                        { text: { contains: query, mode: 'insensitive' } }
                    ]
                }
            })
        ]);

        res.json({
            posts,
            totalPages: Math.ceil(totalPosts / parseInt(limit)),
            currentPage: parseInt(page)
        });
    } catch (err) {
        next(err);
    }
};

// Update a post
exports.updatePost = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, url, text } = req.body;
        const userId = req.user.id;

        const post = await prisma.post.findUnique({
            where: { id: parseInt(id) },
            select: { authorId: true }
        });

        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        if (post.authorId !== userId) {
            return res.status(403).json({ error: "You are not authorized to update this post" });
        }

        const updatedPost = await prisma.post.update({
            where: { id: parseInt(id) },
            data: {
                title,
                url,
                text
            }
        });

        res.json(updatedPost);
    } catch (err) {
        next(err);
    }
};

// Delete a post
exports.deletePost = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const post = await prisma.post.findUnique({
            where: { id: parseInt(id) },
            select: { authorId: true }
        });

        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        if (post.authorId !== userId) {
            return res.status(403).json({ error: "You are not authorized to delete this post" });
        }

        await prisma.post.delete({
            where: { id: parseInt(id) }
        });

        res.json({ message: "Post deleted successfully" });
    } catch (err) {
        next(err);
    }
};

// Vote on a post
exports.votePost = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { value } = req.body;
        const userId = req.user.id;

        if (value !== 1 && value !== -1) {
            return res.status(400).json({ error: "Vote value must be 1 (upvote) or -1 (downvote)" });
        }

        const post = await prisma.post.findUnique({
            where: { id: parseInt(id) }
        });

        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        // Check if user has already voted on this post
        const existingVote = await prisma.vote.findUnique({
            where: {
                userId_postId: {
                    userId,
                    postId: parseInt(id)
                }
            }
        });

        // Begin a transaction to ensure data consistency
        await prisma.$transaction(async (prisma) => {
            if (existingVote) {
                // If the vote value is the same, remove the vote
                if (existingVote.value === value) {
                    await prisma.vote.delete({
                        where: { id: existingVote.id }
                    });
                    
                    // Update post points
                    await prisma.post.update({
                        where: { id: parseInt(id) },
                        data: { points: { decrement: value } }
                    });
                } else {
                    // Update the vote value
                    await prisma.vote.update({
                        where: { id: existingVote.id },
                        data: { value }
                    });
                    
                    // Update post points (change by 2 because we're flipping the vote)
                    await prisma.post.update({
                        where: { id: parseInt(id) },
                        data: { points: { increment: value * 2 } }
                    });
                }
            } else {
                // Create a new vote
                await prisma.vote.create({
                    data: {
                        value,
                        userId,
                        postId: parseInt(id)
                    }
                });
                
                // Update post points
                await prisma.post.update({
                    where: { id: parseInt(id) },
                    data: { points: { increment: value } }
                });
            }
        });

        // Get updated post
        const updatedPost = await prisma.post.findUnique({
            where: { id: parseInt(id) },
            select: { points: true }
        });

        res.json({ points: updatedPost.points });
    } catch (err) {
        next(err);
    }
};

// Check if user has voted on a post
exports.checkUserVoted = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        
        // Check if user has already voted on this post
        const existingVote = await prisma.vote.findUnique({
            where: {
                userId_postId: {
                    userId,
                    postId: parseInt(id)
                }
            }
        });

        return res.json({ hasVoted: !!existingVote });
    } catch (err) {
        next(err);
    }
}; 