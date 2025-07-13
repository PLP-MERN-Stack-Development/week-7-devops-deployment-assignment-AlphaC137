import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
const helmet = require('helmet');
const cors = require('cors');

module.exports = [helmet(), cors()];
