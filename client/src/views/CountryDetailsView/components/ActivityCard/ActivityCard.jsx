import s from './ActivityCard.module.css'

export default function ActivityCard({name, difficult, duration, season}) {
	return (
		<div className={s.container}>
			<h4 className={`${s.data} ${s.title}`}>{name}</h4>
			<label className={s.data}>Difficult: {difficult}/5</label>
			<label className={s.data}>Duration: {duration} min.</label>
			<label className={s.data}>Season: {season}</label>
		</div>
	)
}