import s from './DetailsCard.module.css';

export default function DetailsCard({id, name, flag, capital, region, subregion, population, area}) {
	return (
		<div className={s.container}>
			<img className={s.img}src={flag} alt={name} width="300" height="200" />
			<h2 className={s.title}>{name}</h2>
			<p className={s.data}>ID: {id}</p>
			<p className={s.data}>Capital: {capital}</p>
			<p className={s.data}>Region: {region}</p>
			<p className={s.data}>Subregion: {subregion}</p>
			<p className={s.data}>Population: {population} People</p>
			<p className={s.data}>Area: {area} km²</p>
		</div>
	)
}