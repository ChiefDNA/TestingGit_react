import React, { useEffect, useState } from 'react';



function Materials({ user }){
    const [materials, setMaterials] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [entriesPerPage, SetEntriesPerPage] = useState(10);

    const token = user?.token;

    useEffect(() => {
        if (token) {
            fetch('http://127.0.0.1:8000/materials/general/', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => setMaterials(data))
            .catch(console.error)
        }
    },[token]);

    const totalPages = Math.ceil(materials.length / entriesPerPage);
    const start = (currentPage -1) * entriesPerPage;
    const end = start + entriesPerPage;
    const currentMateriials = materials.slice(start, end);

    return (
        <div className='container left'>
            <div className='heading container'>
                <h2>Materials Purchase History</h2>
                <hr />
            </div>
            <div className='table-space'>
                <div className='table-boundary history'>
                    <div className='table-wrap'>
                        <table className='mat-table'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>TYPE</th>
                                    <th>NAME</th>
                                    <th>SUPPLIER</th>
                                    <th>UNIT COST</th>
                                    <th>TOTAL QUANTITY</th>
                                    <th>ADDED BY</th>
                                    <th>DATE ADDED</th>
                                </tr>
                            </thead>
                            <tbody className='table-entries'>
                                {currentMateriials.map((item, index) => (
                                    <tr key={index}>
                                        {Object.values(item).map((value, idx) => (
                                            <td key={idx}>{value}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className='table-controls'>
                        <label>
                            Show{' '}
                            <select 
                                id="entries-per-page"
                                value={entriesPerPage}
                                onChange={(e) => {
                                    SetEntriesPerPage(Number(e.target.value));
                                    setCurrentPage(1);
                                }}
                                >
                                {[10, 15, 20, 30, 50, 100].map(size => (
                                    <option key={size} value={size}>{size}</option>
                                ))}        
                            </select>{' '}
                            entries per page 
                        </label>
                        <div className='pagination'>
                            <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>&lt;</button>
                            <span>
                                Page{' '}
                                <select 
                                value={currentPage}
                                onChange={(e) => setCurrentPage(Number(e.target.value))} >
                                    {Array.from({length: totalPages }, (_, i) => i + 1).map(p => (
                                        <option key={p} value={p}>{p}</option>
                                    ))}
                                </select> {' '}
                                of {totalPages}
                            </span>
                            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>&gt;</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Materials;