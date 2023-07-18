import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { totalActions } from "../reducers/total-reducer";
import { myVitaminListActions } from "../reducers/my-vitaminList-reducer";
export default function MyVitamin() {
  const dispatch = useDispatch();
  const vitaminList = useSelector((state) => state.myVitaminList.data);
  const deleteObjects = (oldtotal, facts) => {
    for (let key in facts) {
      const deleteValue = facts[key];
      oldtotal[key] -= deleteValue;
      const newValue = oldtotal[key];
      if (newValue < deleteValue / 2 || isNaN(newValue) || newValue === null || newValue===0) {
        delete oldtotal[key];
      }
    }
    return oldtotal;
  };
  //삭제 버튼
  const handleDelete = (uuid) => {
    const facts = JSON.parse(sessionStorage.getItem(uuid));
    const oldtotal = JSON.parse(sessionStorage.getItem("total"));
    //세션스토리지에서 해당하는 항목 삭제 & vitaminList상태 갱신
    sessionStorage.removeItem(uuid);
    dispatch(myVitaminListActions.deleteMyVitaminElem(uuid));
    //newtotal생성  & 세션스토리지에 저장 & 상태 갱신
    const newTotal = deleteObjects(oldtotal, facts);
    sessionStorage.setItem("total", JSON.stringify(newTotal));
    //여기 수정필요.
    dispatch(totalActions.updateTotal(newTotal));
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
      </ListGroup>
    </div>
  );
}
