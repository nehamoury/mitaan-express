const express = require('express');
const router = express.Router();
const articleController = require('../controllers/article.controller');
const { authenticateToken, authorizeRoles } = require('../middleware/auth.middleware');

router.get('/', articleController.getAllArticles);
router.get('/:slug', articleController.getArticleBySlug);

// Comments Routes
router.get('/:id/comments', articleController.getArticleComments);
router.post('/:id/comments', articleController.createComment);

// Protected Routes
router.post('/', authenticateToken, authorizeRoles('ADMIN', 'EDITOR'), articleController.createArticle);
router.put('/:id', authenticateToken, authorizeRoles('ADMIN', 'EDITOR'), articleController.updateArticle);
router.delete('/:id', authenticateToken, authorizeRoles('ADMIN'), articleController.deleteArticle);

module.exports = router;
