import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { useSelector } from "react-redux";
import { persistor } from "../store";
import {useDispatch}from 'react-redux';
import { deleteVitaminElem } from "../reducers/vitaminList-reducer";
export default function PickedVitamin() {
  const dispatch = useDispatch();
  const vitaminList = useSelector((state) => state.vitaminList.data);
  //초기화 버튼.
  const handleReset = () => {
    persistor.purge();
    sessionStorage.clear();
    window.location.reload();
  };
  //삭제 버튼
  const handleDelete = (uuid) => {
    sessionStorage.removeItem(uuid);
    dispatch(deleteVitaminElem(uuid));
  };
  return (
    <div>
      영양제 리스트
      <ListGroup>
        {vitaminList.map((item, index) => (
          <ListGroup.Item key={index}>
            {item.title}
            <button onClick={()=>handleDelete(item.uuid)}>삭제</button>
          </ListGroup.Item>
        ))}
        <button onClick={handleReset}>초기화</button>
      </ListGroup>
    </div>
  );
}
