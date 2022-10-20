import {useEffect, useState} from 'react';
import axios from 'axios';

import './App.css';

const App = () => {

// const [searchResults, setResults] =  useState([])
const [pagesTotal, setPagesTotal] = useState(0)
const [pageList, setPageList] = useState([])
const [currentPage, setPage] = useState(0)
const [display, setDisplay] = useState([])


useEffect(() => {},[pageList])

const setPagesFooter = (totalPages) => {
  let arr = []
    
    for (let i = 1; i <= totalPages; i++) {
      arr.push(<button>{i}</button>)
    }

  setPageList(arr)
}

const fetchData = () => {

  const ARTIST = 'Van Gogh'
  
    axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${ARTIST}`)
    .then((response) => {
  
    const RESULTS_TOTAL = response.data.total; 
    const ADDITIONAL_PAGES = (RESULTS_TOTAL % 40);
    const TOTAL_PAGES = ((RESULTS_TOTAL - ADDITIONAL_PAGES) / 40) + (ADDITIONAL_PAGES > 0 ? 1 : 0);

    setPagesTotal(TOTAL_PAGES)
    setPagesFooter(TOTAL_PAGES)

    let displayArray = []

    for (let i = 0; i < 10; i++) {
      axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${i}`).then(response => {
       displayArray.push(response.data["accessionNumber"])
      })
    }

    console.log(displayArray)

    for (const obj in displayArray) {
      console.log(displayArray[obj])
    }
   console.log(displayArray)

    setDisplay(displayArray)

    }).catch((error) => {
        console.log(error)
    })
}

useEffect(() => {
  fetchData();
},[])

  return (
    <div className="App">
      <header className="App-header">
        {display}
        <footer>
          {pageList}
      </footer>
      </header>
    </div>
  );
}

export default App;
