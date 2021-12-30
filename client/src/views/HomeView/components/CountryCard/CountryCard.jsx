import { Link } from 'react-router-dom';
import s from './CountryCard.module.css'

export default function Card({id, flag, name, region, population}) {
	return (
		<div className={s.container}>

			<div className={s.contimg}>
				<img src={flag} className={s.img} alt={name}/>
			</div>

			<div className={s.data}>
				<p className={s.title}>{name}</p>
				<p>Region: {region}</p>
				<p>Population: {population} People</p>

			</div>
			<Link to={`/details/${id}`}>
					<button className={s.btn}>View Details</button>
			</Link>	
				
		</div>
	)
}