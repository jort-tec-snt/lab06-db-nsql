import mongoose from "mongoose";
import connectDB from "../db/database.js";
import userRepository from "../repositories/userRepository.js";

const seed = async () => {
  await connectDB();

  const email = "jeronimo.ortiz@socialmedia.local";
  const existingUser = await userRepository.findByEmail(email);

  if (existingUser) {
    console.log("El usuario de prueba ya existe:", existingUser.email);
  } else {
    const user = await userRepository.create({
      name: "Jerónimo",
      lastName: "Ortiz",
      email,
      age: 22,
      phoneNumber: "999999999",
      password: "DemoPost2026",
    });

    console.log("Usuario de prueba creado:", user.email);
  }

  await mongoose.connection.close();
};

seed().catch((error) => {
  console.error("Error en el seed:", error.message);
  process.exit(1);
});