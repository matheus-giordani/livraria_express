import mongoose from "mongoose";

const password = process.env.PASSWORD_DB || "m13m25m04"
mongoose.connect(`mongodb+srv://giordani:${password}@cluster0.sarz5mr.mongodb.net/node`)

const db = mongoose.connection

export default db