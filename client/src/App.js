import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MapScreen from './screens/Map';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/map" component={MapScreen} />
          {/* Outras rotas da sua aplicação */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
