
import { useEffect, useState } from 'react';
import './App.css';
import Pill from './components/Pill';

function App() {
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggs, setSelectedSuggs] = useState([]);

  const handleSelect = (user) => {
    if(selectedSuggs.includes(user)){
      return;
    }
    setSelectedSuggs([...selectedSuggs, user]);
  }

  const handleDeleteUser = (index) => {
    const updatedUsers = selectedSuggs.filter((ele, i) => i !== index);
    setSelectedSuggs(updatedUsers);
  }

  useEffect(() => {

    const fetchData = () => {
      if(searchText.trim === ""){
        setSuggestions([]);
        return;
      }
      // 'https://dummyjson.com/users/search?q=John'
      fetch('https://dummyjson.com/users/search?q=' + searchText)
      .then(res => res.json())
      .then(data => setSuggestions(data.users));
      
    }

    fetchData();
  }, [searchText]);

  console.log(suggestions)


  return (
    <div className="App">
      {selectedSuggs?.map((user, index) => { return ( <Pill key = {user.email} text = {user.firstName} onClick={() => handleDeleteUser(index)} /> )})}
      <input className='input_search' type='text' placeholder='search something' value={searchText} onInput={(e) => setSearchText(e.target.value)} />
      <div className='search_suggestions'>
        <ul className='suggestion_list'>
          {suggestions && suggestions?.map((user, index) => { return (<li key={user.email} className='user' onClick={() => handleSelect(user)} >{user.firstName}</li>)})}
        </ul>
      </div>
    </div>
  );
}

export default App;
