import axios from 'axios';
import { GET_ALL_COUNTRIES,SEARCH_COUNTRIES,GET_DETAILS,POST_ACTIVITY,GET_ALL_ACTIVITIES,GET_ALL_REGIONS,APPLY_FILTERS
} from '../../consts/actions';

export function getAllCountries() {
	return function(dispatch) {
		return axios.get('http://localhost:3001/countries')
		.then((res) => {
			dispatch({ type: GET_ALL_COUNTRIES, payload: res.data });
		})
		.catch((err) => console.error(err));
	}
}

export function searchCountries(country) {
	return async function(dispatch) {
		try {
			const res = await axios.get('http://localhost:3001/countries?name=' + country);
			dispatch({ type: SEARCH_COUNTRIES, payload: res.data });
		} catch (err) {
			return console.error(err);
		}
	}
}

export function getDetails(id) {
	return async function(dispatch) {
		try {
			const res = await axios.get('http://localhost:3001/countries/' + id);
			dispatch({ type: GET_DETAILS, payload: res.data });
		} catch (err) {
			return console.error(err);
		}
	}
}

export function postActivity(obj) {
	return async function (dispatch) {
		
		try {
			const res = await axios.post('http://localhost:3001/activity', obj);
			console.log(res.data)
			dispatch({ type: POST_ACTIVITY, payload: res.data });


		} catch (err) {
			return console.error(err);
		}
	}
}

export function getAllActivities() {
	return async function(dispatch) {
		try {
			const res = await axios.get('http://localhost:3001/activity');
			dispatch({ type: GET_ALL_ACTIVITIES, payload: res.data });
		} catch (err) {
			return console.error(err);
		}
	}
}

export function getAllRegions() {
	return async function(dispatch) {
		try {
			const res = await axios.get('http://localhost:3001/regions');
			dispatch({ type: GET_ALL_REGIONS, payload: res.data });
		} catch (err) {
			return console.error(err);
		}
	}
}

export function applyFilters(payload) {
	return async function(dispatch) {
		try {
			const res = await axios.get('http://localhost:3001/regions');
			dispatch({ type: APPLY_FILTERS, payload });
		} catch (err) {
			return console.error(err);
		}
	}
}
