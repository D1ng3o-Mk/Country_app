import { useState, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import { searchCountries } from '../../../../stateManagement/actions';
import s from './SearchBar.module.css'

export default function SearchBar() {
	const dispatch = useDispatch();
	const [search, setSearch] = useState('');
	const location = useLocation();
	const history = useHistory();
	const query = useMemo(() => new URLSearchParams(location.search), [location.search]);
	const [previousQuery, setPreviousQuery] = useState('');
	useEffect(() => {
		let querySearch = query.get('search') || '';
		if (querySearch !== previousQuery) {
			dispatch(searchCountries(querySearch));	
			setPreviousQuery(querySearch);		
		}
	}, [dispatch, query, previousQuery])

	function handleChange(e) {
		setSearch(e.target.value);
	}
	function handleSubmit(e) {
		e.preventDefault();
		query.set('search', search);
		query.set('region', '');
		query.set('activity', '');
		query.set('order', '');
		query.set('page', 1)
		history.push({ search: query.toString() });
		setSearch('');
	}
	return (
		<form className={s.container} onSubmit={(e) => handleSubmit(e)}>
			<input 
				className={s.searchInput}
				type='text' 
				autoComplete='off' 
				value={search} 
				onChange={(e) => handleChange(e)}
			/>
			<button className={s.btn} type='submit'>Search</button>
		</form>
	)
}