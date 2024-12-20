import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout'; // Import the Layout component
import Dashboard from './components/Dashboard';
import EquipmentList from './components/EquipmentList';
import AddEquipment from './components/AddEquipment';
import EquipmentDetails from './components/EquipmentDetails';
import FarmerPage from './components/FarmerPage';
import FarmerDetails from './components/FarmerDetails'; // New: FarmerDetails component
import OwnerPage from './components/OwnerPage';
import WorkerPage from './components/WorkerPage';
import 'leaflet/dist/leaflet.css';
import FarmerList from './components/FarmerList';
import AddFarmer from './components/AddFarmer';
import OwnerList from './components/OwnerList';
import AddOwner  from './components/AddOwner';
import WorkerList from './components/WorkerList';
import AddWorker from './components/AddWorker';




function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/equipment" element={<EquipmentList />} />
          <Route path="/equipment/:id" element={<EquipmentDetails />} />
          <Route path="/addEquipment" element={<AddEquipment />} />
          <Route path="/farmer" element={<FarmerList />} /> {/* Farmer List Page */}
          <Route path="/farmer/:id" element={<FarmerDetails />} /> {/* Farmer Details Page */}
          <Route path="/owner" element={<OwnerList />} /> {/* Define the /owner route */}
        
          <Route path="/addFarmer" element={<AddFarmer />} /> {/* Add the route for AddFarmer */}
          <Route path="/owners" element={<OwnerList />} />
          <Route path="/addOwner" element={<AddOwner />} />
          <Route path="/worker" element={<WorkerList />} /> {/* Define the /worker route */}
          <Route path="/addWorker" element={<AddWorker />} /> {/* Add route for adding worker */}
          <Route path="/worker/:id" element={<WorkerPage />} />
          
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
