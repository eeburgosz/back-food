const axios = require("axios");
const cheerio = require('cheerio');
require('dotenv').config();
const { API_KEY } = process.env;

const stripHTML = (text) => {
   const $ = cheerio.load(text);
   return $.text();
};

const URL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=5220`;


const infoApiRecipes = async () => {
   const resp = (await axios.get(URL)).data.results;
   const data = resp.map(d => ({
      id: d.id,
      name: d.title,
      img: d.image,
      diets: d.diets,
      dishTypes: d.dishTypes,
      summary: stripHTML(d.summary),
      score: d.weightWatcherSmartPoints,
      healthScore: d.healthScore,
      stepByStep: d.analyzedInstructions[0]?.steps.map((step) => (
         {
            number: step.number,
            step: step.step,
         }
      ))
   }));
   return data;
};

const infoApiTypes = async () => {
   const resp = (await axios.get(URL)).data.results;
   const data = resp.map(d => ({
      diets: d.diets,
   }));
   const uniqueDiets = new Set();
   for (const item of data) {
      for (const diet of item.diets) {
         uniqueDiets.add(diet);
      }
   }
   const uniqueDietsArray = Array.from(uniqueDiets);
   return uniqueDietsArray;
};

module.exports = {
   infoApiRecipes,
   infoApiTypes
};