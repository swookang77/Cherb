import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { useSelector } from "react-redux";
import { persistor } from "../store";

export default function PickedVitamin() {
  const vitaminList = useSelector((state) => state.vitaminList.data);
  //초기화 버튼.
  const handleReset = () =>{
    persistor.purge();
    window.location.reload();
  }
  return (
    <div>
      영양제 리스트
      <ListGroup>
        {vitaminList.map((item, index) => (
          <ListGroup.Item key={index}>{item.title}</ListGroup.Item>
        ))}
        <button onClick={handleReset}>초기화</button>
      </ListGroup>
    </div>
  );
}
