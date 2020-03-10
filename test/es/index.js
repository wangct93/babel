
import {getDispatch} from "./modules/store";

export history from './modules/history';
export request from './modules/request';
export {connect} from 'react-redux';

export const dispatch = getDispatch();
