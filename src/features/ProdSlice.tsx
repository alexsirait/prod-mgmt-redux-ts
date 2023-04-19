import {
	EntityId,
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
} from '@reduxjs/toolkit';
import axios from 'axios';

export const getProducts = createAsyncThunk<any>(
	'products/getProducts',
	async () => {
		const res = await axios.get('http://localhost:5000/products');
		return await res.data;
	}
);

type Product = {
	id?: string;
	product: string;
	price: string;
	quantity: number;
};

export const storeProduct = createAsyncThunk<any, Product>(
	'products/storeProduct',
	async ({ product, price, quantity }) => {
		const res = await axios.post('http://localhost:5000/products', {
			product,
			price,
			quantity,
		});
		return await res.data;
	}
);

export const updateProduct = createAsyncThunk<any, Product>(
	'products/updateProduct',
	async ({ id, product, price, quantity }) => {
		const res = await axios.put(`http://localhost:5000/products/${id}`, {
			product,
			price,
			quantity,
		});
		return await res.data;
	}
);

export const destroyProduct = createAsyncThunk<any, Product>(
	'products/destroyProduct',
	async (id) => {
		await axios.delete(`http://localhost:5000/products/${id}`);
		return await id;
	}
);

export const prodEntity = createEntityAdapter({
	selectId: (prod: any) => prod.id,
});

const prodSlice = createSlice({
	name: 'products',
	initialState: prodEntity.getInitialState,
	reducers: {
		/* ... */
	},
	extraReducers: {
		[getProducts.fulfilled.toString()]: (state: any, action: any) => {
			prodEntity.setAll(state, action.payload);
		},
		[storeProduct.fulfilled.toString()]: (state: any, action: any) => {
			prodEntity.addOne(state, action.payload);
		},
		[destroyProduct.fulfilled.toString()]: (state: any, action: any) => {
			prodEntity.removeOne(state, action.payload);
		},
		[updateProduct.fulfilled.toString()]: (state: any, action: any) => {
			prodEntity.updateOne(state, action.payload);
		},
	},
});

export const prodSelector = prodEntity.getSelectors(
	(state: any | EntityId) => state.products
);
export default prodSlice.reducer;
