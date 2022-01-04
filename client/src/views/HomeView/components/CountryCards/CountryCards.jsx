import Card from '../CountryCard/CountryCard';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { getAllCountries, applyFilters } from '../../../../stateManagement/actions';
import s from './CountryCards.module.css'

export default function Cards() {
	const [page, setPage] = useState([]);	
	const dispatch = useDispatch();		
	const location = useLocation();
	const query = useMemo(() => new URLSearchParams(location.search), [location.search]);
	useEffect(() => {
		async function fetchCountries() {
			await dispatch(getAllCountries());
		}
		fetchCountries();
	}, [dispatch]);
	useEffect(() => {
		let queryRegion = query.get('region') || '';
		let queryActivity = query.get('activity') || '';
		let queryOrder = query.get('order') || '';
		let querySearch = query.get('search');
		if (!querySearch) {
			dispatch(applyFilters({
			region: queryRegion,
			activity: queryActivity,
			order: queryOrder,
		}))
		}
	}, [dispatch, query]);
	const countries = useSelector(state => state.countriesLoaded);
	useEffect(() => {
		let queryPage = query.get('page');
		let pageNumber = queryPage && !isNaN(queryPage) && queryPage > 0 ? parseInt(queryPage) : 1;
		let maxPage = Math.ceil(countries.length / 10);
		if (pageNumber > maxPage) pageNumber = maxPage;
		if (pageNumber === 1) {
			setPage(countries.slice(0, 9))
		} else {
			setPage(countries.slice((pageNumber * 10 - 10) - 1, (pageNumber * 10) - 1));			
		}

	}, [query, countries])
		return(
		<div className={s.container}>	
			{ page?.length === 0 && <h2 className={s.nofound}> Countries not found :/ </h2> }
	
			{ page?.map (c => 
				<Card 
					key={c.id} 
					id={c.id}
					flag={c.flag} 		
					name={c.name} 
					region={c.subregion.region.name}
					population={c.population}
				/>)}
			

		</div>
	)				
}

