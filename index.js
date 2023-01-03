// ⚡️ Import Styles
import './style.scss';
import feather from 'feather-icons';

// ⚡️ Render Skeleton
document.querySelector('#app').innerHTML = `
<div class='app-container'>
  <div class='calculator'>
    <h2 class='title'>Calculator</h2>
    <div class='container'>
      <div class='display'>
        <span class='h1' data-result=''>0</span>
      </div>
      <div class='body' data-body=''>
        <button class='operator' data-value='+'>+</button>
        <button class='operator' data-value='-'>-</button>
        <button class='operator' data-value='*'>×</button>
        <button class='operator' data-value='/'>÷</button>
        <button class='number' data-value='7'>7</button>
        <button class='number' data-value='8'>8</button>
        <button class='number' data-value='9'>9</button>
        <button class='number' data-value='4'>4</button>
        <button class='number' data-value='5'>5</button>
        <button class='number' data-value='6'>6</button>
        <button class='number' data-value='1'>1</button>
        <button class='number' data-value='2'>2</button>
        <button class='number' data-value='3'>3</button>
        <button class='decimal' data-value='.'>.</button>
        <button class='number' data-value='0'>0</button>
        <button class='clear' data-clear>C</button>
        <button class='equal operator' data-value='='>=</button>
      </div>
    </div>
</div>

  <a class='app-author' href='https://github.com/nagoev-alim' target='_blank'>${feather.icons.github.toSvg()}</a>
</div>
`;

// ⚡️Create Class
class App {
  constructor() {
    this.DOM = {
      result: document.querySelector('[data-result]'),
      buttonsNumber: document.querySelectorAll('.number'),
      buttonsOperator: document.querySelectorAll('.operator'),
      buttonDecimal: document.querySelector('.decimal'),
      buttonParent: document.querySelector('[data-body]'),
      buttonClear: document.querySelector('[data-clear]'),
    };

    this.PROPS = {
      startedValue: 0,
      operatorValue: '',
      nextValue: false,
      calculate: {
        '/': (firstNumber, secondNumber) => this.strip(firstNumber / secondNumber),
        '*': (firstNumber, secondNumber) => this.strip(firstNumber * secondNumber),
        '+': (firstNumber, secondNumber) => this.strip(firstNumber + secondNumber),
        '-': (firstNumber, secondNumber) => this.strip(firstNumber - secondNumber),
        '=': (firstNumber, secondNumber) => this.strip(secondNumber),
      },
    };

    this.DOM.buttonsNumber.forEach(btn => btn.addEventListener('click', this.setValues));
    this.DOM.buttonsOperator.forEach(btn => btn.addEventListener('click', this.useOperator));
    this.DOM.buttonDecimal.addEventListener('click', this.useDecimal);
    this.DOM.buttonClear.addEventListener('click', this.onReset);
  }

  /**
   * @function onReset - Reset calculator values
   */
  onReset = () => {
    this.PROPS.startedValue = 0;
    this.PROPS.operatorValue = '';
    this.PROPS.nextValue = false;
    this.DOM.result.textContent = '0';
  };

  /**
   * @function setValues - Set values
   * @param number
   */
  setValues = ({ target: { textContent: number } }) => {
    if (this.PROPS.nextValue) {
      this.DOM.result.textContent = number;
      this.PROPS.nextValue = false;
    } else {
      const tmpValue = this.DOM.result.textContent;
      this.DOM.result.textContent = tmpValue === '0' ? number : tmpValue + number;
    }
  };

  /**
   * @function useOperator - Operator buttons event handler
   * @param operator
   */
  useOperator = ({ target: { dataset: { value: operator } } }) => {
    const currentValue = Number(this.DOM.result.textContent);

    if (this.PROPS.operatorValue && this.PROPS.nextValue) {
      this.PROPS.operatorValue = operator;
      return;
    }

    if (!this.PROPS.startedValue) {
      this.PROPS.startedValue = currentValue;
    } else {
      const calculation = this.PROPS.calculate[this.PROPS.operatorValue](this.PROPS.startedValue, currentValue);
      this.DOM.result.textContent = calculation;
      this.PROPS.startedValue = calculation;
    }

    this.PROPS.nextValue = true;
    this.PROPS.operatorValue = operator;
  };

  /**
   * @function useDecimal - Decimal button event handler
   */
  useDecimal = () => {
    if (this.PROPS.nextValue) return;

    if (!this.DOM.result.textContent.includes('.')) {
      this.DOM.result.textContent = `${this.DOM.result.textContent}.`;
    }
  };

  /**
   * @function strip - Fix JS calculate bug
   * @param number
   * @returns {number}
   */
  strip = (number) => parseFloat(number.toPrecision(12));
}

// ⚡️Class instance
new App();
