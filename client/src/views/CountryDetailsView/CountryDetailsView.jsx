import { useParams, useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import DetailsCard from './components/DetailsCard/DetailsCard';
import ActivityCards from './components/ActivityCards/ActivityCards';

import { getDetails } from '../../stateManagement/actions';
import s from './DetailsPage.module.css';

export default function CountryDetailsView() {
	const history = useHistory();
	const { id } = useParams();
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getDetails(id))
	}, [dispatch, id])
	let c = useSelector(state => state.countryDetails);
	return (
		<div className={s.container}>
			<h1 className={s.title}>Country Details</h1>
			<DetailsCard 
				id={c.id} 
				name={c.name} 
				flag={c.flag} 
				capital={c.capital} 
				region={c?.subregion?.region?.name} 
				subregion={c?.subregion?.name}
				population={c.population} 
				area={c.area} 
			/>
			<h1 className={s.title}>{c?.activities?.length === 0 ? "No related activities" : "Related activities"}</h1>
			<ActivityCards activities={c.activities}/>
			<button className={s.goBack} onClick={() => history.goBack()}>Go Back</button>				
		</div>
	)
}