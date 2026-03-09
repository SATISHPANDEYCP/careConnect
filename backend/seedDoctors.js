import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import doctorModel from "./models/doctorModel.js";
import connectDB from "./config/mongodb.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const doctorsData = [
  {
    name: "Dr. Tanya Desai",
    email: "tanya.desai@example.com",
    password: "password123",
    imageName: "Tanya Desai.png",
    speciality: "Dermatologist",
    degree: "MBBS, MD (Dermatology)",
    experience: "1 Year",
    about: "Dr. Tanya Desai is a board-certified dermatologist who provides personalized treatment for acne, eczema, hair fall, and pigmentation. She is skilled in both medical and cosmetic dermatology and is appreciated for her results-driven skincare plans and patient satisfaction.",
    fees: 695,
    address: {
      line1: "SkinCure Hub",
      line2: "Nagpur, Maharashtra",
    },
  },
  {
    name: "Dr. Karan Rathore",
    email: "karan.rathore@example.com",
    password: "password123",
    imageName: "Karan Rathore.png",
    speciality: "Neurologist",
    degree: "MBBS, DM (Neurology)",
    experience: "6 Year",
    about: "Dr. Karan Rathore is a highly respected neurologist with expertise in treating epilepsy, stroke, Parkinson's disease, and neurodegenerative disorders. He combines clinical skills with advanced neuroimaging and neurophysiological techniques to deliver precise diagnoses and personalized care.",
    fees: 1500,
    address: {
      line1: "NeuroCare Hospital",
      line2: "Pune, Maharashtra",
    },
  },
  {
    name: "Dr. Riya Malhotra",
    email: "riya.malhotra@example.com",
    password: "password123",
    imageName: "Riya Malhotra.png",
    speciality: "Gynecologist",
    degree: "MBBS, MD (Gynae)",
    experience: "8 Year",
    about: "With over 8 years of experience, Dr. Riya Malhotra specializes in women's reproductive health, high-risk pregnancies, infertility treatments, and menstrual disorders. She is known for providing empathetic care and creating a comfortable environment for her patients throughout their reproductive journey.",
    fees: 1400,
    address: {
      line1: "Womens Health Center",
      line2: "Mumbai, Maharashtra",
    },
  },
  {
    name: "Dr. Nisha Joshi",
    email: "nisha.joshi@example.com",
    password: "password123",
    imageName: "Nisha Joshi.png",
    speciality: "Gastroenterologist",
    degree: "MBBS, MD (Gastro)",
    experience: "9 Year",
    about: "Dr. Nisha Joshi is an experienced gastroenterologist treating complex digestive and liver disorders. Her areas of expertise include endoscopy, IBS, GERD, liver cirrhosis, and pancreatitis. She is known for a patient-centric approach and educating patients about dietary and lifestyle changes.",
    fees: 1200,
    address: {
      line1: "Digestive Health Center",
      line2: "Ahmedabad, Gujarat",
    },
  },
  {
    name: "Dr. Meera Banerjee",
    email: "meera.banerjee@example.com",
    password: "password123",
    imageName: "Meera Banerjee.png",
    speciality: "Gynecologist",
    degree: "MBBS, MS (Obs & Gyn)",
    experience: "4 Year",
    about: "Dr. Meera Banerjee is a senior gynecologist renowned for her expertise in managing high-risk pregnancies, PCOS, and menopause-related issues. She also offers counseling and fertility support. Her warm demeanor and experience make her a reliable choice for women's healthcare needs.",
    fees: 1000,
    address: {
      line1: "Maternity Care Clinic",
      line2: "Kolkata, West Bengal",
    },
  },
  {
    name: "Dr. Aarav Sharma",
    email: "aarav.sharma@example.com",
    password: "password123",
    imageName: "Aarav Sharma.png",
    speciality: "General physician",
    degree: "MBBS",
    experience: "1 Year",
    about: "Dr. Aarav Gupta is a trusted general physician known for his accurate diagnosis and compassionate care. He focuses on preventive healthcare and offers comprehensive treatment for common ailments, lifestyle diseases, and infections. Patients appreciate his patient-friendly approach and detailed consultations.",
    fees: 1000,
    address: {
      line1: "Life Care Clinic",
      line2: "Delhi, India",
    },
  },
  {
    name: "Dr. Aditya Yadav",
    email: "aditya.yadav@example.com",
    password: "password123",
    imageName: "Aditya Yadav.png",
    speciality: "General physician",
    degree: "MBBS",
    experience: "4 Year",
    about: "Dr. Aditya Yadav provides primary healthcare services for patients of all ages. He handles general consultations, chronic illness management, and seasonal infections with a strong emphasis on early detection and lifestyle correction. His clear communication makes him a favorite among patients.",
    fees: 1507,
    address: {
      line1: "City Health Point",
      line2: "Hyderabad, Telangana",
    },
  },
  {
    name: "Dr. Ishaan Mehra",
    email: "ishaan.mehra@example.com",
    password: "password123",
    imageName: "Ishaan Mehra.png",
    speciality: "Dermatologist",
    degree: "MBBS, DDVL",
    experience: "6 Year",
    about: "Dr. Ishaan Mehra is a skilled dermatologist specializing in the diagnosis and treatment of skin disorders, cosmetic dermatology, and hair-related concerns. His expertise includes acne management, pigmentation issues, laser therapies, and skin rejuvenation treatments tailored to individual skin types.",
    fees: 700,
    address: {
      line1: "SkinSense Clinic",
      line2: "Bangalore, Karnataka",
    },
  },
  {
    name: "Dr. Sameer Khan",
    email: "sameer.khan@example.com",
    password: "password123",
    imageName: "Sameer Khan.png",
    speciality: "Neurologist",
    degree: "MBBS, DM (Neurology)",
    experience: "8 Year",
    about: "Dr. Sameer Khan brings over a decade of experience in treating neurological conditions such as migraines, dementia, neuropathy, and spine disorders. He is known for his clinical accuracy, compassionate care, and evidence-based treatment methods that enhance patients' quality of life.",
    fees: 1200,
    address: {
      line1: "Brain & Spine Center",
      line2: "Jaipur, Rajasthan",
    },
  },
];

const uploadImage = async (imagePath) => {
  try {
    const result = await cloudinary.uploader.upload(imagePath, {
      resource_type: "image",
      folder: "CareConnect/doctors",
    });
    return result.secure_url;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

const deleteCloudinaryImages = async () => {
  try {
    console.log("Deleting old images from Cloudinary CareConnect/doctors folder...");
    const result = await cloudinary.api.delete_resources_by_prefix("CareConnect/doctors/");
    console.log(`Deleted ${result.deleted ? Object.keys(result.deleted).length : 0} images from Cloudinary\n`);
  } catch (error) {
    console.log("No images found in Cloudinary or error:", error.message);
  }
};

const seedDoctors = async () => {
  try {
    await connectDB();

    console.log("Clearing existing doctors from MongoDB...");
    await doctorModel.deleteMany({});
    console.log("MongoDB cleared\n");

    await deleteCloudinaryImages();

    console.log("Uploading images and seeding doctors...\n");

    const imagesFolder = path.join(__dirname, "seed-images");

    for (const doctorData of doctorsData) {
      try {
        const imagePath = path.join(imagesFolder, doctorData.imageName);

        let imageUrl = "";

        if (fs.existsSync(imagePath)) {
          console.log(`Uploading ${doctorData.imageName}...`);
          imageUrl = await uploadImage(imagePath);
          console.log(`Uploaded: ${doctorData.name}`);
        } else {
          console.log(
            `Image not found for ${doctorData.name}: ${doctorData.imageName}`
          );
          console.log(`   Skipping this doctor...`);
          continue;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(doctorData.password, salt);

        const doctor = new doctorModel({
          name: doctorData.name,
          email: doctorData.email,
          password: hashedPassword,
          image: imageUrl,
          speciality: doctorData.speciality,
          degree: doctorData.degree,
          experience: doctorData.experience,
          about: doctorData.about,
          fees: doctorData.fees,
          address: doctorData.address,
          date: Date.now(),
          available: true,
          slots_booked: {},
        });

        await doctor.save();
        console.log(`Seeded: ${doctorData.name}\n`);
      } catch (error) {
        console.error(`Error seeding ${doctorData.name}:`, error.message);
      }
    }

    console.log("\nSeeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};

seedDoctors();
