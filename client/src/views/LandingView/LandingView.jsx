import { Link } from 'react-router-dom';
import s from './landingPage.module.css';

export default function LandingView() {
	return (
		<div className={s.container}>
			<h1 className={s.title}>Welcome!</h1>
			<Link to='/home'>
				<button className={s.btn}>Start</button>
			</Link>
			<p className={s.description}><br/>&nbsp;&nbsp;Se trata de una SPA(single-page application) que tiene como funcionabilidad el mostrar los paises a nivel mundia, 
			filtrado por continente y poblacion, crear actividades turisticas en cada pais como en conjunto y filtrar los paises por las actividades. 
			como tambien la busqueda individual de cada pais.<br/><br/>&nbsp;&nbsp;Tecnologias Usadas: JavaScript, Styled-Components, React Js, Redux, Node Js, Express, PostgresSql, Sequelize.<br/><br/>
			</p>
		</div>
	)
}