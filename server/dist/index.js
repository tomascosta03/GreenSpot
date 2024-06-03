"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors")); // Importar cors
const user_1 = __importDefault(require("./routes/user"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
const mongoose = require('mongoose');
// Middleware
app.use((0, cors_1.default)()); // Adicionar o middleware cors
app.use(express_1.default.json());
app.use((0, morgan_1.default)('tiny'));
app.use('/api/users', user_1.default);
mongoose.connect(process.env.DB)
    .then(() => {
    app.listen(port, () => {
        console.log(`Database connected successfully`);
        console.log(`The server is listening on: http://localhost:${port}`);
    });
})
    .catch((error) => {
    console.log(error);
});
