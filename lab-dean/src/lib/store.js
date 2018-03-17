import {createStore,applyMiddleware} from 'redux';
import reducer from '../reducers';
import {composeWithDevTools} from 'redux-devtools-extension';
import reduxReporter from '../middleware/redux-reporter';
import crashReporter from '../middleware/crash-reporter';
import reduxSession from '../middleware/redux-session-middleware';

export default () => createStore(reducer,composeWithDevTools(
  applyMiddleware(reduxReporter,crashReporter,reduxSession)
));