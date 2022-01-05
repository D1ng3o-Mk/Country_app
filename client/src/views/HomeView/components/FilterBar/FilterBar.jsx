import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllActivities, getAllRegions } from '../../../../stateManagement/actions';
import { useLocation, useHistory } from 'react-router-dom';

import s from './FilterBar.module.css';

export default function FilterBar() {

	const dispatch = useDispatch();
	const history = useHistory();
	const location = useLocation();
	const query = new URLSearchParams(location.search);

	useEffect(() => {
		dispatch(getAllActivities());
		dispatch(getAllRegions());
	}, [dispatch])
	
	const activities = useSelector(state => state.allActivities);
	const regions = useSelector(state => state.allRegions);
	const [filters, setFilters] = useState({
		region: '',
		activity: '',
		order: ''
	});

	function handleChange(ev) {
		setFilters({
			...filters,
			[ev.target.name]: ev.target.value
		})
	}
	function handleSubmit(ev) {
		ev.preventDefault();
		query.set('region', filters.region);
		query.set('activity', filters.activity);
		query.set('order', filters.order);
		query.set('search', '');
		query.set('page', 1)
		history.push({ search: query.toString() });
	}

	return (
		<form onSubmit={(ev) => handleSubmit(ev)} className={s.container}>
			<div>
				<label>Filter by region: </label>
				<select className={s.selectcss} name='region' onChange={(ev) => handleChange(ev)}>
					<option value=''>All</option>
					{
						regions?.map((r) => 
							<option key={r.name} value={r.name}>{r.name}</option>
						)
					}
				</select>
			</div>

			<div>
				<label>Filter by activity: </label>
				<select className={s.selectcss} name='activity' onChange={(ev) => handleChange(ev)}>
					<option value=''>All</option>
					{
						activities?.map((a) =>
							<option key={a.name} value={a.name}>{a.name}</option>
						)
					}
				</select>
			</div>

			<div>
				<label>Order by: </label>
				<select className={s.selectcss} name='order' onChange={(ev) => handleChange(ev)}>
					<option value=''>Default</option>
					<option value='alph_asc'>Alph Asc.</option>
					<option value='alph_desc'>Alph Desc.</option>
					<option value='population_asc'>Population Asc.</option>
					<option value='population_desc'>Population Desc.</option>
				</select>
			</div>

			<button className={s.btn} type='submit'>Filter</button>
		</form>
	)
}