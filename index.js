import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

console.log(process.env.MONGO_URL);
const app = express();
const PORT = process.env.PORT;

const foods =[
    {
      "id": "100",
      "name": "Paneer Butter Masala",
      "poster": "https://www.ruchiskitchen.com/wp-content/uploads/2020/12/Paneer-butter-masala-recipe-3-500x375.jpg",
      "summary": "Butter,Ginger Garlic Paste,Black Pepper Powder,Red Chili Powder,Salt ,Kasuri Methi,Garam Masala,TomatoPuree,Cashew Paste,Paneer,Milk Cream ,Green Chili,Water ",
      "trailer": "https://www.youtube.com/embed/oYZ--rdHL6I"
    },
    {
      "id": "101",
      "name": "French Fries",
      "poster": "https://static.toiimg.com/thumb/54659021.cms?width=1200&height=900",
      "summary": "2 cups warm water,⅓ cup white sugar,2 large russet potatoes peeled, and sliced into 1/4 inch strips,6 cups vegetable oil for frying,salt to taste",
      "trailer": "https://www.youtube.com/embed/BCFoDfESF3Y"
    },
    {
      "id": "102",
      "name": "Ratatouille Provencale",
      "poster": "https://wildwoodhealth.com/wp-content/uploads/sites/2/2019/07/ratatouille-provencale.jpg",
      "summary": " ½ cup extra virgin olive oil,2 large onions, quartered, 3 cloves garlic, minced, 2 pounds fresh tomatoes,quartered, 3 eggplants, sliced into 1/2-inch rounds, 6 zucchini, sliced 1/2-inch thick, ½ cup tomato puree (Optional), 3 tablespoons herbes de Provence, salt and ground black pepper to taste ",
      "trailer": " https://www.youtube.com/embed/TIK5Jmd5flw "
    },
    {
      "id": "103",
      "name": "Cheese Balls",
      "poster": "https://mytastycurry.com/wp-content/uploads/2019/03/Cheese-Balls-classic.jpg",
      "summary": "1 pound ricotta cheese, 1 (8 ounce) package cream cheese, ¼ cup all purpose flour, ½ teaspoon salt, ½ teaspoon vanilla extract, 2 teaspoons grated lemon zest, 2 eggs, beaten, 4 egg whites, ¾ cup white sugar ",
      "trailer": "https://www.youtube.com/embed/PqOH0L8b8gs"
    },
    {
      "id": "104",
      "name": "Momo",
      "poster": "https://www.cookclickndevour.com/wp-content/uploads/2016/11/whole-wheat-momos-recipe-2.jpg",
      "summary": " Cabbage, Spring Onion, Onion, Garlic,  Carrot, Paneer, Ginger, Green Chilli Paste, Black Pepper, Haldi, Salt, Oil, Water, Wheat Flour, Maida, Water",
      "trailer": " https://www.youtube.com/embed/IVM_CQvgxCg "
    },
    {
      "id": "105",
      "name": "Noodles",
      "poster": "https://fryingpanadventures.com/wp-content/uploads/2020/10/image-137-scaled-e1604152201367.jpeg",
      "summary": "noodles whole wheat or plain flour, 5 cups water, ½ teaspoon oil, ½ teaspoon salt,1 cup shredded cabbage, ½ cup shredded carrots, ⅓ cup chopped spring onions, 8 to 10 french beans, salt as required, crushed black pepper, 1 teaspoon rice vinegar ",
      "trailer": " https://www.youtube.com/embed/xWZeQBLV6q4 "
    },
    {
      "id": "106",
      "name": "Nuggets",
      "poster": "https://www.aheadofthyme.com/wp-content/uploads/2020/06/easy-homemade-chicken-nuggets-8.jpg",
      "summary": " 2 potato, ½ tsp ginger garlic paste, ½ tsp chilli flakes, 3 tbsp cheddar cheese, ½ tsp mixed herbs,pepper, salt to taste, chaat masala, bread crumbs, corn flour, pepper, 1 cup bread crumbs, salt, water, oil for deep frying ",
      "trailer": " https://www.youtube.com/embed/ZXi3kWPN7h4 "
    },
    {
      "id": "107",
      "name": "Kebab",
      "poster": "https://www.licious.in/blog/wp-content/uploads/2020/12/Turkish-Kebabs-min.jpg",
      "summary": " 1/2 kg Chicken, 2 pcs Egg, 2 tbsp Maida/Corn flour, 3 tbsp Kabab Powder, 2 tbsp Chili powder, 2 tbsp Lime juice, 1/2 cup Curd, 2 tsp Ginger Garlic paste, Salt, 1 tsp Vinegar, Oil ",
      "trailer": " https://www.youtube.com/embed/6No7g2GptXY "
    }
  ];

  app.use(express.json());

  const MONGO_URL =  process.env.MONGO_URL;
  

async function createConnection(){
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    console.log("Mongo is connected");
    return client;
}
const client = await createConnection();

app.get('/', function (req, res) {
    res.send('Hello World')
});

app.get("/foods", async function (req, res) {
    const foods = await client.db("b30wd").collection("foods").find({}).toArray();
    res.send(foods);
});

app.get("/foods/:id", async function (req, res) {
    console.log(req.params);
    const { id } = req.params;
    const food = await client.db("b30wd").collection("foods").findOne({ id: id });
    console.log(food);
    food ? res.send(food) :  res.status(404).send({message: "No such food found"});
});

app.delete("/foods/:id", async function (req, res) {
    console.log(req.params);
    const { id } = req.params;
    const result = await client.db("b30wd").collection("foods").deleteOne({ id: id });
    res.send(result);
});

app.post("/foods", async function (req, res) {
    const data = req.body;
    console.log(data);
    const result = await client
    .db("b30wd")
    .collection("foods")
    .insertMany(data);
    res.send(result);
});

app.listen(PORT, ()=> console.log(`Server started in ${PORT}`));