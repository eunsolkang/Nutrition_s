"use client"
import {Button, Form, Header, Input, Select, Tab} from "semantic-ui-react";
import styled from "styled-components";
import {useEffect, useState} from "react";
import {getNutrition} from "@/app/lib/api";
import {ProductInfo} from "@/app/types/nutrition";
import Image from "next/image";
import Canvas from "@/app/components/canvas";

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

    const [products, setProducts] = useState<ProductInfo[]>([]);

    const getProducts = async () => {
        const d = await getNutrition();

        setProducts(d.data);
    }

    useEffect(() => {
        getProducts();
    }, []);

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

    const EditView = ({product}: {product: ProductInfo}) => {

        const [findText, setFindText] = useState('');
        const [input, setInput] = useState(product);

        const options = [
            { key: 'mg', text: 'mg', value: 'mg' },
            { key: 'g', text: 'g', value: 'g' },
            { key: '%', text: '%', value: '%' },
        ]

        return (
            <div>
                <Header>
                    영양정보
                </Header>
                <Form>
                    <Canvas fileName={product.fileName} findText={findText}></Canvas>
                    <Form.Group>
                        <Form.Input
                            label={'나트륨'}
                            value={input.sodiumContent.quantity}
                            onClick={() => setFindText('나트륨')}
                            onChange={(e) => setInput({...input, sodiumContent: {
                                    quantity: +e.target.value,
                                    uom: 'mg'
                                }})}

                        >
                            <input/>
                            <Select compact options={options} defaultValue={input.sodiumContent.uom} />

                        </Form.Input>

                        <Form.Input label={'탄수화물'}>
                            <input
                                value={input.carbohydrateContent.quantity}
                                onClick={() => setFindText('탄수화물')}
                                onChange={(e) => setInput({...input, carbohydrateContent: {
                                        quantity: +e.target.value,
                                        uom: input.carbohydrateContent.uom
                                    }})}
                            />
                            <Select compact options={options} defaultValue={input.carbohydrateContent.uom}
                                    onChange={(e, { value }) => setInput({...input, carbohydrateContent: {
                                            ...input.carbohydrateContent,
                                            uom: value as string
                                        }})}
                            />
                        </Form.Input>

                        <Form.Input label={'당류'}>
                            <input
                                value={input.sugarContent.quantity}
                                onClick={() => setFindText('당류')}
                                onChange={(e) => setInput({...input, sugarContent: {
                                        quantity: +e.target.value,
                                        uom: input.sugarContent.uom
                                    }})}
                            />
                            <Select compact options={options} defaultValue={input.sugarContent.uom}
                                    onChange={(e, { value }) => setInput({...input, sugarContent: {
                                            ...input.sugarContent,
                                            uom: value as string
                                        }})}
                            />
                        </Form.Input>
                    </Form.Group>

                    <Form.Group>
                        <Form.Input label={'포화지방'}>
                            <input
                                value={input.saturatedFatContent.quantity}
                                onClick={() => setFindText('포화지방')}
                                onChange={(e) => setInput({...input, saturatedFatContent: {
                                        quantity: +e.target.value,
                                        uom: input.saturatedFatContent.uom
                                    }})}
                            />
                            <Select compact options={options} defaultValue={input.saturatedFatContent.uom}
                                    onChange={(e, { value }) => setInput({...input, saturatedFatContent: {
                                            ...input.saturatedFatContent,
                                            uom: value as string
                                        }})}
                            />
                        </Form.Input>

                        <Form.Input label={'지방'}>
                            <input
                                value={input.fatContent.quantity}
                                onClick={() => setFindText('지방')}
                                onChange={(e) => setInput({...input, fatContent: {
                                        quantity: +e.target.value,
                                        uom: input.fatContent.uom
                                    }})}
                            />
                            <Select compact options={options} defaultValue={input.fatContent.uom}
                                    onChange={(e, { value }) => setInput({...input, fatContent: {
                                            ...input.fatContent,
                                            uom: value as string
                                        }})}
                            />
                        </Form.Input>

                        <Form.Input label={'트랜스지방'}>
                            <input
                                value={input.transFatContent.quantity}
                                onClick={() => setFindText('트랜스지방')}
                                onChange={(e) => setInput({...input, transFatContent: {
                                        quantity: +e.target.value,
                                        uom: input.transFatContent.uom
                                    }})}
                            />
                            <Select compact options={options} defaultValue={input.transFatContent.uom}
                                    onChange={(e, { value }) => setInput({...input, transFatContent: {
                                            ...input.transFatContent,
                                            uom: value as string
                                        }})}
                            />
                        </Form.Input>
                    </Form.Group>
                    <Form.Group>
                        <Form.Input label={'콜레스테롤'}>
                            <input
                                value={input.cholesterolContent.quantity}
                                onClick={() => setFindText('콜레스테롤')}
                                onChange={(e) => setInput({...input, cholesterolContent: {
                                        quantity: +e.target.value,
                                        uom: input.cholesterolContent.uom
                                    }})}
                            />
                            <Select compact options={options} defaultValue={input.cholesterolContent.uom}
                                    onChange={(e, { value }) => setInput({...input, cholesterolContent: {
                                            ...input.cholesterolContent,
                                            uom: value as string
                                        }})}
                            />
                        </Form.Input>

                        <Form.Input label={'단백질'}>
                            <input
                                value={input.proteinContent.quantity}
                                onClick={() => setFindText('단백질')}
                                onChange={(e) => setInput({...input, proteinContent: {
                                        quantity: +e.target.value,
                                        uom: input.proteinContent.uom
                                    }})}
                            />
                            <Select compact options={options} defaultValue={input.proteinContent.uom}
                                    onChange={(e, { value }) => setInput({...input, proteinContent: {
                                            ...input.proteinContent,
                                            uom: value as string
                                        }})}
                            />
                        </Form.Input>
                    </Form.Group>
                    <Form.Field>
                        <Button primary>
                            입력
                        </Button>
                    </Form.Field>
                </Form>

            </div>
        )
    }

    const panes = products.map(product => {
        return { menuItem: product.productName, render: () => <EditView product={product}></EditView> }
    })

    return (
        <Frame>
            <Tab menu={{ fluid: true, vertical: true, tabular: true }} panes={panes} />
        </Frame>
    )
}