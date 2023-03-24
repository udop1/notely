import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile, sendPasswordResetEmail } from "firebase/auth";
import { setDoc, doc, addDoc, collection, Timestamp, onSnapshot, query, updateDoc } from "firebase/firestore";
import { useLocation } from "react-router-dom";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
	const location = useLocation();
	const [user, setUser] = useState({});
	const [notes, setNotes] = useState([]);

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

	const updateNote = async (noteId, title, content) => {
		//console.log(title);
		//console.log(content);

		await updateDoc(doc(db, "users", user.uid, "notes", noteId), {
			title: title,
			content: content,
			modifiedDate: Timestamp.now(),
		});
	};

	return <UserContext.Provider value={{ createUser, user, logout, signIn, updateUser, resetPassword, notes, updateNote }}>{children}</UserContext.Provider>;
};

export const UserAuth = () => {
	return useContext(UserContext);
};
