import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { useSelector } from "react-redux";

export default function MyVitamin() {
  const myVitaminList = useSelector((state) => state.myVitaminList.data);
  return (
    <div>
      영양제 리스트
      <ListGroup>
        {myVitaminList.map((item, index) => (
          <ListGroup.Item key={index}>
            {item.title}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}
