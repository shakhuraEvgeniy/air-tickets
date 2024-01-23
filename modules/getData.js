const request = require("request");

const getData = async () => {
  const b1 = request(
    `https://lyssa.aviasales.ru/date_picker_prices?currency=rub&depart_months[]=2024-01-01&depart_months[]=2024-02-01&destination_iata=MOW&market=ru&one_way=true&origin_iata=KJA`,
    (err, response, body) => {
      if (err) return "Произошла непредвиденная ошибка";
      console.log("body", body);
      return body;
    }
  );
  console.log("b1", b1);
};

module.exports = { getData };

//https://lyssa.aviasales.ru/date_picker_prices?currency=rub&depart_months[]=${startMonth}&depart_months[]=${endMonth}&destination_iata=${destination_iata}&market=ru&one_way=true&origin_iata=${origin_iata}
//startMonth, endMonth, (destination_iata = "MOW"), (origin_iata = "KJA");
