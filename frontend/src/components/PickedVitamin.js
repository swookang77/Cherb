import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { useSelector } from "react-redux";
import { persistor } from "../store";
import { useDispatch } from "react-redux";
import { deleteVitaminElem } from "../reducers/vitaminList-reducer";
import { totalActions } from "../reducers/total-reducer";
export default function PickedVitamin() {
  const dispatch = useDispatch();
  const vitaminList = useSelector((state) => state.vitaminList.data);
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
  //초기화 버튼.
  const handleReset = () => {
    persistor.purge();
    sessionStorage.clear();
    window.location.reload();
  };
  //삭제 버튼
  const handleDelete = (uuid) => {
    const facts = JSON.parse(sessionStorage.getItem(uuid));
    console.log(facts);
    const oldtotal = JSON.parse(sessionStorage.getItem("total"));
    console.log(oldtotal);
    //세션스토리지에서 해당하는 항목 삭제 & vitaminList상태 갱신
    sessionStorage.removeItem(uuid);
    dispatch(deleteVitaminElem(uuid));
    //newtotal생성  & 세션스토리지에 저장 & 상태 갱신
    const newTotal = deleteObjects(oldtotal, facts);
    sessionStorage.setItem("total", JSON.stringify(newTotal));
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
        <button onClick={handleReset}>초기화</button>
      </ListGroup>
    </div>
  );
}
