import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, doc, getDoc, query, where, deleteDoc, orderBy, updateDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCe8hV0gdcSZxGooE9BgGbnilWCLSqqkWM",
  authDomain: "quiz-malu-16b06.firebaseapp.com",
  databaseURL: "https://quiz-malu-16b06-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "quiz-malu-16b06",
  storageBucket: "quiz-malu-16b06.firebasestorage.app",
  messagingSenderId: "336111113184",
  appId: "1:336111113184:web:b8f0d011c9365e8b421185"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);   

export async function findWordByCategory(categoryId) {
    try {
        const q = query(collection(db, "word"), where("category", "==", categoryId));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const palavras = [];
            querySnapshot.forEach((doc) => {
                palavras.push({ id: doc.id, ...doc.data() });
            });
            return palavras;
        } else {
            console.log("Nenhuma palavra encontrado com a categoria de id:", categoryId);
            return [];
        }
    } catch (e) {
        console.error("Erro ao buscar palavra pela categoria de id:", e);
    }
}

export async function removeWord(wordId) {
    try {
        const docRef = doc(db, "word", wordId);
        await deleteDoc(docRef);
        console.log(`Palavra com ID ${wordId} removido com sucesso!`);
    } catch (error) {
        console.error("Erro ao remover o documento:", error);
    }
}

export async function removerPergunta(id) {
    try {
        const docRef = doc(db, "pergunta", id);
        await deleteDoc(docRef);
        console.log(`Pergunta com ID ${id} removido com sucesso!`);
    } catch (error) {
        console.error("Erro ao remover o documento:", error);
    }
}

export async function addPergunta(pergunta) {
    try {
        const docRef = await addDoc(collection(db, "pergunta"), pergunta);
        console.log("Documento adicionado com ID:", docRef.id);
    } catch (e) {
        console.error("Erro ao adicionar documento:", e);
    }
}

export async function findPerguntas() {
    try {
        const q = query(collection(db, "pergunta"));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const palavras = [];
            querySnapshot.forEach((doc) => {
                palavras.push({ id: doc.id, ...doc.data() });
            });
            return palavras;
        } else {
            console.log("Nenhuma pergunta encontrada");
            return [];
        }
    } catch (e) {
        console.error("Erro ao buscar pergunta:", e);
    }
}

export async function findPerguntaById(id) {
    try {
        const docRef = doc(db, "pergunta", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            console.log("Nenhum documento encontrado com o ID fornecido.");
        }
    } catch (e) {
        console.error("Erro ao buscar o documento:", e);
    }
}

export async function updatePergunta(id, dados) {
    try {
        const docRef = doc(db, "pergunta", id);

        await updateDoc(docRef, dados);

        console.log("Pergunta atualizada com sucesso!");
    } catch (error) {
        console.error("Erro ao atualizar a pergunta:", error);
    }
}