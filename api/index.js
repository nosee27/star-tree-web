const express = require('express');
const app = express();

// 导入后端路由
const userRoutes = require('../backend/routes/userRoutes');
const postRoutes = require('../backend/routes/postRoutes');
const commentRoutes = require('../backend/routes/commentRoutes');
const matchRoutes = require('../backend/routes/matchRoutes');
const plantRoutes = require('../backend/routes/plantRoutes');

// 连接数据库
require('../backend/config/db')();

// 中间件
app.use(express.json());

// API 路由
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/posts', commentRoutes);
app.use('/api/match', matchRoutes);
app.use('/api/plants', plantRoutes);

module.exports = app;