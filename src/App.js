import React from "react";
import { Route, Routes } from "react-router-dom";
import { Dashboard, Flashcard, Flashcards, ForgotPassword, Homepage, Note, Notes, Pomodoro, ProtectedRoute, Settings, Signin, Signup, Todos, Whiteboard, Whiteboards } from "./components/Components";
import { AuthContextProvider } from "./context/AuthContext";

function App() {
	return (
		<div>
			<AuthContextProvider>
				{/* prettier-ignore */}
				<Routes>
					<Route path='/' element={ <Homepage /> } />
					<Route path="/login" element={ <Signin /> } />
					<Route path="/forgot-password" element={ <ForgotPassword /> } />
					<Route path="/signup" element={ <Signup /> } />
					<Route path="/dashboard" element={ <ProtectedRoute><Dashboard /></ProtectedRoute> } />
					<Route path="/settings" element={ <ProtectedRoute><Settings /></ProtectedRoute> } />
					<Route path="/todos" element={ <ProtectedRoute><Todos /></ProtectedRoute> } />
					<Route path="/notes" element={ <ProtectedRoute><Notes /></ProtectedRoute> } />
					<Route path="/notes/:noteId" element={<ProtectedRoute><Note /></ProtectedRoute>} />
					<Route path="/whiteboards" element={ <ProtectedRoute><Whiteboards /></ProtectedRoute> } />
					<Route path="/whiteboards/:boardId" element={<ProtectedRoute><Whiteboard /></ProtectedRoute>} />
					<Route path="/flashcards" element={ <ProtectedRoute><Flashcards /></ProtectedRoute> } />
					<Route path="/flashcards/:cardId" element={<ProtectedRoute><Flashcard /></ProtectedRoute>} />
					<Route path="/pomodoro" element={ <ProtectedRoute><Pomodoro /></ProtectedRoute> } />
				</Routes>
			</AuthContextProvider>
		</div>
	);
}

export default App;
