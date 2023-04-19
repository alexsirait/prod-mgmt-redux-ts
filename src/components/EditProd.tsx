import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../app/store';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
	getProducts,
	prodSelector,
	updateProduct,
} from '../features/ProdSlice';

export default function AddProd() {
	const [product, setProduct] = useState('');
	const [price, setPrice] = useState('');
	const [quantity, setQuantity] = useState(1);
	const dispatch = useDispatch<AppDispatch>();
	const nav = useNavigate();
	const { id } = useParams();
	const setID = Number(id);
	const dataOneProd = useSelector((state) =>
		prodSelector.selectById(state, setID)
	);
	const onSubmit = async (e: any) => {
		e.preventDefault();
		await dispatch(updateProduct({ id, product, price, quantity }));
		return nav('/prod-man');
	};
	useEffect(() => {
		dispatch(getProducts());
	}, [dispatch]);
	useEffect(() => {
		if (dataOneProd) {
			setProduct(dataOneProd.product);
			setPrice(dataOneProd.price);
			setQuantity(dataOneProd.quantity);
		}
	}, [dataOneProd]);
	return (
		<section className="section">
			<div className="container">
				<div className="columns is-centered">
					<div className="column is-half">
						<div className="box">
							<Link to="/prod-man" className="button is-primary is-small mb-3">
								Prod Man
							</Link>
							<div>
								<form onSubmit={onSubmit}>
									<div className="field">
										<label className="label">Product</label>
										<div className="control">
											<input
												className="input"
												type="text"
												placeholder="Enter product .."
												value={product}
												onChange={(e) => setProduct(e.target.value)}
											/>
										</div>
									</div>
									<div className="field">
										<label className="label">Price</label>
										<div className="control">
											<input
												className="input"
												type="text"
												placeholder="Enter Price .."
												value={price}
												onChange={(e) => setPrice(e.target.value)}
											/>
										</div>
									</div>
									<div className="field">
										<label className="label">Quantity</label>
										<div className="control">
											<input
												className="input"
												type="number"
												placeholder="Enter Quantity .."
												value={quantity}
												onChange={(e) => setQuantity(Number(e.target.value))}
											/>
										</div>
									</div>
									<div className="field">
										<button className="button is-success">Submit</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
