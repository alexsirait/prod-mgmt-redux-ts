import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { storeProduct } from '../features/ProdSlice';

export default function AddProd() {
	const [product, setProduct] = useState('');
	const [price, setPrice] = useState('');
	const [quantity, setQuantity] = useState(1);
	const dispatch = useDispatch<AppDispatch>();
	const nav = useNavigate();
	const onSubmit = async (e: any) => {
		e.preventDefault();
		await dispatch(storeProduct({ product, price, quantity }));
		return nav('/prod-man');
	};
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
