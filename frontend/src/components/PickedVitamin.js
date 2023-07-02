import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { useSelector } from "react-redux";

export default function PickedVitamin() {
  const vitaminList = useSelector((state) => state.vitaminList.data);

  return (
    <div>
      영양제 리스트
      <ListGroup>
        {vitaminList.map((item, index) => (
          <ListGroup.Item key={index}>{item.title}</ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}
