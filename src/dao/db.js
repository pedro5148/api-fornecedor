import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config();

const connectToDatabase = async () => {
  const DB = process.env.DATABASE_URL;
  
  try {
    await mongoose
            .connect(DB)
            .then(() => console.log('Conexão com o MongoDB estabelecida com sucesso!'));
  } catch (err) {
    console.error('Erro ao conectar ao MongoDB:', err.message);
    process.exit(1);
  }
};

//module.exports = connectToDatabase;
export default connectToDatabase;