import React, { useState } from "react";
import axios from "axios";
import { URL_DEV } from "../config";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const VitaminList = ({vitaminArray})=>{
  return (
    <Row xs={1} md={2} className="g-4">
      {vitaminArray.map((object, idx) => (
        <Col key={idx}>
          <Card>
            <Card.Img variant="top" src={object.img} />
            <Card.Body>
              <Card.Title>{object.title}</Card.Title>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

//비타민 검색 컴포넌트
const SearchVitamin = () => {
  const [inputValue, setInputValue] = useState("");
  const [vitaminArray, setVitamins] = useState([]);
  const handleButtonClick = async () => {
    try {
      const URL = `${URL_DEV}/vitamin/image?search=${inputValue}`;
      const response = await axios.get(URL);
      setVitamins(response.data)
    } catch (error) {
      console.error(error);
    }
  };
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  return (
    <div>
      <input type="text" value={inputValue} onChange={handleInputChange} />
      <button onClick={handleButtonClick}>요청하기</button>
      <VitaminList vitaminArray={vitaminArray}></VitaminList>
    </div>

  );
};
export default SearchVitamin;
