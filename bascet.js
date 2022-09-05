"use strict";

// Найдем все необходимые элементы на странице
  const basketWrapElm = document.getElementById('basketWrap'),
        basketTabSummElm = document.getElementById("basketTabSumm"),
        basketTabEmptyElm = document.getElementById("basketTabEmpty"),
        totalBasketCountElm = document.getElementById("basketCount"),
        totalBasketPriceElm = document.getElementById("totalBasketPrice");

// Определим объект для хранения данных корзины
  let basketItems = {};

// Распарсим JSON с данными продуктов
  const prods = JSON.parse(prodsJson);

// Открытие корзины по клику на иконку
  document.getElementById('cardIcon').addEventListener("click", e => {
    basketWrapElm.classList.toggle("hidden");
  });

// Очистка корзины по клику на иконку
  document.getElementById('basketTabEmpty').addEventListener("click", e => {
    emtyBasket();
  });

// Повесим событие клика по кнопке добавления в корзину
  const featuredItemBtn = document.querySelector('.featuredItems');
  featuredItemBtn.addEventListener("click", e => {
    // полверим был ли клик по кнопке добавления товара в корзину
      if (e.target.nodeName !== "BUTTON" || !e.target.classList.contains("addCardBtn")) {
        return;
      }

    // Увеличим счетчик товаров в корзине
      ++totalBasketCountElm.innerText;

    // Добавим товар в объект корзины
      addBasketItem(e.target.dataset.id);

    // Отрендерим таблице корзины товар после добавления
      renderProductInBasket(e.target.dataset.id);

    // Перезапишем цену всех товаров в корзине
      totalBasketPriceElm
        .innerText = +totalBasketPriceElm.innerText + prods[e.target.dataset.id].price;
  });

// ------------ FUNCTIONs ------------ //
/**
 * Функция добавляет продукт в корзину.
 * @param {number} id - Id продукта.
 */
function addBasketItem(id) {
  if (!basketItems.hasOwnProperty(id)) {
    basketItems[id] = { prodSummPrice:prods[id].price, count: 1 };
  } else {
    basketItems[id].prodSummPrice += prods[id].price;
    ++basketItems[id].count;
  }
}

/**
 * Отрисовывает в корзину информацию о продукте.
 * @param {number} id - Id продукта.
 */
function renderProductInBasket(id) {
  // получим строку с товаром в корзине
    const basketRow = document.querySelector(
      `tr.basketTab__product[date-id="${id}"]`
    );

  // Соберем HTML для вставки
    const htmlCode = `<tr class="basketTab__product" date-id="${id}">
      <td>${prods[id].product}</td>
      <td>${basketItems[id].count} шт.</td>
      <td>$${prods[id].price}</td>
      <td>$${basketItems[id].prodSummPrice}</td>
    </tr>`;

  // Вставим строку кода в зависимости от наличия товара в корзине
    if (!basketRow) {
      basketTabSummElm.insertAdjacentHTML("beforeBegin", htmlCode);
    } else {
      basketRow.innerHTML = htmlCode;
    }
}

/**
 * Ощищает корзину товаров.
 */
function emtyBasket() {
  // Удалим строки товаров в корзине
  document.querySelectorAll(".basketTab__product").forEach(row => {
      row.remove();
  })
  // Очистим объект для хранения данных корзины
    basketItems = {};

  // Обнулим счетчик товаров в корзине
    totalBasketCountElm.innerText = 0;

  // Обнулим цены всех товаров в корзине
    totalBasketPriceElm
      .innerText = 0;
}
