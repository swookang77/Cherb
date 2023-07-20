import axios from "axios";
import React, { useEffect, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { SERVER_URL } from "../config";

export default function MyVitamin() {
  const [combiList, setCombiList] = useState([]);
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
  const handleDelete = (uuid) => {
  };
  return (
    <div>
      영양제 리스트
      <ListGroup>
        {combiList.map((item, index) => (
          <ListGroup.Item key={index}>
            {item.title}
            <button onClick={() => handleDelete(item.uuid)}>삭제</button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}
