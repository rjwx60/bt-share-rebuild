// 创建 store
import { createStore } from 'redux';
import rootReducer from '../reducer';

// 根据规则创建 store 
export default function configureStore(initialState){
	const store = createStore(rootReducer,initialState,
		// 三个参数，第三个参数是触发 redux-devtools
		window.devToolsExtension ? window.devToolsExtension() : undefined
	)
	return store
}