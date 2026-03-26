'use strict';
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
////////////////// .......... BANKIST APP ............. ////////////////////

//Data
const account1 = {
  owner: 'Mugera Vincent',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  movementsDates: [
    '2025-11-01T21:13:33.235Z',
    '2025-12-30T09:42:16.867Z',
    '2026-01-25T06:04:33.904Z',
    '2026-02-01T06:15:24.335Z',
    '2026-02-14T03:13:43.185Z',
    '2026-03-18T23:10:17.435Z',
    '2026-03-24T22:15:33.735Z',
    '2026-03-25T12:01:36.0894Z',
  ],
  locale: 'en-US',
  currency: 'USD',
  interestRate: 1.2, //%
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Birunji',
  movements: [5000, 3400, -150, -790, -3210, -1000, 85000, -30],
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-01T13:15:33.035Z',
    '2020-02-01T03:13:53.835Z',
    '2020-04-21T23:10:31.435Z',
    '2020-06-08T13:15:33.035Z',
    '2020-07-26T12:01:20.0894Z',
  ],
  locale: 'de-DE',
  currency: 'EUR',
  interestRate: 1.5, //%
  pin: 2222,
};

const account3 = {
  owner: 'Steven Kakooza Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -4600],
  movementsDates: [
    '2025-11-01T21:13:33.235Z',
    '2025-12-30T09:42:16.867Z',
    '2026-01-25T06:04:33.904Z',
    '2026-02-01T06:15:24.335Z',
    '2026-02-14T03:13:43.185Z',
    '2026-03-18T23:10:17.435Z',
    '2026-03-24T22:15:33.735Z',
    '2026-03-25T12:01:36.0894Z',
  ],
  locale: 'en-US',
  currency: 'USD',
  interestRate: 0.7, //%
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 500, 90],
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-01T13:15:33.035Z',
    '2020-02-01T03:13:53.835Z',
    '2020-04-21T23:10:31.435Z',
    '2020-06-08T13:15:33.035Z',
    '2020-07-26T12:01:20.0894Z',
  ],
  locale: 'de-DE',
  currency: 'EUR',
  interestRate: 1, //%
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

//Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');

const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// ..............Intl API .............. //
const formatMovementDates = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);
  if (daysPassed === 0) {
    return 'Today';
  }
  if (daysPassed === 1) {
    return 'Yesterday';
  }
  if (daysPassed <= 7) {
    return `${daysPassed} days ago`;
  }
  // else {
  //   const day = `${date.getDate()}`.padStart(2, 0);
  //   const month = `${date.getMonth()}`.padStart(2, 0);
  //   const year = date.getFullYear();
  //   return `${day}/ ${month}/ ${year}`;
  // }

  return new Intl.DateTimeFormat(locale).format(date);
};

const currencyFormatter = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDates(date, acc.locale);

    const formattedMov = currencyFormatter(mov, acc.locale, acc.currency);

    const html = `
      <div class="movements__row">

        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov} </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = currencyFormatter(
    acc.balance,
    acc.locale,
    acc.currency
  );
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);

  labelSumIn.textContent = currencyFormatter(incomes, acc.locale, acc.currency);

  const outs = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov, i, arr) => acc + mov, 0);

  labelSumOut.textContent = currencyFormatter(
    Math.abs(outs),
    acc.locale,
    acc.currency
  );

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .reduce((acc, int) => acc + int, 0);

  labelSumInterest.textContent = currencyFormatter(
    interest,
    acc.locale,
    acc.currency
  );
};

// Adding an element in the accounts which is the short form of their names.
const createShortForm = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

createShortForm(accounts);

//UI Update
const updateUI = function (acc) {
  //Display movements
  displayMovements(acc);

  //Display balance
  calcDisplayBalance(acc);

  //Display summary
  calcDisplaySummary(acc);
};

//Logout timer functionality
const startLogoutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    //In each call, print remaining time to UI
    labelTimer.textContent = `${min}: ${sec}`;

    //Stopping timer and logging out user when 0 seconds
    if (time == 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }
    //Keep decreasing time by 1 second
    time--;
  };
  //set time to 5 minutes
  let time = 120; //for testing

  //call timer every second
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};

// Implementing the login
let currentAccount, timer;
btnLogin.addEventListener('click', function (e) {
  //Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === +inputLoginPin.value) {
    //Display welcome message
    labelWelcome.textContent = `Welcome back ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    //Activating and adding dates
    //Experimenting the INTL API for dates specifically

    const now = new Date();

    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      // weekday: 'long',
    };
    // const locale = navigator.language;  //GETS DATE FROM BROWSER
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);
    // const day = `${now.getDate()}`.padStart(2, 0);
    // const month = `${now.getMonth()}`.padStart(2, 0);
    // const year = `${now.getFullYear()}`;
    // const hour = `${now.getHours()}`.padStart(2, 0);
    // const min = `${now.getMinutes()}`.padStart(2, 0);

    // labelDate.textContent = `${day}/ ${month}/ ${year}, ${hour}:${min}`;

    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    //Timer rectification on logout
    if (timer) clearInterval(timer);
    timer = startLogoutTimer();

    //updating user interface
    updateUI(currentAccount);
  }
});

//Button transfer

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiveAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  inputTransferAmount.value = inputTransferTo.value = '';
  inputTransferTo.blur();
  if (
    amount > 0 &&
    receiveAcc &&
    currentAccount.balance >= amount &&
    receiveAcc.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    receiveAcc.movements.push(amount);

    //Add transfer Date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiveAcc.movementsDates.push(new Date().toISOString());

    //updating UI
    updateUI(currentAccount);

    //Restart timer
    clearInterval(timer);
    timer = startLogoutTimer();
  }
});

//Requesting for a loan

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function () {
      //Add to movements
      currentAccount.movements.push(amount);

      //Add Loan Date
      currentAccount.movementsDates.push(new Date().toISOString());

      updateUI(currentAccount);
    }, 2500);
  }
  inputLoanAmount.value = '';
});

//Closing an account
btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );

    //Delete Account
    accounts.splice(index, 1);

    //Hide UI
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
  inputClosePin.blur();

  //Restart timer
  clearInterval(timer);
  timer = startLogoutTimer();
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();

  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
////////////////// .......... LECTURES ............. ////////////////////

// const curencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// ////////////////// .......... ForEach ARRAYS ............. ////////////////////
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// //for of
// for (const movement of movements) {
//   if (movement > 0) {
//     console.log(`You deposited ${movement}`);
//   } else {
//     console.log(`You withdrew ${Math.abs(movement)}`);
//   }
// }

// //forEach
// movements.forEach(function (movement) {
//   if (movement > 0) {
//     console.log(`You deposited ${movement}`);
//   } else {
//     console.log(`You withdrew ${Math.abs(movement)}`);
//   }
// });

// //Counter variable
// for (const [i, mov] of movements.entries()) {
//   if (mov > 0) {
//     console.log(`Transfer ${i + 1}: You deposited ${mov}`);
//   } else {
//     console.log(`Transfer ${i + 1}: You withdrew ${Math.abs(mov)}`);
//   }
// }

// movements.forEach(function (mov, i, array) {
//   if (mov > 0) {
//     console.log(`Transfer ${i + 1}: You deposited ${mov}`);
//   } else {
//     console.log(`Transfer ${i + 1}: You withdrew ${Math.abs(mov)}`);
//   }
// });

// ////////////////// .......... ForEach MAPS ............. ////////////////////
// const curencies1 = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const err2 = curencies1.forEach(function (value, key, map) {
//   console.log(`${key}: ${value}`);
// })

// const currencies2 = new Set(['USD', 'GBP', 'USD', 'EUR',]);
// console.log(currencies2);
// currencies2.forEach(function (value, _, map) {
//   console.log(`${value}; ${value}`);
// })

//////////////// .......... First coding challenge ............. //////////////////

// const julia = [3, 5, 2, 12, 7];
// const kate = [4, 1, 15, 8, 3];
// //create a function which takes -arrays of dog's ages
// const dogAges = function (dogsJulia, dogsKate) {
//   const juliaCopy = dogsJulia.slice(1, -2);
//   const onlyDogs = [...juliaCopy, ...dogsKate];

//   onlyDogs.forEach(function (dogN, i, array) {
//     if (dogN >= 3) {
//       console.log(`Dog at position ${i + 1} is an adult`);
//     } else {
//       console.log(`Dog at position ${i + 1} is a puppy`);
//     }
//   });
// };
// dogAges(julia, kate);

// ////////////////// .......... MAP, FILTER REDUCE ............. ////////////////////
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// eurToUSD = 2 * movements;

// const movementUSD = movements.map(function (mov) {
//   return mov * eurToUSD;
// });

// console.log(movementUSD);

//The map works as the forEach method though it returns a new array
//without tempering the old one promoting functional programming.

// const movUSD = movements.map(mov => 2 * eurToUSD);
// console.log(movUSD);

//The filter returns an array of the values that meet a defined condition
// const witd = movements.filter(mov => mov < 0);
// console.log(witd);

//Reduce which takes in two arguments, a function and an initial accumulator value.
//Accumulator, acc is the sum
// const balance = movements.reduce(function (accum, currValue, i, arr) {
//   console.log(`Iteration ${i + 1}: ${currValue}: ${accum}`);
//   return accum + currValue;
// }, 0);

// console.log(balance);

///////////////////........OR........./////////////////
// const balance5 = movements.reduce((accum, curVal) => accum + curVal);
// console.log(balance5);

// const julia = [3, 5, 2, 12, 7];
// const kate = [4, 1, 15, 8, 3];

// //Create a function that accepts an array of dog ages
// const calcAverageHumanAge = function (dogAge) {
//   // Calculate the dog age in human years
//   const humanAge = dogAge.map(dogAge =>
//     dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4
//   );
//   console.log(humanAge);
// };
// calcAverageHumanAge(julia);

// const eurToUSD = 1.1;
// console.log(movements);

// const totalDepositUSD = movements
//   .filter(mov => mov > 0)
//   .map(mov => mov * eurToUSD)
//   .reduce((acc, mov) => acc + mov, 0);

// console.log(totalDepositUSD);

///////////////////........FIND........./////////////////
//The find method returns the first element in an array which satidfies a given condition
//making it different from filter which returns a new array with all elements which
//meat the defined condition

// const firstWithdrawal = movements.find(mov => mov < 0);
// console.log(movements);
// console.log(firstWithdrawal);

// console.log(accounts);
// const givenAccount = accounts.find(acc => acc.owner === 'Jessica Birunji');
// console.log(givenAccount);

// const findAccount = function () {
//   for (const acc of accounts) {
//     if (acc.owner === 'Jessica Birunji') {
//       console.log(acc);
//     }
//   }
// };
// findAccount();

//Inlcude returns a boolean for an checked value exixtence in the equality form
// console.log(movements.includes(-650));

///////////////////........Some and Every........./////////////////
// //Some returns a boolean for a condition
// const anyDeposits = movements.some(mov => mov > 980);
// console.log(anyDeposits);

//Every returns a boolean if all values in an array satisfy the condition
// console.log(movements.every(mov => mov > 0));
// console.log(account4.movements.every(mov => mov > 0));

///////////////////........ Sorting ........./////////////////
//Strings
// const owners = ['Vincent', 'Sarah', 'Zach', 'Hellen', 'Mathias', 'Anabel'];

// console.log(owners.sort());

//Numbers => this doesn't give the expected output since it bases on strings
// console.log(movements);

//return < 0; a, b => keep order
//return > 0; b, a => switch order

//Ascending
// movements.sort((a, b) => {
//   if (a > b) return 1;
//   if (a < b) return -1;
// });

// //    OR
// movements.sort((a, b) => a - b);
// console.log(movements);

// //Descending
// movements.sort((a, b) => {
//   if (a > b) return -1;
//   if (a < b) return 1;
// });
// console.log(movements);

// // OR

// movements.sort((a, b) => b - a);
// console.log(movements);

///////////////////........ Challenge #4 ........./////////////////
//Test Data

// const dogs = [
//   {
//     weight: 22,
//     curFood: 250,
//     owners: ['Alice', 'Bob'],
//   },
//   {
//     weight: 8,
//     curFood: 200,
//     owners: ['Matilda'],
//   },
//   {
//     weight: 13,
//     curFood: 275,
//     owners: ['Sarah', 'John'],
//   },
//   {
//     weight: 32,
//     curFood: 340,
//     owners: ['Micheal'],
//   },
// ];

// const pushedDog = dogs.forEach(function (dog) {
//   const doggy = dog.weight ** 0.75 * 28;
//   dog.recommendedFood = Math.floor(doggy);
// });
// // console.log(dogs);
// const sarahDog = dogs.find(function (dog) {
//   if (dog.owners.includes('Sarah')) {
//     if (dog.weight >= dog.recommendedFood) {
//       console.log(`Sarah's dog eats too much`);
//     } else {
//       // console.log(`Sarah's dog eats little`);
//     }
//   }
// });

// const ownersEatTooMuch = [];
// const ownersEatTooLittle = [];
// const ownersRecommendedFood = [];

// dogs.forEach(function (dog) {
//   if (dog.curFood >= dog.recommendedFood) {
//     ownersEatTooMuch.push(...dog.owners);
//   } else {
//     ownersEatTooLittle.push(...dog.owners);
//   }
// });
// console.log(`Owners that have dogs who eat too much are ${ownersEatTooMuch}`);
// console.log(
//   `Owners that have dogs who eat too little are ${ownersEatTooLittle}`
// );

// // dogs.forEach(dog => (dog.curFood === dog.recommendedFood ? true : false));
// const exact = dogs.some(function (dog) {
//   if (dog.curFood === dog.recommendedFood) {
//     return 'true';
//   }
// });
// console.log(exact);

///////////////////........ Dates ........./////////////////
// const nowA = new Date();
// console.log(nowA);
// // console.log(new Date(account1.movementsDates[0]));

// const future = new Date(2037, 10, 19, 15, 23);

// console.log(future);
// console.log(future.getFullYear());
// console.log(future.getMonth());
// console.log(future.getDate());
// console.log(future.getDay());
// console.log(future.getHours());
// console.log(future.getMinutes());
// console.log(future.getSeconds());
// console.log(future.toISOString());
// console.log(Date.now());
// console.log(new Date(1774343069275));

// future.setFullYear(2040);
// console.log(future);

// ///////////////////........ SetTimeOut ........./////////////////
// Executes after a defined TimeRanges, eg after 5seconds as below

// const ingredients = ['olives', 'spinach'];

// const pizzaTimer = setTimeout(
//   (ing1, ing2) => console.log(`Here isyour pizza with ${ing1} and ${ing2}`),
//   5000,
//   ...ingredients
// );

// ///////////////////........ SetInterval ........./////////////////
// Its a countedown  clock

// setInterval(function () {
//   const nowC = new Date();
//   console.log(now);
// }, 3000);
