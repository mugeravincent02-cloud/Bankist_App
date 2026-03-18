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
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 85000, -30],
  interestRate: 1.5, //%
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
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
const labelBalance = document.querySelector('.balance-value');
const labelSumIn = document.querySelector('.summary_value--in');
const labelSumOut = document.querySelector('.summary_value--out');
const labelSumInterest = document.querySelector('.summary_value--interest');
const labelTime = document.querySelector('.timmer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login_btn');

const btnTransfer = document.querySelector('.form_btn--transfer');
const btnLoaon = document.querySelector('.form_btn--loan');
const btnClose = document.querySelector('.form_btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login_input--user');
const inputLoginPin = document.querySelector('.login_input--pin');
const inputTransferTo = document.querySelector('.form_input--to');
const inputTransferAmount = document.querySelector('.form_input--amount');
const inputLoanAmount = document.querySelector('.form_input--loan-amount');
const inputCloseUsername = document.querySelector('.form_input--user');
const inputClosePin = document.querySelector('.form_input--pin');

const displayMovements = function (movements) {
  containerMovements.innerHTML = '';

  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
      <div class="movements__row">

        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">${mov}</div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
displayMovements(account1.movements);

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

const julia = [3, 5, 2, 12, 7];
const kate = [4, 1, 15, 8, 3];
//create a function which takes -arrays of dog's ages
const dogAges = function (dogsJulia, dogsKate) {
  const juliaCopy = dogsJulia.slice(1, -2);
  const onlyDogs = [...juliaCopy, ...dogsKate];

  onlyDogs.forEach(function (dogN, i, array) {
    if (dogN >= 3) {
      console.log(`Dog at position ${i + 1} is an adult`);
    } else {
      console.log(`Dog at position ${i + 1} is a puppy`);
    }
  });
};
dogAges(julia, kate);
