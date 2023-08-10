import React, { useState } from "react";
import axios from "axios";
import { SERVER_URL } from "../config/config";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { totalActions } from "../reducers/total-reducer";
import { addVitaminElem } from "../reducers/vitaminList-reducer";
//VitaminSearch컴포넌트에서 검색한 결과를 나타낼 컴포넌트
const VitaminList = ({ vitaminArray }) => {
  const dispatch = useDispatch();
  //oldtotal과 facts(새로운 항목의 영양성분)을 인자로 받아서 oldtotal에 facts추가.
  const mergeObjects = (oldtotal, facts) => {
    for (let key in facts) {
      if (oldtotal.hasOwnProperty(key)) {
        oldtotal[key] += facts[key];
      } else {
        oldtotal[key] = facts[key];
      }
    }
    return oldtotal;
  };
  //비타민 검색창에서 추가 버튼 눌렀을 때
  const handleAddButton = async (title, href) => {
    //vitaminList상태 변경
    const uuid = uuidv4();
    const vitaminListElem = {
      uuid,
      title,
    };
    dispatch(addVitaminElem(vitaminListElem));
    //영양 성분 가져오기.
    const URL = `${SERVER_URL}/vitamin/supplement-facts`;
    const response = await axios.get(URL, {
      params: {
        href,
      },
    });
    console.log(response);
    const facts = response.data;
    //세션스토리지에 영양성분 저장.
    sessionStorage.setItem(uuid, JSON.stringify(facts));
    //세션스토리지에서 total가져온 후 total 갱신.
    const storedTotal = sessionStorage.getItem("total");
    let newTotal;
    if (!storedTotal) {
      newTotal = facts;
    } else {
      const oldTotal = JSON.parse(storedTotal);
      newTotal = mergeObjects(oldTotal, facts);
    }
    sessionStorage.setItem("total", JSON.stringify(newTotal));
    console.log(newTotal);
    //total 상태 업데이트
    dispatch(totalActions.updateTotal(newTotal));
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
      const URL = `${SERVER_URL}/vitamin/search?search=${inputValue}`;
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
      <div>영양제 검색</div>
      <input type="text" value={inputValue} onChange={handleInputChange} />
      <button onClick={handleSearchButton}>검색하기</button>
      <VitaminList vitaminArray={vitaminArray}></VitaminList>
    </div>
  );
}
