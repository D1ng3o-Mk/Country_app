import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllCountries, postActivity, getAllActivities} from '../../stateManagement/actions';
import {useHistory} from 'react-router-dom';
import s from './AddPage.module.css';



export default function AddActivityView() {

	const dispatch = useDispatch();
	const history = useHistory();
	const allCountries = useSelector(state => state.allCountries);

	useEffect(() => {
		dispatch(getAllCountries());
		dispatch(getAllActivities());
	}, [dispatch]);

	const [activity, setActivity] = useState({

		name: '',
		difficult: '',
		duration: '',
		season: 'All',
		countries: ''
	
	});
	const [error, setError] = useState('Fill in the fields');

	function handleChangeNew(ev) {

		setActivity({
			...activity,
			[ev.target.name]: ev.target.value
		})
		setError(validation({
			...activity,
			[ev.target.name]: ev.target.value
		}));
	}

	function handleSelect(ev) {
		setActivity({
			...activity,
			countries: Array.from(ev.target.selectedOptions, option => option.value).join(',')
		})
	}

	function handleSubmit(ev) {
		ev.preventDefault();
		dispatch(postActivity(activity));
		setActivity({
			name: '',
			difficult: '',
			duration: '',
			season: 'All',
			countries: ''

		})
		alert("successfully created activity")
		
	}

	function validation(input) 

	{
		if (!input.name) return 'Name is required.';
		if (input.name.length > 20) return 'Name length limit exceeded';
		if(!isNaN(input.name)) return"Name must be a letter"

		if (!input.difficult) return 'Difficult is required.';
		if (isNaN(input.difficult)) return 'Difficult must be a number.';
		if (input.difficult < 0 || input.difficult > 5) return 'Difficult range is from 0 to 5.';

		if (!input.duration) return 'Duration is required.';
		if (isNaN(input.duration)) return 'Duration must be a number.';
		if (input.duration < 0) return 'Duration must be greater than 0.';

		return '';
	}
	
	return (

		<div className={s.container}>
			<form className={s.activityForm} onSubmit={(ev) => handleSubmit(ev)}>
				<h2 className={s.addMargin}>Activity Form</h2>
					<div>
						<div>
							<label> Create new activity: </label>
						</div>
					</div>
					<div>
						{['name','difficult','duration'].map((el) => 
							<div key={el}>
								<input 
									className={s.input}
									type='text' 
									autoComplete='off' 
									placeholder={el[0].toUpperCase() + el.slice(1)}
									name={el} 
									value={activity[el]} 
									onChange={(ev) => handleChangeNew(ev)}
								/>
								{el === 'difficult' && <label> 0-5</label>}
								{el === 'duration' && <label> in minutes</label>}
							</div>
						)}
						<div>
							<label>Season: </label>
							<select className={s.selectcss} name='season' onChange={(ev) => handleChangeNew(ev)}>
								{['All','Summer','Winter','Spring','Autnum'].map((el) =>
									<option key={el} value={el}>{el}</option>
								)}
							</select>
						</div>
					</div>
				<div >
					<label>Countries related to this activity:</label> <br />
					<select className={s.selectcssc} onChange={(ev) => handleSelect(ev)} multiple>
						<option value=""></option>
						
						{
							allCountries?.map((el) => 
								<option 
									key={el.id} 
									value={el.id}
								>{el.name}</option>
							)
						}

					</select> <br />
					<label className={s.smallLetter}>Hold down the Ctrl button to select multiple options.</label>
				</div>
				<br/>
				{ 
					error ? <p className={s.errMsg}>{error}</p> : <button className={s.btn} type='submit'>Add</button>
				}
			</form>
			<br />
			<button className={s.btn} onClick={() => history.goBack()}>Go Back</button>
		</div>
	)
}