"use client"
import {Button, Form, Header, Input} from "semantic-ui-react";
import styled from "styled-components";
import {useEffect, useState} from "react";

const Frame = styled.div`
  width: 1280px;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: center;
  justify-content: center;
`
interface ServerMessage {
    time: string;
}


export default function MainPage () {

    const [messages, setMessages] = useState<ServerMessage[]>([]);

    // useEffect(() => {
    //     // EventSource를 사용하여 서버와의 SSE 연결을 설정
    //     const eventSource = new EventSource('/api/');
    //
    //     // 서버로부터 메시지를 받을 때 호출되는 이벤트 핸들러
    //     eventSource.onmessage = (event) => {
    //         const newMessage: ServerMessage = JSON.parse(event.data);
    //         setMessages((prevMessages) => [...prevMessages, newMessage]);
    //     };
    //
    //     // 컴포넌트 언마운트 시 연결 종료
    //     return () => {
    //         eventSource.close();
    //     };
    // }, []);


    return (
        <Frame>
            <Header>
                영양정보
            </Header>
            <Form>
                <Form.Group>
                    <Form.Input label={'나트륨'} ></Form.Input>
                    <Form.Input label={'탄수화물'}></Form.Input>
                    <Form.Input label={'당류'}></Form.Input>
                </Form.Group>
                <Form.Group>
                    <Form.Input label={'포화지방'}></Form.Input>
                    <Form.Input label={'지방'}></Form.Input>
                    <Form.Input label={'트랜스지방'}></Form.Input>
                </Form.Group>
                <Form.Group>
                    <Form.Input label={'콜레스테롤'}></Form.Input>
                    <Form.Input label={'단백질'}></Form.Input>
                </Form.Group>
                <Form.Field>
                    <Button primary>
                        입력
                    </Button>
                </Form.Field>
            </Form>
        </Frame>
    )
}