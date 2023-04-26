import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile, sendPasswordResetEmail } from "firebase/auth";
import { setDoc, doc, addDoc, collection, Timestamp, onSnapshot, query, updateDoc, deleteDoc } from "firebase/firestore";
import { useLocation } from "react-router-dom";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
	const location = useLocation();
	const [user, setUser] = useState({});
	const [notes, setNotes] = useState([]);
	const [todos, setTodos] = useState([]);
	const [whiteboards, setWhiteboards] = useState([]);
	const [flashcards, setFlashcards] = useState([]);

	const createUser = async (email, password, username) => {
		return await createUserWithEmailAndPassword(auth, email, password).then(async () => {
			await updateUser(username);

			try {
				await setDoc(doc(db, "users", auth.currentUser.uid), {})
					.then(async () => {
						await setDoc(doc(db, "users", auth.currentUser.uid, "settings", "userSettings"), {
							darkMode: false,
						});
					})
					.then(async () => {
						await addDoc(collection(db, "users", auth.currentUser.uid, "notes"), {
							title: "Welcome to your notes!",
							content: "This is an example note to help you get started.",
							tags: ["Tutorial", "Example"],
							createdDate: Timestamp.now(),
							modifiedDate: Timestamp.now(),
							revisionNumber: 0,
						});
					})
					.then(async () => {
						await addDoc(collection(db, "users", auth.currentUser.uid, "todos"), {
							title: "Welcome to your tasks!",
							content: "This is an example task to help you get started.",
							tags: ["Tutorial", "Example"],
							tasks: [
								{ task: "Task 1", completed: false },
								{ task: "Task 2", completed: true },
							],
							createdDate: Timestamp.now(),
							modifiedDate: Timestamp.now(),
							revisionNumber: 0,
							taskDate: Timestamp.now(),
						});
					})
					.then(async () => {
						await addDoc(collection(db, "users", auth.currentUser.uid, "whiteboards"), {
							title: "Welcome to your whiteboard!",
							content: null,
							tags: ["Tutorial", "Example"],
							createdDate: Timestamp.now(),
							modifiedDate: Timestamp.now(),
							revisionNumber: 0,
						});
					})
					.then(async () => {
						await addDoc(collection(db, "users", auth.currentUser.uid, "flashcards"), {
							title: "Welcome to your Flashcards!",
							cards: [
								{ term: "Click me to see the definition", definition: "Well done!" },
								{ term: "Try creating your own flashcard", definition: "Shh, I'm hiding!" },
							],
							tags: ["Tutorial", "Example"],
							createdDate: Timestamp.now(),
							modifiedDate: Timestamp.now(),
							revisionNumber: 0,
						});
					});
			} catch (error) {
				console.log(error);
			}
		});
	};

	const updateUser = (username) => {
		return updateProfile(auth.currentUser, {
			displayName: username,
		});
	};

	const signIn = (email, password) => {
		return signInWithEmailAndPassword(auth, email, password);
	};

	const resetPassword = (email) => {
		return sendPasswordResetEmail(auth, email);
	};

	const logout = () => {
		return signOut(auth);
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
		});

		return () => {
			unsubscribe();
		};
	}, []);

	useEffect(() => {
		if (location.pathname.includes("/notes")) {
			onAuthStateChanged(auth, async (currentUser) => {
				const notesQuery = query(collection(db, "users", currentUser.uid, "notes"));
				const unsubscribe = onSnapshot(notesQuery, (querySnapshot) => {
					var notesArr = [];
					querySnapshot.forEach((doc) => {
						notesArr.push({ ...doc.data(), id: doc.id });
					});
					setNotes(notesArr);
				});
				return () => {
					unsubscribe();
				};
			});
		}
		if (location.pathname.includes("/todos")) {
			onAuthStateChanged(auth, async (currentUser) => {
				const todoQuery = query(collection(db, "users", currentUser.uid, "todos"));
				const unsubscribe = onSnapshot(todoQuery, (querySnapshot) => {
					var todoArr = [];
					querySnapshot.forEach((doc) => {
						todoArr.push({ ...doc.data(), id: doc.id });
					});
					setTodos(todoArr);
				});
				return () => {
					unsubscribe();
				};
			});
		}
		if (location.pathname.includes("/whiteboards")) {
			onAuthStateChanged(auth, async (currentUser) => {
				const boardQuery = query(collection(db, "users", currentUser.uid, "whiteboards"));
				const unsubscribe = onSnapshot(boardQuery, (querySnapshot) => {
					var whiteboardsArr = [];
					querySnapshot.forEach((doc) => {
						whiteboardsArr.push({ ...doc.data(), id: doc.id });
					});
					setWhiteboards(whiteboardsArr);
				});
				return () => {
					unsubscribe();
				};
			});
		}
		if (location.pathname.includes("/flashcards")) {
			onAuthStateChanged(auth, async (currentUser) => {
				const cardsQuery = query(collection(db, "users", currentUser.uid, "flashcards"));
				const unsubscribe = onSnapshot(cardsQuery, (querySnapshot) => {
					var flashcardsArr = [];
					querySnapshot.forEach((doc) => {
						flashcardsArr.push({ ...doc.data(), id: doc.id });
					});
					setFlashcards(flashcardsArr);
				});
				return () => {
					unsubscribe();
				};
			});
		}
	}, [location]);

	const createNote = async () => {
		const docRef = await addDoc(collection(db, "users", user.uid, "notes"), {
			title: "",
			content: "",
			tags: [],
			createdDate: Timestamp.now(),
			modifiedDate: Timestamp.now(),
			revisionNumber: 0,
		});

		return docRef.id;
	};

	const updateNote = async (noteId, title, content, tags, revisionNumber) => {
		await updateDoc(doc(db, "users", user.uid, "notes", noteId), {
			title: title,
			content: content,
			tags: tags,
			modifiedDate: Timestamp.now(),
			revisionNumber: revisionNumber,
		});
	};

	const deleteNote = async (noteId) => {
		await deleteDoc(doc(db, "users", user.uid, "notes", noteId));
	};

	const createWhiteboard = async () => {
		const docRef = await addDoc(collection(db, "users", user.uid, "whiteboards"), {
			title: "",
			content: null,
			tags: [],
			createdDate: Timestamp.now(),
			modifiedDate: Timestamp.now(),
			revisionNumber: 0,
		});

		return docRef.id;
	};

	const updateWhiteboard = async (whiteboardId, title, content, tags, revisionNumber) => {
		await updateDoc(doc(db, "users", user.uid, "whiteboards", whiteboardId), {
			title: title,
			content: content,
			tags: tags,
			modifiedDate: Timestamp.now(),
			revisionNumber: revisionNumber,
		});
	};

	const deleteWhiteboard = async (whiteboardId) => {
		await deleteDoc(doc(db, "users", user.uid, "whiteboards", whiteboardId));
	};

	const createFlashcardGroup = async () => {
		const docRef = await addDoc(collection(db, "users", user.uid, "flashcards"), {
			title: "",
			cards: null,
			tags: [],
			createdDate: Timestamp.now(),
			modifiedDate: Timestamp.now(),
			revisionNumber: 0,
		});

		return docRef.id;
	};

	const updateFlashcardGroup = async (flashcardId, title, cards, tags, revisionNumber) => {
		await updateDoc(doc(db, "users", user.uid, "flashcards", flashcardId), {
			title: title,
			cards: cards,
			tags: tags,
			modifiedDate: Timestamp.now(),
			revisionNumber: revisionNumber,
		});
	};

	const deleteFlashcardGroup = async (flashcardId) => {
		await deleteDoc(doc(db, "users", user.uid, "flashcards", flashcardId));
	};

	//TODO CONSTRUCTORS
	const createToDo = async (newTodo) => {
		const docRef = await addDoc(collection(db, "users", user.uid, "todos"), newTodo);
		return docRef.id;
	};

	const updateToDoSubTask = async (docId, taskIndex) => {
		const docRef = await updateDoc(doc(db, "users", user.uid, "todos", docId), taskIndex);
		return docId;
	};

	return <UserContext.Provider value={{ createUser, user, logout, signIn, updateUser, resetPassword, notes, createNote, updateNote, deleteNote, todos, createToDo, updateToDoSubTask, whiteboards, createWhiteboard, updateWhiteboard, deleteWhiteboard, flashcards, createFlashcardGroup, updateFlashcardGroup, deleteFlashcardGroup }}>{children}</UserContext.Provider>;
};

export const UserAuth = () => {
	return useContext(UserContext);
};
