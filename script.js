'use strict';
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
////////////////// .......... BANKIST APP ............. ////////////////////

//Data
const account1 = {
  owner: 'Mugera Vincent',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, //%
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Birunji',
  movements: [5000, 3400, -150, -790, -3210, -1000, 85000, -30],
  interestRate: 1.5, //%
  pin: 2222,
};

const account3 = {
  owner: 'Steven Kakooza Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -4600],
  interestRate: 0.7, //%
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 500, 90],
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
const labelTime = document.querySelector('.timmer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');

const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoaon = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements) {
  containerMovements.innerHTML = '';

  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
      <div class="movements__row">

        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">${mov} €</div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance} €`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);

  labelSumIn.textContent = `${incomes} €`;

  const outs = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov, i, arr) => acc + mov, 0);

  labelSumOut.textContent = `${Math.abs(outs)} €`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .reduce((acc, int) => acc + int, 0);

  labelSumInterest.textContent = `${interest} €`;
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
  displayMovements(acc.movements);

  //Display balance
  calcDisplayBalance(acc);

  //Display summary
  calcDisplaySummary(acc);
};

// Implementing the login
let currentAccount;
btnLogin.addEventListener('click', function (e) {
  //Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //Display welcome message
    labelWelcome.textContent = `Welcome back ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    //updating user interface
    updateUI(currentAccount);
  }
});

//Button transfer

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
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

    //updating UI
    updateUI(currentAccount);
  }
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

// curencies1.forEach(function (value, key, map``) {
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
