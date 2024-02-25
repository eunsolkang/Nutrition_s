import { useEffect, useRef, useState } from 'react';

type Vertex = { x: number; y: number };
type Pos = { vertices: string }; // vertices는 JSON 문자열로 저장
type DataItem = {
    text: string;
    pos: Pos;
};

const data: DataItem[] = [
    {
        "text": "제조원",
        "pos": {
            "vertices": "[{\"x\":24,\"y\":0},{\"x\":66,\"y\":0},{\"x\":66,\"y\":17},{\"x\":24,\"y\":17}]"
        }
    },
    {
        "text": "(주)삼아인터내셔날/중성남도",
        "pos": {
            "vertices": "[{\"x\":71,\"y\":0},{\"x\":242,\"y\":0},{\"x\":242,\"y\":16},{\"x\":71,\"y\":16}]"
        }
    },
    {
        "text": "아산시",
        "pos": {
            "vertices": "[{\"x\":241,\"y\":0},{\"x\":279,\"y\":0},{\"x\":279,\"y\":12},{\"x\":241,\"y\":12}]"
        }
    },
    {
        "text": "신성민",
        "pos": {
            "vertices": "[{\"x\":280,\"y\":0},{\"x\":317,\"y\":0},{\"x\":317,\"y\":11},{\"x\":280,\"y\":11}]"
        }
    },
    {
        "text": "사무감도",
        "pos": {
            "vertices": "[{\"x\":318,\"y\":0},{\"x\":367,\"y\":0},{\"x\":367,\"y\":10},{\"x\":318,\"y\":10}]"
        }
    },
    {
        "text": "790만실40",
        "pos": {
            "vertices": "[{\"x\":367,\"y\":0},{\"x\":427,\"y\":0},{\"x\":427,\"y\":9},{\"x\":367,\"y\":9}]"
        }
    },
    {
        "text": "총내용량",
        "pos": {
            "vertices": "[{\"x\":429,\"y\":14},{\"x\":481,\"y\":12},{\"x\":482,\"y\":29},{\"x\":430,\"y\":31}]"
        }
    },
    {
        "text": "40g",
        "pos": {
            "vertices": "[{\"x\":483,\"y\":15},{\"x\":506,\"y\":24},{\"x\":502,\"y\":34},{\"x\":479,\"y\":25}]"
        }
    },
    {
        "text": "영양정보",
        "pos": {
            "vertices": "[{\"x\":11,\"y\":24},{\"x\":89,\"y\":24},{\"x\":89,\"y\":56},{\"x\":11,\"y\":56}]"
        }
    },
    {
        "text": "1개당170kcal",
        "pos": {
            "vertices": "[{\"x\":421,\"y\":27},{\"x\":507,\"y\":30},{\"x\":507,\"y\":47},{\"x\":421,\"y\":45}]"
        }
    },
    {
        "text": "나트륨",
        "pos": {
            "vertices": "[{\"x\":7,\"y\":57},{\"x\":52,\"y\":57},{\"x\":52,\"y\":82},{\"x\":7,\"y\":82}]"
        }
    },
    {
        "text": "200mg",
        "pos": {
            "vertices": "[{\"x\":78,\"y\":56},{\"x\":132,\"y\":60},{\"x\":130,\"y\":81},{\"x\":76,\"y\":77}]"
        }
    },
    {
        "text": "10%",
        "pos": {
            "vertices": "[{\"x\":153,\"y\":55},{\"x\":189,\"y\":55},{\"x\":189,\"y\":76},{\"x\":153,\"y\":76}]"
        }
    },
    {
        "text": "탄수화물",
        "pos": {
            "vertices": "[{\"x\":198,\"y\":52},{\"x\":255,\"y\":51},{\"x\":255,\"y\":77},{\"x\":199,\"y\":78}]"
        }
    },
    {
        "text": "19 g",
        "pos": {
            "vertices": "[{\"x\":273,\"y\":51},{\"x\":305,\"y\":53},{\"x\":304,\"y\":76},{\"x\":272,\"y\":74}]"
        }
    },
    {
        "text": "6%",
        "pos": {
            "vertices": "[{\"x\":332,\"y\":50},{\"x\":359,\"y\":50},{\"x\":359,\"y\":70},{\"x\":332,\"y\":70}]"
        }
    },
    {
        "text": "당류",
        "pos": {
            "vertices": "[{\"x\":370,\"y\":46},{\"x\":402,\"y\":46},{\"x\":402,\"y\":72},{\"x\":370,\"y\":72}]"
        }
    },
    {
        "text": "12g",
        "pos": {
            "vertices": "[{\"x\":429,\"y\":47},{\"x\":461,\"y\":47},{\"x\":461,\"y\":70},{\"x\":429,\"y\":70}]"
        }
    },
    {
        "text": "12%",
        "pos": {
            "vertices": "[{\"x\":487,\"y\":50},{\"x\":515,\"y\":51},{\"x\":514,\"y\":65},{\"x\":487,\"y\":64}]"
        }
    },
    {
        "text": "지방",
        "pos": {
            "vertices": "[{\"x\":7,\"y\":85},{\"x\":41,\"y\":85},{\"x\":41,\"y\":114},{\"x\":7,\"y\":114}]"
        }
    },
    {
        "text": "콜레스테롤",
        "pos": {
            "vertices": "[{\"x\":11,\"y\":114},{\"x\":81,\"y\":113},{\"x\":81,\"y\":137},{\"x\":11,\"y\":138}]"
        }
    },
    {
        "text": "4.8g",
        "pos": {
            "vertices": "[{\"x\":78,\"y\":86},{\"x\":117,\"y\":86},{\"x\":117,\"y\":111},{\"x\":78,\"y\":111}]"
        }
    },
    {
        "text": "1.4mg",
        "pos": {
            "vertices": "[{\"x\":127,\"y\":115},{\"x\":170,\"y\":115},{\"x\":170,\"y\":131},{\"x\":127,\"y\":131}]"
        }
    },
    {
        "text": "9%",
        "pos": {
            "vertices": "[{\"x\":150,\"y\":84},{\"x\":179,\"y\":84},{\"x\":179,\"y\":106},{\"x\":150,\"y\":106}]"
        }
    },
    {
        "text": "트랜스지방",
        "pos": {
            "vertices": "[{\"x\":188,\"y\":79},{\"x\":255,\"y\":79},{\"x\":255,\"y\":107},{\"x\":188,\"y\":107}]"
        }
    },
    {
        "text": "0%",
        "pos": {
            "vertices": "[{\"x\":194,\"y\":111},{\"x\":221,\"y\":111},{\"x\":221,\"y\":130},{\"x\":194,\"y\":130}]"
        }
    },
    {
        "text": "단백질",
        "pos": {
            "vertices": "[{\"x\":233,\"y\":107},{\"x\":275,\"y\":107},{\"x\":275,\"y\":131},{\"x\":233,\"y\":131}]"
        }
    },
    {
        "text": "12",
        "pos": {
            "vertices": "[{\"x\":301,\"y\":108},{\"x\":318,\"y\":108},{\"x\":318,\"y\":126},{\"x\":301,\"y\":126}]"
        }
    },
    {
        "text": "0g",
        "pos": {
            "vertices": "[{\"x\":314,\"y\":81},{\"x\":337,\"y\":83},{\"x\":335,\"y\":103},{\"x\":312,\"y\":102}]"
        }
    },
    {
        "text": "g",
        "pos": {
            "vertices": "[{\"x\":318,\"y\":112},{\"x\":328,\"y\":112},{\"x\":328,\"y\":127},{\"x\":318,\"y\":127}]"
        }
    },
    {
        "text": "포화지방",
        "pos": {
            "vertices": "[{\"x\":343,\"y\":75},{\"x\":400,\"y\":75},{\"x\":400,\"y\":102},{\"x\":343,\"y\":102}]"
        }
    },
    {
        "text": "22%",
        "pos": {
            "vertices": "[{\"x\":350,\"y\":105},{\"x\":384,\"y\":105},{\"x\":384,\"y\":124},{\"x\":350,\"y\":124}]"
        }
    },
    {
        "text": "22%",
        "pos": {
            "vertices": "[{\"x\":486,\"y\":75},{\"x\":519,\"y\":75},{\"x\":519,\"y\":92},{\"x\":486,\"y\":92}]"
        }
    },
    {
        "text": "2,000",
        "pos": {
            "vertices": "[{\"x\":207,\"y\":134},{\"x\":238,\"y\":134},{\"x\":238,\"y\":144},{\"x\":207,\"y\":144}]"
        }
    },
    {
        "text": "kcal",
        "pos": {
            "vertices": "[{\"x\":240,\"y\":135},{\"x\":261,\"y\":135},{\"x\":261,\"y\":142},{\"x\":240,\"y\":142}]"
        }
    },
    {
        "text": "기준이므로",
        "pos": {
            "vertices": "[{\"x\":264,\"y\":132},{\"x\":316,\"y\":132},{\"x\":316,\"y\":144},{\"x\":264,\"y\":144}]"
        }
    },
    {
        "text": "개인의",
        "pos": {
            "vertices": "[{\"x\":319,\"y\":130},{\"x\":351,\"y\":129},{\"x\":352,\"y\":142},{\"x\":319,\"y\":142}]"
        }
    },
    {
        "text": "필요연락에 따라",
        "pos": {
            "vertices": "[{\"x\":354,\"y\":130},{\"x\":426,\"y\":129},{\"x\":426,\"y\":138},{\"x\":354,\"y\":140}]"
        }
    },
    {
        "text": "1일",
        "pos": {
            "vertices": "[{\"x\":19,\"y\":140},{\"x\":37,\"y\":140},{\"x\":37,\"y\":149},{\"x\":19,\"y\":149}]"
        }
    },
    {
        "text": "영양성분기준치에",
        "pos": {
            "vertices": "[{\"x\":38,\"y\":138},{\"x\":128,\"y\":136},{\"x\":128,\"y\":147},{\"x\":38,\"y\":149}]"
        }
    },
    {
        "text": "대한",
        "pos": {
            "vertices": "[{\"x\":129,\"y\":135},{\"x\":153,\"y\":135},{\"x\":153,\"y\":147},{\"x\":129,\"y\":147}]"
        }
    },
    {
        "text": "비율(%)은",
        "pos": {
            "vertices": "[{\"x\":157,\"y\":137},{\"x\":203,\"y\":136},{\"x\":203,\"y\":144},{\"x\":157,\"y\":145}]"
        }
    }
];

const IndexPage = ({fileName, findText}: {fileName: string, findText: string}) => {
    console.log(fileName)
    const canvasRef = useRef<HTMLCanvasElement>(null);


    const imageSrc = `http://192.168.45.4:8080/${fileName}`; // 이미지 URL 지정

    function calculateCenter(vertices: {x: number, y: number}[]) {
        let sumX = 0, sumY = 0;
        vertices.forEach(vertex => {
            sumX += vertex.x;
            sumY += vertex.y;
        });
        return { x: sumX / vertices.length, y: sumY / vertices.length };
    }

    function calculateDistance(center1:{x: number, y: number}, center2:{x: number, y: number}) {
        return Math.sqrt((center1.x - center2.x) ** 2 + (center1.y - center2.y) ** 2);
    }

    const findClosestRightTextBlocks = (baseTextBlock: DataItem, otherTextBlocks: DataItem[]) =>  {
        let baseCenter = calculateCenter(JSON.parse(baseTextBlock.pos.vertices));
        let candidates: any[] = [];

        otherTextBlocks.forEach(block => {
            let blockCenter = calculateCenter(JSON.parse(block.pos.vertices));
            // 오른쪽에 위치한 블록 찾기
            if (blockCenter.x > baseCenter.x) {
                // 수평 거리 계산
                let horizontalDistance = Math.abs(baseCenter.y - blockCenter.y);
                candidates.push({
                    block: block,
                    distance: calculateDistance(baseCenter, blockCenter), // 전체 거리 계산
                    horizontalDistance: horizontalDistance
                });
            }
        });

        // 수평 거리가 가장 짧은 블록을 기준으로 먼저 정렬하고, 그 다음 전체 거리로 정렬
        candidates.sort((a, b) => {
            if (a.horizontalDistance === b.horizontalDistance) {
                return a.distance - b.distance;
            }
            return a.horizontalDistance - b.horizontalDistance;
        });

        // 두 블록 반환 ('수치'와 '단위')
        let numberBlock = null;
        let unitBlock = null;

        console.log(candidates);
        for (let candidate of candidates) {
            if (!numberBlock && !Number.isNaN(candidate.block.text.split('g')[0]) && candidate.block.text.split('g')[0] !== '') {
                numberBlock = candidate.block;
                //   console.log(Number(candidate.block.text.split('g')[0]));
                if(candidate.block.text.toLowerCase().includes('g')){
                    console.log("?");
                    unitBlock = candidate.block;
                }
            }
        }

        for (let candidate of candidates) {
            if (!unitBlock && numberBlock && candidate.block.text.toLowerCase().includes('g')) {
                unitBlock = candidate.block;
                break;
            }
        }

        return { numberBlock, unitBlock };
    }
    useEffect(() => {
        drawTextBlocks(data, findText);
    }, [findText]);

    const drawTextBlocks = (data: DataItem[], findText: string) => {
        if (!canvasRef.current) return;
        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) return;

        // ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        const image = new Image();
        image.src = imageSrc;
        image.onload = () => {
            // 이미지를 캔버스 크기에 맞게 조정하여 그립니다.
            ctx.drawImage(image, 0, 0, ctx.canvas.width, ctx.canvas.height);
            // 이미지 로드 후 텍스트 블록 그리기

            let baseBlock; // '단백질'과 같은 기준이 되는 텍스트 블록
            let otherBlocks: any[] = []; // 기준 블록을 제외한 나머지 텍스트 블록들


            data.forEach((item) => {
                const vertices: Vertex[] = JSON.parse(item.pos.vertices);
                ctx.beginPath();
                ctx.strokeStyle = item.text === findText ? 'blue' : 'black';
                vertices.forEach((vertex, i) => {
                    if (i === 0) ctx.moveTo(vertex.x, vertex.y);
                    else ctx.lineTo(vertex.x, vertex.y);
                });
                ctx.closePath();
                ctx.stroke();

                const padding = 2;
                ctx.fillStyle = ctx.strokeStyle;
                ctx.fillText(item.text, vertices[0].x + padding, vertices[0].y + padding);

                if (item.text === findText) {
                    baseBlock = item; // 기준 블록 설정
                } else {
                    otherBlocks.push(item); // 나머지 블록 추가
                }

            });

            if (baseBlock) {
                const { numberBlock, unitBlock } = findClosestRightTextBlocks(baseBlock, otherBlocks);
                if (numberBlock && unitBlock) {
                    // 관련된 '수치'와 '단위' 블록에 빨간색 박스 그리기
                    [numberBlock, unitBlock].forEach(block => {
                        const vertices: {x: number, y: number}[] = JSON.parse(block.pos.vertices);
                        ctx.beginPath();
                        ctx.strokeStyle = 'red'; // 빨간색으로 설정
                        vertices.forEach((vertex, i) => {
                            ctx[i === 0 ? 'moveTo' : 'lineTo'](vertex.x, vertex.y);
                        });
                        ctx.closePath();
                        ctx.stroke();

                        // 텍스트를 왼쪽 상단 근처에 그림
                        const padding = 2; // 적당한 패딩 값을 설정
                        ctx.fillStyle = ctx.strokeStyle; // 텍스트 색상을 사각형의 테두리 색상과 동일하게
                        //ctx.fillText(block.text, vertices[0].x + padding, vertices[0].y + parseInt(ctx.font, 10) + padding);
                    });
                }
            }
        };
    };

    return (
        <div>
            <canvas ref={canvasRef} width="520" height="150" style={{ border: '1px solid #000' }}></canvas>
        </div>
    );
};

export default IndexPage;