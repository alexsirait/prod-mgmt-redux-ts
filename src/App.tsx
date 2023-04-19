import './App.css';
import 'bulma/css/bulma.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import ProdMan from './components/ProdMan';
import AddProd from './components/AddProd';
import EditProd from './components/EditProd';
import ShowProd from './components/ShowProd';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/prod-man" element={<ProdMan />} />
				<Route path="/add-prod" element={<AddProd />} />
				<Route path="/edit-prod/:id" element={<EditProd />} />
				<Route path="/show-prod/:id" element={<ShowProd />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
