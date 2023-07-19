import React, { useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { deleteVitaminElem } from "../reducers/vitaminList-reducer";
import { totalActions } from "../reducers/total-reducer";
import { SERVER_URL } from "../config";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export default function PickedVitamin() {
  const dispatch = useDispatch();
  const vitaminList = useSelector((state) => state.vitaminList.data);
  const [inputValue, setInputValue] = useState("");
  const total = useSelector((state)=>state.total.data);
  const deleteObjects = (oldtotal, facts) => {
    for (let key in facts) {
      const deleteValue = facts[key];
      oldtotal[key] -= deleteValue;
      const newValue = oldtotal[key];
      if (newValue < deleteValue / 2 || isNaN(newValue) || newValue === null || newValue === 0) {
        delete oldtotal[key];
      }
    }
    return oldtotal;
  };
  //초기화 버튼.
  const handleReset = () => {
    localStorage.removeItem("persist:vitaminList");
    localStorage.removeItem("persist:total");
    sessionStorage.clear();
    window.location.reload();
  };
  //삭제 버튼
  const handleDelete = (uuid) => {
    const facts = JSON.parse(sessionStorage.getItem(uuid));
    const oldtotal = JSON.parse(sessionStorage.getItem("total"));
    //세션스토리지에서 해당하는 항목 삭제 & vitaminList상태 갱신
    sessionStorage.removeItem(uuid);
    dispatch(deleteVitaminElem(uuid));
    //newtotal생성  & 세션스토리지에 저장 & 상태 갱신
    const newTotal = deleteObjects(oldtotal, facts);
    sessionStorage.setItem("total", JSON.stringify(newTotal));
    dispatch(totalActions.updateTotal(newTotal));
  };
  //조합 저장 핸들러
  const handleSaveButton = async () => {
    const URL = `${SERVER_URL}/vitamin/combination`;
    const uuid = uuidv4();
    const saveTotal = total;
    const body = {
      uuid,
      title:inputValue,
      total:saveTotal,
    }
    axios.post(URL,body)
  };
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  return (
    <div>
      영양제 리스트
      <ListGroup>
        {vitaminList.map((item, index) => (
          <ListGroup.Item key={index}>
            {item.title}
            <button onClick={() => handleDelete(item.uuid)}>삭제</button>
          </ListGroup.Item>
        ))}
        <button onClick={handleReset}>초기화</button>
      </ListGroup>
      <div>
        <input type="text" value={inputValue} onChange={handleInputChange} />
        <button onClick={handleSaveButton}>조합저장하기</button>
      </div>
    </div>
  );
}
