import mongoose from 'mongoose';

const NutritionInfoSchema = new mongoose.Schema({
    servingSize: String,
    calories: String,
    sodiumContent: String,
    carbohydrateContent: String,
    fiberContent: String,
    sugarContent: String,
    fatContent: String,
    transFatContent: String,
    saturatedFatContent: String,
    cholesterolContent: String,
    proteinContent: String,
    unsaturatedFatContent: String,
    fsaNpsDi: String
});

export const NutritionInfo = mongoose.model('NutritionInfo', NutritionInfoSchema);
