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
	return function(dispatch) {
		return axios.get('http://localhost:3001/countries?name=' + country)
		.then((res) => {
			dispatch({ type: SEARCH_COUNTRIES, payload: res.data });
		})
		.catch((err) => console.error(err));
	}
}

export function getDetails(id) {
	return function(dispatch) {
		return axios.get('http://localhost:3001/countries/' + id)
		.then((res) => {
			dispatch({ type: GET_DETAILS, payload: res.data });
		})
		.catch((err) => console.error(err));
	}
}

export function postActivity(obj) {
	return function (dispatch) {
		return axios.post('http://localhost:3001/activity', obj)
		.then((res) => {
			dispatch({ type: POST_ACTIVITY, payload: res.data })
		})
		.catch((err) => console.error(err));
	}
}

export function getAllActivities() {
	return function(dispatch) {
		return axios.get('http://localhost:3001/activity')
		.then((res) => {
			dispatch({ type: GET_ALL_ACTIVITIES, payload: res.data })
		})
		.catch((err) => console.error(err));
	}
}

export function getAllRegions() {
	return function(dispatch) {
		return axios.get('http://localhost:3001/regions')
		.then((res) => {
			dispatch({ type: GET_ALL_REGIONS, payload: res.data })
		})
		.catch((err) => console.error(err));
	}
}

export function applyFilters(payload) {
	return function(dispatch) {
		return axios.get('http://localhost:3001/regions')
		.then((res) => {
			dispatch({ type: APPLY_FILTERS, payload })
		})
		.catch((err) => console.error(err));
	}
}
