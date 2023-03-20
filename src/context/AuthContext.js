import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile, sendPasswordResetEmail } from "firebase/auth";
import { setDoc, doc, addDoc, collection, Timestamp, onSnapshot, query } from "firebase/firestore";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
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
							date: Timestamp.now(),
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
	}, []);

	return <UserContext.Provider value={{ createUser, user, logout, signIn, updateUser, resetPassword, notes }}>{children}</UserContext.Provider>;
};

export const UserAuth = () => {
	return useContext(UserContext);
};
