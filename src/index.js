import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import promise from 'redux-promise';
import reducers from './reducers';

// engineered components
import PostsIndex from './components/posts/posts_index';
import NewPost from './components/posts/post_new';
import PostShow from './components/posts/post_show';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
    <div>
      <Switch>
      <Route path="/posts/new" component={NewPost} />
      <Route path="/posts/:id" component={PostShow}/>
      <Route path="/" component={PostsIndex} />
     </Switch>
    </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
