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
	}, [location]);

	useEffect(() => {
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

	//TODO CONSTRUCTORS

	const createToDo = async (newTodo) => {
		const docRef = await addDoc(collection(db, "users", user.uid, "todos"), newTodo);

		return docRef.id;
	};
	//As you cannot update a specific array index. We will remove the current subtask and replace it with it being completed
	const updateToDoSubTask = async (docId, taskIndex) => {
		const docRef = await updateDoc(doc(db, "users", user.uid, "todos", docId), taskIndex);
		return docId;
	};


	return <UserContext.Provider value={{ createUser, user, logout, signIn, updateUser, resetPassword, notes, createNote, updateNote, deleteNote, todos, createToDo, updateToDoSubTask }}>{children}</UserContext.Provider>;
};

export const UserAuth = () => {
	return useContext(UserContext);
};
