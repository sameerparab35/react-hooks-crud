import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';


import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const ReactTable = (props) => {
    const [posts, setPosts] = useState([]);
    const gridRef = useRef(null);

    useEffect(() => {
        retirvePosts();
    }, []);

    const rowData = posts;

    const retirvePosts = () => {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(res => {
                console.log(res);
                setPosts(res.data);
            }).catch(err => {
                console.log(err);
            })
    }

    const openPost = (id) => {
        props.history.push("/table/" + id);
    }

    const deletePost = (rowIndex) => {
        let postId = posts[rowIndex].id;
        axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`)
            .then(res => {
                console.log(res);
                props.history.push('/table');

                // remove post locally
                let newPosts = [...posts];
                newPosts.splice(rowIndex, 1);

                setPosts(newPosts);

            }).catch(err => {
                console.log(err);
            })

    }

    const onButtonClick = e => {
        e.preventDefault();
        const selectedNodes = gridRef.current.api.getSelectedNodes()
        const selectedData = selectedNodes.map(node => node.data)
        const selectedDataStringPresentation = selectedData.map(node => `${node.id} - ${node.title}`).join(', ')
        alert(`Selected nodes: ${selectedDataStringPresentation}`)
    }

    const staticCellStyle = { color: 'black', 'background-color': 'yellow' };
    const bodySize = { minWidth: '500px' };

    return (
        <div>

            {/* <ul>{
                posts.map(post => (
                    <li key={post.id}>{post.title}</li>
                ))
            }
            </ul> */}

            <div className="ag-theme-alpine" style={{ height: 400 }}>
                <button onClick={onButtonClick}>Get selected rows</button>
                <AgGridReact rowData={rowData} ref={gridRef} rowSelection="multiple">
                    <AgGridColumn field="id" checkboxSelection={true} cellStyle={staticCellStyle}></AgGridColumn>
                    <AgGridColumn field="userId"></AgGridColumn>
                    <AgGridColumn field="title" sortable={true}></AgGridColumn>
                    <AgGridColumn field="body" filter={true} cellStyle={bodySize}></AgGridColumn>
                </AgGridReact>
            </div>

        </div>
    )

}

export default ReactTable;