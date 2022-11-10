import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./home";
import Level from './level';
import Leaderboard from "./leaderboard";
import Nav from "./nav";
import '../main-style-sheets/app.css';

const App = () => {

    
    return (
        <BrowserRouter>
            <div className="app">
                <Nav />
                <Routes>
                    <Route path='/' element={<Home />}/>
                    <Route path="/:id" element={<Level />}/>
                    <Route path='/leaderboard' element={<Leaderboard />}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default App;