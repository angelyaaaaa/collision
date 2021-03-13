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
                <div id={`row${idx}`} className="row" key={idx}>
                    <span style={{ color: 'red'}}>{idx}</span>
                    <input type="text" onChange={handleRowChange(idx)} value={rowDatas[idx]}/>
                    <button className="deleteBtn" onClick={handleRowDelete(idx)}>delete ME</button>
                    <span className="colliVal" style={{ border: '1px solid green' }}>{collisonList[idx]}</span>
                </div>
            )
        }) 
    }

    useEffect(() => {
        const colliding = () => {
            // const collisionList = new Array(rowDatas.length).fill(new Set());
            const collisionList = rowDatas.map(() => new Set());
            rowDatas.forEach((data, rowIdx) => {
                if (data.length <= kVar) { return }
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
        console.log('===', kVar, collisonList);

    }, [JSON.stringify(rowDatas), kVar]);

    return (
        <div className="App" key={123}>
            <div style={{ border: '1px solid' }}>
                <button onClick={handleAddButtonClick} id="addButton">Add Button</button>
                <div>
                    <label htmlFor="kVar">k var: </label>
                    <input type="text" id="kVar" value={kVar} onChange={(e) => { setkVar(+e.target.value) }}/>
                </div>
            </div>
            {createRow()}
        </div>
    );
}

export default App;
