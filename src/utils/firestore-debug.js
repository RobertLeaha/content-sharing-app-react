// Utilitar pentru debugging Firestore
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebase";

export const debugFirestore = async (userId) => {
  try {
    console.log("🔍 Debug Firestore pentru utilizatorul:", userId);

    if (!userId) {
      console.log("❌ Nu există utilizator autentificat");
      return;
    }

    // Verifică conexiunea la Firestore
    console.log("📡 Verifică conexiunea la Firestore...");

    // Încearcă să citească toate cărțile utilizatorului
    const q = query(collection(db, "books"), where("userId", "==", userId));

    const querySnapshot = await getDocs(q);
    console.log("📚 Numărul de cărți găsite:", querySnapshot.size);

    const books = [];
    querySnapshot.forEach((doc) => {
      const bookData = { id: doc.id, ...doc.data() };
      books.push(bookData);
      console.log("📖 Carte găsită:", {
        id: doc.id,
        title: bookData.title,
        author: bookData.author,
        userId: bookData.userId,
      });
    });

    return books;
  } catch (error) {
    console.error("❌ Eroare la debugging Firestore:", error);
    console.error("Detalii eroare:", {
      code: error.code,
      message: error.message,
      stack: error.stack,
    });
    return [];
  }
};

export const testFirestoreConnection = async () => {
  try {
    console.log("🧪 Testează conexiunea la Firestore...");

    // Încearcă să citească colecția books (fără filtre)
    const querySnapshot = await getDocs(collection(db, "books"));
    console.log(
      "✅ Conexiune reușită! Numărul total de cărți:",
      querySnapshot.size
    );

    return true;
  } catch (error) {
    console.error("❌ Eroare la testarea conexiunii Firestore:", error);
    return false;
  }
};
