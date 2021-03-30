import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Navbar, Spinner } from 'react-bootstrap';


function App() {
  let [moviedata, adddata] = useState(null);
  let [date, setdate] = useState("20210302");
  let [inputdate, changedate] = useState(" ");


  useEffect(() => {
    axios.get("http://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=f5eef3421c602c6cb7ea224104795888&targetDt=" + (date))
      .then(result => adddata(result.data.boxOfficeResult.dailyBoxOfficeList))
      .catch(e => console.log(e));
  }, [date]); // date가 변함에 따라 useEffect 한번더 렌더링


  if (!moviedata) { //moviedata가 null이라면 LOADING을 반환해라 CLEAR
    return <div>
      <Spinner className="load" md="auto" animation="border" role="status" />
      <h3 className="loading">Loading...</h3>
    </div >
  }




  return (
    <div className="App">

      {
        console.log(moviedata)
      }
      <Navbar bg="dark" expand="lg">
        <Navbar.Brand className="text-light">Movie Charts</Navbar.Brand>
      </Navbar>
      <>
        <div className="table">
          <input onChange={(e) => {
            changedate(e.target.value)
          }} placeholder="원하는 날짜 입력 ex> 20200329  * (20040101 ~ 현재) *" />
          <button onClick={() => {
            setdate(inputdate);
          }}>검색하기</button>
          {
            moviedata.map((movie, i) => {
              return (
                <>
                  <p>{movie.rank} 위</p>
                  <hr />
                  <h6>{movie.movieNm} ({movie.openDt} 개봉)</h6>
                  <hr />

                </>
              )
            })
          }
        </div>
      </>

    </div >
  );
}

export default App;
