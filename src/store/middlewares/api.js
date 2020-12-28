import * as actions from "../api";
import axios from "axios";

const api = ({ dispatch }) => next => async action => {
	if (action.type !== actions.apiCallBegan.type) { 
		return next(action);
	}

	const { url, method, data, onStart, onSuccess, onFail } = action.payload;

	if (onStart) dispatch({ type: onStart });

	next(action);

	try {
		
		const response = await axios.request({
			baseURL: "http://localhost:9001/api",
			url,
			method,
			data
		});

		dispatch(actions.apiCallSucceeded(response.data));
		if (onSuccess) dispatch({type: onSuccess, payload: response.data});

	} catch (err) {
		dispatch(actions.apiCallFailed(err.message));
		if (onFail) dispatch({type: onFail, payload: err.message});
	}
	
}

export default api;