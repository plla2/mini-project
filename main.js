// 1. 박스 2개 만들기
// 2. 드랍다운 리스트 만들기
// 3. 환율정보 들고오기
// 4. 드랍다운 리스트에서 아이템 선택하면 아이템이 바뀜
// 5. 금액을 입력하면 환전이 된다.
// 6. 드랍다운 리스트에서 아이템을 선택하면 다시 그 단위 기준으로 환전이 된다.
// 7. 숫자를 한국어로 읽는법
// 8. 반대로 밑 박스에서 숫자를 바꿔도 위 박스에 환율이 적용된다.

let currencyRatio = {
  USD: {
    KRW: 1273.81,
    USD: 1,
    VND: 23507.5,
    unit: "달러",
  },
  KRW: {
    KRW: 1,
    USD: 0.00079,
    VND: 18.46,
    unit: "원",
  },
  VND: {
    KRW: 0.054,
    USD: 0.000043,
    VND: 1,
    unit: "동",
  },
};
let fromCurrency = "USD";
let toCurrency = "USD";
// console.log(currencyRatio.USD.unit);
// console.log(currencyRatio.VND.unit);

// console.log(currencyRatio["VND"]["unit"]);

document.querySelectorAll("#from-currency-list a").forEach((menu) =>
  menu.addEventListener("click", function () {
    // 1. 버튼을 가져온다
    // document.getElementById("from-btn");
    // 2. 버튼의 값을 바꾼다
    document.getElementById("from-btn").textContent = this.textContent;
    // 3. 선택된 currency값을 변수에 저장해준다.
    fromCurrency = this.textContent;
    convert();
    convert2();
  })
);

document.querySelectorAll("#to-currency-list a").forEach((menu) => {
  menu.addEventListener("click", function () {
    document.getElementById("to-btn").textContent = this.textContent;
    toCurrency = this.textContent;
    convert();
    convert2();
  });
});

// 1. 키를 입력하는순간
// 2. 환전이되서
// 3. 환전값이 보인다.

function convert() {
  //1. 환전
  // 얼마를 환전?? 가지고있는 돈의 종류, 바꾸고자하는 돈의 종류
  // 돈 * 환율 = 환전금액
  let amount = document.getElementById("from-input").value; //input태그 안에 입력한 값을 들고오고싶으면 .value사용
  let convertedAmount = amount * currencyRatio[fromCurrency][toCurrency];

  document.getElementById("to-input").value = convertedAmount;
}

function convert2() {
  let amount2 = document.getElementById("to-input").value;
  let convertedAmount2 = amount2 * currencyRatio[toCurrency][fromCurrency];
  document.getElementById("from-input").value = convertedAmount2;
}
