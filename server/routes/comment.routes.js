const express = require('express');
const router = express.Router();
const {
    getAllComments,
    createComment,
    approveComment,
    rejectComment,
    markAsSpam,
    deleteComment,
    getArticleComments,
    getBlogComments
} = require('../controllers/comment.controller');
const { authenticateToken, authorizeRoles } = require('../middleware/auth.middleware');

// Public routes
router.get('/article/:articleId', getArticleComments);
router.get('/blog/:blogId', getBlogComments);
router.post('/', createComment); // Can be used by logged-in or guest users

// Admin/Editor routes
router.get('/', authenticateToken, authorizeRoles('ADMIN', 'EDITOR'), getAllComments);
router.put('/:id/approve', authenticateToken, authorizeRoles('ADMIN', 'EDITOR'), approveComment);
router.put('/:id/reject', authenticateToken, authorizeRoles('ADMIN', 'EDITOR'), rejectComment);
router.put('/:id/spam', authenticateToken, authorizeRoles('ADMIN', 'EDITOR'), markAsSpam);
router.delete('/:id', authenticateToken, authorizeRoles('ADMIN'), deleteComment);

module.exports = router;
