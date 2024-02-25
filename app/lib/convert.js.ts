import {Schema} from "mongoose";
function findCarbohydrateValues(rawText: string) {

    const dataArray = rawText.split(' ');

    let results: any[] = [];
    dataArray.forEach((item: string, index: number) => {
        if (item.startsWith('탄수화물') && /\d+g/.test(item)) {
            // "탄수화물"과 숫자가 결합된 형태 ("탄수화물19g")
            const value = item.match(/(\d+g)/)![0];
            results.push(value);
        } else if (item === '탄수화물') {
            // 다음 요소가 "19g" 형태인지 확인
            if (/\d+g/.test(dataArray[index + 1])) {
                results.push(dataArray[index + 1]);
            } else if (!isNaN(Number(dataArray[index + 1])) && dataArray[index + 2] === 'g') {
                // "탄수화물" 다음에 숫자, 그 다음에 "g"
                results.push(dataArray[index + 1] + 'g');
            }
        }
    });

    return results.length > 0 ? results[0] : null;
}

function getKcal(rawText: string){
    const kcalString = rawText.split(' ').find(f => f.indexOf('kcal') !== -1)
    //칼로리 정보가 있다면
    // if(kcalString){
    //     if(kcalString !== -1){
    //         const pattern = /(\d+)kcal/;
    //         const match = kcalString.match(pattern);
    //
    //         if (match) {
    //             const kcalValue = match[1] + "kcal"; // 숫자 부분을 추출하고 "kcal"을 붙임
    //             return kcalValue
    //         } else {
    //             return null;
    //         }
    //     }
    // }
    return null;
}

function findNutrientValue(rawText: string, nutrientKeyword: string, unit: string) {
    const dataArray = rawText.split(' ');

    for (let i = 0; i < dataArray.length; i++) {
        if (dataArray[i].startsWith(nutrientKeyword)) {
            // 키워드와 숫자가 결합된 형태 (예: "단백질4g")
            const combinedPattern = new RegExp(`${nutrientKeyword}(\\d+(\\.\\d+)?${unit})`);
            const combinedMatch = dataArray[i].match(combinedPattern);
            if (combinedMatch) {
                return combinedMatch[1] + unit;
            }
        }
        if (dataArray[i] === nutrientKeyword || dataArray[i].includes(nutrientKeyword)) {
            // 키워드 이후로 배열을 탐색
            for (let j = i + 1; j < dataArray.length; j++) {
                if (dataArray[j].endsWith(unit) || dataArray[j].includes(unit)) {
                    // 단위로 끝나는 요소에서 숫자를 추출 (뒤에 이상한 문자가 붙어있는 경우 포함)
                    const match = dataArray[j].match(new RegExp(`^(\\d+(\\.\\d+)?${unit})`));
                    if (match) {
                        return match[1];
                    }
                } else if (dataArray[j+1] === unit) {
                    // 단위 바로 앞에 있는 요소가 숫자인지 확인 (소수점 포함 가능)
                    const potentialNumber = Number(dataArray[j]);
                    if (!isNaN(potentialNumber)) {
                        return potentialNumber + unit;
                    }
                }
            }
        }
    }
    return null; // 적합한 값이 없는 경우
}



export default function parseNutritionData(rawText: string) {

    const parseValue = (pattern: any, text: string) => {
        const match = text.match(pattern);
        return match ? match[1].split(' ').join('') : null;
    };

    return {
        servingSize: parseValue(/총\s*내용량\s*(\d+g)/, rawText),
        calories: getKcal(rawText),
        sodiumContent: parseValue(/나트륨\s*(\d+,?\d*\s*mg)/, rawText),
        carbohydrateContent: findCarbohydrateValues(rawText),
        sugarContent: parseValue(/당류\s*(\d+g)/, rawText),
        fatContent: findNutrientValue(rawText, '지방', 'g'),
        transFatContent: findNutrientValue(rawText, '트랜스지방', 'g'),
        saturatedFatContent: findNutrientValue(rawText, '포화지방', 'g'),
        cholesterolContent: findNutrientValue(rawText, '콜레스테롤', 'mg'),
        proteinContent: findNutrientValue(rawText, '단백질', 'g'),
        calciumContent: parseValue(/칼슘\s*(\d+mg)/, rawText),
        // 'fiberContent', 'unsaturatedFatContent', 'fsaNpsDi'는 예제 데이터에 포함되지 않았으므로 null 처리
        fiberContent: null,
        unsaturatedFatContent: null,
        fsaNpsDi: null,
    };
}

