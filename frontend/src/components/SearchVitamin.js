import React, { useState } from "react";
import axios from "axios";
import { URL_DEV } from "../config";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { v4 as uuidv4 } from "uuid";
import { vitaminListActions } from "../vitaminList-reducer";
import { useDispatch } from "react-redux";

//VitaminSearch컴포넌트에서 검색한 결과를 나타낼 컴포넌트
const VitaminList = ({ vitaminArray }) => {
  const dispatch = useDispatch();
  //비타민 검색창에서 추가 버튼 눌렀을 때
  const handleAddButton = async (title, href) => {
    //vitaminList상태 변경
    const uuid = uuidv4();
    const vitaminListElem = {
      uuid,
      title,
    };
    dispatch(vitaminListActions.addVitaminElem(vitaminListElem));
    //영양 성분 가져오기.
    const data = {
      href,
    };
    try {
      const URL = `${URL_DEV}/vitamin/supplement-facts`;
      const response = await axios.post(URL, data);
      const facts = response.data;
      console.log(facts);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Row xs={1} md={2} className="g-4">
      {vitaminArray.map((object, idx) => (
        <Col key={idx}>
          <Card>
            <Card.Img variant="top" src={object.img} />
            <Card.Body>
              <button onClick={() => handleAddButton(object.title, object.href)}>추가하기</button>
              <Card.Title>{object.title}</Card.Title>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

//비타민 검색 컴포넌트
export default function SearchVitamin() {
  const [inputValue, setInputValue] = useState("");
  const [vitaminArray, setVitamins] = useState([]);
  const handleSearchButton = async () => {
    try {
      const URL = `${URL_DEV}/vitamin/image?search=${inputValue}`;
      const response = await axios.get(URL);
      setVitamins(response.data);
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
      <button onClick={handleSearchButton}>검색하기</button>
      <VitaminList vitaminArray={vitaminArray}></VitaminList>
    </div>
  );
}
