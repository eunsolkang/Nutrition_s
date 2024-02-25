// 각 영양 정보 필드에 대한 타입 정의
type NutrientContent = {
    quantity: number;
    uom: string; // Unit of Measure (단위)
};

// 전체 제품 정보에 대한 타입 정의
export type ProductInfo = {
    _id: string;
    productName: string;
    servingSize: NutrientContent;
    calories: NutrientContent;
    sodiumContent: NutrientContent;
    carbohydrateContent: NutrientContent;
    fiberContent: NutrientContent;
    sugarContent: NutrientContent;
    fatContent: NutrientContent;
    transFatContent: NutrientContent;
    saturatedFatContent: NutrientContent;
    cholesterolContent: NutrientContent;
    proteinContent: NutrientContent;
    unsaturatedFatContent: NutrientContent;
    fsaNpsDi: string;
    fileName: string;
    __v: number;
};

// 제품 정보 배열을 나타내는 타입