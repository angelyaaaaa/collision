import { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

const App = () => {

    const [rowDatas, setRowDatas] = useState([]);
    const [kVar, setkVar] = useState(3);
    const [collisonList, setCollisonList] = useState([]);

    const handleAddButtonClick = () => {
        setRowDatas([...rowDatas, '']);
        // setCollisonList([...collisonList, new Set()]);
    }

    const createRow = () => {
        const handleRowChange = (idx) => {
            return (e) => {
                const newRowDatas = [...rowDatas];
                newRowDatas[idx] = e.target.value;
                setRowDatas(newRowDatas);
            }
        }
        const handleRowDelete = (idx) => {
            return (e) => {
                setRowDatas([...rowDatas.slice(0, idx), ...rowDatas.slice(idx+1)]);
                // setCollisonList([...collisonList.slice(0, idx), ...collisonList.slice(idx + 1)])
            }
        }
        return rowDatas.map((item, idx) => {
            // return <div> {idx} </div>
            return (
                <div>
                    <span style={{ color: 'red'}}>{idx}</span>
                    <input type="text" onChange={handleRowChange(idx)} />
                    <button onClick={handleRowDelete(idx)}>delete ME</button>
                    <span style={{ border: '1px solid green' }}>{collisonList[idx]}</span>
                    <span style={{ border: '1px solid blue' }}>{''}</span>
                </div>
            )
        }) 
    }

    useEffect(() => {
        
        // const displayColliding = () => {
        //     // generate avalible arr -> ABC / BCD 
        //     resultArr = dataArr.map((item) => {
        //         const leng = item.length;
        //         if (leng < k) { return }
        //         let target = leng - k;
        //         let arr = [];
        //         for (let index = 0; index < target; index++) {
        //             const element = array[index];
        //             // item.slice() ....

        //             arr.push(item.slice());
        //         }

        //         return arr;
        //     })

        //     // [[ABC, BCD], [FDS], [BCD]]    

        //     // totest 
        // }
        // displayColliding();

        const colliding = () => {
            // const collisionList = new Array(rowDatas.length).fill(new Set());
            const collisionList = rowDatas.map(() => new Set());
            rowDatas.forEach((data, rowIdx) => {
                rowDatas.forEach((testData, testIdx) => {
                    if (testIdx === rowIdx || !data || !testData ) { return }
                    if (data.indexOf(testData) !== -1 || testData.indexOf(data) !== -1) {
                        collisionList[rowIdx].add(testIdx);
                        collisionList[testIdx].add(rowIdx);
                    }
                })
            });
            setCollisonList(collisionList);
        }
        colliding();

    }, [JSON.stringify(rowDatas), kVar]);

    return (
        <div className="App">
            <button onClick={handleAddButtonClick}>Add Button</button>
            <label for="kVar">k var: </label>
            <input type="text" id="kVar" value={kVar} onChange={(e) => { setkVar(+e.target.value) }}/>
            {createRow()}
        </div>
    );
}

export default App;
