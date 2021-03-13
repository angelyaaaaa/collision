// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('init screen', () => {
//     render(<App />);

//     // const addButton = 
//     const kvarElement = screen.getByText(/k var/i);
//     expect(kvarElement).toBeInTheDocument();
// });
// test('click button', () => {
//     const a = screen.getByTestId('addButton');
//     console.log('--', a);
// });
// test('enter data', () => {});
// test('change kVar', () => {});


import React from 'react';
import ReactDOM from 'react-dom';
import { act, Simulate } from 'react-dom/test-utils';
// import Counter from './Counter';
import App from './App';

let container;

beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    act(() => {
        ReactDOM.render(<App />, container);
    });
});

afterEach(() => {
    document.body.removeChild(container);
    container = null;
});

it('should render correct kvar', () => {
    const kVarElem = container.querySelector('#kVar');
    expect(kVarElem.value).toEqual('3');
});

it('should render correct row number', () => {
    const addBtn = container.querySelector('#addButton');
    for (let index = 0; index < 3; index++) {
        addBtn.click();
        const row = container.querySelectorAll('.row');
        const rowCurrent = container.querySelector(`#row${index}`)
        expect(row.length).toEqual(index + 1);
        expect(!!rowCurrent).toBe(true);
    }
});

it('should have correct collision list', () => {
    const input = ['ABCD', 'FDS', 'ABC'];
    const output = ['2', '', '0'];
    const addBtn = container.querySelector('#addButton');

    for (let index = 0; index <= input.length; index++) {
        addBtn.click();
        const rowInput = container.querySelector(`#row${index} input`);
        rowInput.value = input[index];
        Simulate.change(rowInput)
    }

    output.forEach((item, idx) => {
        const colliVal = container.querySelector(`#row${idx} .colliVal`).textContent;
        expect(colliVal).toBe(item);
    });
});
it('should have correct collision list after changing variable k', () => {
    const kVarElem = container.querySelector('#kVar');
    kVarElem.value = 4;
    Simulate.change(kVarElem);

    const input = ['ABCD', 'FDS', 'ABC'];
    const output = ['', '', ''];
    const addBtn = container.querySelector('#addButton');

    for (let index = 0; index <= input.length; index++) {
        addBtn.click();
        const rowInput = container.querySelector(`#row${index} input`);
        rowInput.value = input[index];
        Simulate.change(rowInput)
    }

    output.forEach((item, idx) => {
        const colliVal = container.querySelector(`#row${idx} .colliVal`).textContent;
        expect(colliVal).toBe(item);
    });
});
it('',async () => {
    const input = ['ABCD', 'FDS', 'ABC'];
    // const output = ['', '', ''];
    const addBtn = container.querySelector('#addButton');

    for (let index = 0; index <= input.length; index++) {
        addBtn.click();
        const rowInput = container.querySelector(`#row${index} input`);
        rowInput.value = input[index];
        Simulate.change(rowInput)
    }

    const rowInput = container.querySelector(`#row1 .deleteBtn`);

    await act(async () => {
        Simulate.click(rowInput)
    })

    const newOutput = ['1', '0'];
    newOutput.forEach((item, idx) => {
        const colliVal = container.querySelector(`#row${idx} .colliVal`).textContent;
        expect(colliVal).toBe(item);
    });
});