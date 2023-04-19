import { useEffect, useState } from 'react';
import { getProducts, prodSelector } from '../features/ProdSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../app/store';
import { Link, useParams } from 'react-router-dom';

export default function ShowProd() {
	const dispatch = useDispatch<AppDispatch>();
	const [product, setProduct] = useState('');
	const [price, setPrice] = useState('');
	const [quantity, setQuantity] = useState(1);
	const { id } = useParams();
	const setID = Number(id);
	const dataProd = useSelector((state) =>
		prodSelector.selectById(state, setID)
	);

	useEffect(() => {
		dispatch(getProducts());
	}, [dispatch]);

	useEffect(() => {
		if (dataProd) {
			setProduct(dataProd.product);
			setPrice(dataProd.price);
			setQuantity(dataProd.quantity);
		}
	}, [dataProd]);

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
								<span className="is-size-4 tag is-info">{product}</span>
								<span className="is-size-4"> - </span>
								<span className="is-size-4 tag is-info">{price}</span>
								<span className="is-size-4"> - </span>
								<span className="is-size-4 tag is-info">{quantity}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
