import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/pages/Home";
import Users from "./components/pages/Users";
import "./styles/App.module.css";

export default function App() {
  return (
    <div className="App">
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/users" component={Users} />
          </Switch>
        </Layout>
      </Router>
    </div>
  );
}
