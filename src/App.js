import Router from "./Router";
import axios from 'axios'
import { AuthContextProvider } from "./Context/AuthContext";
import 'bootstrap/dist/css/bootstrap.min.css';


axios.defaults.withCredentials = true;

function App() {
  return (
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>
  )
}

export default App;
