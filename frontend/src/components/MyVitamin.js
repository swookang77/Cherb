import axios from "axios";
import React, { useEffect, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { SERVER_URL } from "../config";
import { useDispatch } from "react-redux";
import { myTotalActions } from "../reducers/my-total-reducer";

export default function MyVitamin() {
  const [combiList, setCombiList] = useState([]);
  const dispatch = useDispatch();
  const api = axios.create({
    baseURL: SERVER_URL,
    withCredentials: true, // 쿠키 자동 전송을 위한 옵션 설정
  });
  useEffect(() => {
    const api = axios.create({
      baseURL: SERVER_URL,
      withCredentials: true, // 쿠키 자동 전송을 위한 옵션 설정
    });
    const getCombiList = async () => {
      try {
        const response = await api.get(`${SERVER_URL}/vitamin/combiList`);
        setCombiList(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getCombiList();
  }, []);
  const handleDelete = (uuid) => {};
  const handleShow = async (uuid) => {
    try {
      const response = await api.post(`${SERVER_URL}/vitamin/total`,{uuid});
      const total = response.data;
      console.log(total);
      //total상태 갱신.
      dispatch(myTotalActions.updateMyTotal(total))
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      조합 리스트
      <ListGroup>
        {combiList.map((item, index) => (
          <ListGroup.Item key={index}>
            {item.title}
            <button onClick={() => handleShow(item.uuid)}>그래프 보기</button>
            <button onClick={() => handleDelete(item.uuid)}>삭제</button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}
