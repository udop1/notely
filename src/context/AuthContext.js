import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
	const [user, setUser] = useState({});

	const createUser = async (email, password, username) => {
		return await createUserWithEmailAndPassword(auth, email, password).then(async () => {
			await updateUser(username);
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

	return <UserContext.Provider value={{ createUser, user, logout, signIn, updateUser, resetPassword }}>{children}</UserContext.Provider>;
};

export const UserAuth = () => {
	return useContext(UserContext);
};
