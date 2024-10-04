import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'swiper/css';
import { Footer, Header, ScrollToTop } from './components';
import {
	AboutPage,
	CatalogPage,
	CategoryPage,
	HomePage,
	NotFoundPage,
	ProductPage
} from './pages';

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<ScrollToTop />
				<Header />
				<main className='flex-auto' id='modal-container'>
					<Routes>
						<Route path='/' element={<HomePage />} />
						<Route path='/about' element={<AboutPage />} />
						<Route path='/catalog' element={<CatalogPage />} />
						<Route path='/catalog/:slug' element={<ProductPage />} />
						<Route path='/category/:slug' element={<CategoryPage />} />
						<Route path='*' element={<NotFoundPage />} />
					</Routes>
				</main>
				<Footer />
			</BrowserRouter>
		</QueryClientProvider>
	);
}

export default App;
