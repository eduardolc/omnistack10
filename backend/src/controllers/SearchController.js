const Dev = require("../models/Dev");
const parseStringAsArray = require("../utils/parseStringAsArray");

module.exports = {
  async index(request, response) {
    // buscar todos devs num raio 10km
    // filtro por tecnologias
    const { latitude, longtude, techs } = request.query;

    const techsArray = parseStringAsArray(techs);

    const devs = await Dev.find({
      techs: {
        $in: techsArray
      },
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longtude, latitude]
          },
          $maxDistance: 10000
        }
      }
    });

    console.log(techsArray);
    return response.json({ devs });
  }
};
