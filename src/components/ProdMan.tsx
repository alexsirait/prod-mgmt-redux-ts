import { useEffect } from 'react';
import {
	destroyProduct,
	getProducts,
	prodSelector,
} from '../features/ProdSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../app/store';
import { Link } from 'react-router-dom';

export default function ProdMan() {
	const dispatch = useDispatch<AppDispatch>();
	const dataProd = useSelector((state: any) => prodSelector.selectAll(state));
	useEffect(() => {
		dispatch(getProducts());
	}, [dispatch]);
	return (
		<section className="section">
			<div className="container">
				<div className="columns is-centered">
					<div className="column is-half">
						<div className="box">
							<Link to="/add-prod" className="button is-primary is-small mb-3">
								Add Prod
							</Link>
							<table className="table is-fullwidth is-striped">
								<thead>
									<tr>
										<th>#</th>
										<th>Product</th>
										<th>Price</th>
										<th>Quantity</th>
										<th>Action</th>
									</tr>
								</thead>
								<tbody>
									{dataProd.map((prod, index) => (
										<tr key={index}>
											<td>{++index}</td>
											<td>{prod.product}</td>
											<td>{prod.price}</td>
											<td>{prod.quantity}</td>
											<td>
												<Link
													to={`/show-prod/${prod.id}`}
													className="button is-info is-small"
												>
													Show
												</Link>
												<Link
													to={`/edit-prod/${prod.id}`}
													className="button is-warning is-small"
												>
													Edit
												</Link>
												<button
													onClick={async (e) =>
														await dispatch(destroyProduct(prod.id))
													}
													className="button is-danger is-small"
												>
													Delete
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
