import { GET_ALL_COUNTRIES , 
	SEARCH_COUNTRIES, 
	GET_DETAILS, 
	GET_ALL_ACTIVITIES, 
	GET_ALL_REGIONS,
	POST_ACTIVITY, 
	APPLY_FILTERS} from '../../consts/actions';

const initialState = {
	countriesLoaded: [],
	countryDetails: {},
	allCountries: [],
	allActivities: [],
	allRegions: [],
};

function reducer(state = initialState, action) {
	switch (action.type) {
		case GET_ALL_COUNTRIES:

			return ({
				...state,
				allCountries: action.payload,
				countriesLoaded: action.payload
			});
		case SEARCH_COUNTRIES:

			return ({
				...state,
				countriesLoaded: action.payload
			});
		case GET_DETAILS:

			return ({
				...state,
				countryDetails: action.payload
			});
		case GET_ALL_ACTIVITIES:

			return ({
				...state,
				allActivities: action.payload
			});
		case GET_ALL_REGIONS:
	
			return ({
				...state,
				allRegions: action.payload
			});

		case APPLY_FILTERS:	

			const f = action.payload;
			const regionFilter = f.region !== '' ? state.allCountries.filter(e => e.subregion.region.name === f.region ) : [...state.allCountries];
			const activityFilter = f.activity !== '' ? state.allCountries.filter(e => e.activities.some(a => a.name === f.activity)) : [...state.allCountries];
			const matches = [];
			
			for (let i = 0; i < regionFilter.length; i++) {
				for (let j = 0; j < activityFilter.length; j++) {
					if (regionFilter[i].id === activityFilter[j].id) {
						matches.push(regionFilter[i]);
					}
				}
			}
			
			if (f.order === 'alph_asc') {
				matches.sort((a,b) => a.name.localeCompare(b.name));
			} 
			else if (f.order === 'alph_desc') {
				matches.sort((a,b) => b.name.localeCompare(a.name));
			} 
			else if (f.order === 'population_asc') {
				matches.sort((a,b) => a.population - b.population);
			} 
			else if (f.order === 'population_desc') {
				matches.sort((a,b) => b.population - a.population);
			}

			return ({
				...state,
				countriesLoaded: matches
			})
			case POST_ACTIVITY:
				return ({
					...state,
					allActivities: [...state.allActivities,action.payload]
				})		
		default:

			return ({...state});
	}
}

export default reducer;
