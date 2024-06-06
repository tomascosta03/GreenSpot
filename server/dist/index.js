"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_1 = __importDefault(require("./routes/user"));
const park_1 = __importDefault(require("./routes/park"));
const spot_1 = __importDefault(require("./routes/spot"));
const cors_1 = __importDefault(require("cors"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
const mongoose = require('mongoose');

// Middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: ['192.168.1.76:8081', 'http://localhost:8000']
}));
app.use((0, morgan_1.default)('tiny'));

// Certificar-se de que a pasta 'uploads/' existe
const uploadsDir = path_1.default.join(__dirname, 'uploads');
if (!fs_1.default.existsSync(uploadsDir)) {
    fs_1.default.mkdirSync(uploadsDir);
}

// Configuração do Multer para armazenar imagens
const storage = multer_1.default.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path_1.default.extname(file.originalname)); // Adicionar extensão do arquivo
  },
});

const upload = (0, multer_1.default)({ storage: storage });

// Endpoint para upload de imagem de perfil
app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    const userId = req.body.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send('Usuário não encontrado');
    }

    user.profileImage = `/uploads/${req.file.filename}`;
    await user.save();

    res.json({ url: user.profileImage });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Servir arquivos estáticos da pasta 'uploads'
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, 'uploads')));

// Rotas
app.use('/api/users', user_1.default);
app.use('/api/parks', park_1.default);
app.use('/api/spots', spot_1.default);

// Conectar ao MongoDB
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
