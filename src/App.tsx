import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboards from "./pages/Dashboards";
import AllPrompts from "./pages/AllPrompts";
import Favorites from "./pages/Favorites";
import PageNotFound from "./pages/PageNotFound";
import Pinned from "./pages/Pinned";
import AddPrompt from "./pages/AddPrompt";

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboards />} />
        <Route path="/prompts" element={<AllPrompts />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/pinned" element={<Pinned/>}/>
        <Route path="*" element={<PageNotFound />} />
        <Route path="/add-prompt" element={<AddPrompt />} />
        
      </Route>
    </Routes>
  );
};

export default App;