import React, { useRef, useState } from "react";
import useResponsiveClasses from "../hooks/useResponsiveClasses";


function AddMaterials({ replacement , user }){
    const {form, setForm} = useState({
        supplier: '',
        type: '',
        name: '',
        unit_cost: 0,
        total_quantity: 0
    })
    const shortRefs = useRef([]);
    const longRefs = useRef([]);
    const {sugestions , setSugestions} = useState({
        supplier:  [],
        supplierFlag: false,
        supplierEventExist: false,
        type: [],
        typeFlag: false,
        typeEventExist: false
    })
    const selections ={
        heading: document.querySelector('.form-wrap h3'),
        type: document.querySelector('#type'),
        supplier: document.querySelector('#supplier'),
        name: document.querySelector('#name'),
        total_quantity: document.querySelector('#total_quantity'),
        unit_cost: document.querySelector('#unit_cost'),
        container: (value) => {return document.querySelector(`#${value}_sugestion`)},
        button: (value) => {return document.querySelector(`.quick-btn.${value}`)}
    }

    useResponsiveClasses([
        {
            elements: shortRefs.current.filter(Boolean),
            className: 'short',
            maxWidth: 600
        },
        {
            elements: longRefs.current.filter(Boolean),
            className: 'long',
            maxWidth: 600
        }
    ]);

    function handleChange(e, pin ){
        replacement(e, pin);
        setForm({ ...form, [e.target.id]: e.target.value})

        if (e.target.id==='supplier' || e.target.id==='type'){
            handleSugestions(e.target)
        }
    }

    function handleSubmit(e){
        e.preventDefault();

        fetch('http://127.0.0.1:8000/materials/general/', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${user.Token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        })
        .then( res => res.json())
        .then(data => {
            if( data.message === 'Saved'){
                selections.heading.textContent = 'Add More Items';
                selections.name.value = '';
                selections.supplier.value = '';
                selections.total_quantity.value = '';
                selections.type.value = '';
                selections.unit_cost.value = '';
            }
        })
        .catch(error => console.error(error))
    }

    function handleSugestions(el) {
        if (el.value.trim()===""){
            selections.container(el.id).innerHTML = '';
            selections.button(el.id).style.display = 'none';
        }

        if (!sugestions[`${el.id}Flag`]){
            fetch(`http://127.0.0.1:8000/materials/${el.id}`, {
                method: 'GET',
                headers:{
                    'Authorization': `Bearer ${user.token}`,
                    'content-Type': 'application/json'
                }
            })
            .then(res => res.json)
            .then(data => {
                setSugestions({ ...sugestions, [el.id]: data})
                setSugestions({ ...sugestions, [`${el.id}Flag`]: true})
            })
            .catch(error => console.error(error))
            selections.container(el.id).innerHTML = '';
        }

        if (sugestions[el.id].length > 0){
            sugestions[el.id].forEach(item => {
                const div = document.createElement('div');
                div.textContent = item.name;
                div.onclick = () => {
                    el.value = item.value;
                    el.textContent = item.id;
                    selections.container(el.id).innerHTML = '';
                    selections.button(el.id).style.display = 'none';
                };
                selections.container(el.id).appendChild(div);
            })
            selections.button(el.id).style.display = selections.container(el.id).textContent.includes(el.value.Trim())? 'none':'flex';
        } else {
            selections.button(el.id).style.display = 'flex';
        }

        if (!sugestions[`${el.id}EventExist`]){
            selections.button(el.id).addEventListener('click',()=>{
                if (el.value==='') return;

                fetch(`http://127.0.0.1:8000/materials/${el.id}/`,{
                method: 'POST',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization': `Bearer ${user.token}` },
                body: JSON.stringify({name:el.value})
                });
                el.dispatchEvent(new Event('input'));
            });
            setSugestions({ ...sugestions, [`${el.id}EventExist`]:true});
        }


    }

    return (
        <div className="container">
            <div className="heading container">
                <div className="row placing">
                    <h2>Add Materials to Stock</h2>
                    <hr />
                </div>
            </div>
            <div className="form-space">
                <div className="form-boundary add-material" >
                    <div className="form-wrap">
                        <h3>Record items as soon as possible</h3>
                        <form id="add-form" onSubmit={(e) => handleSubmit(e)} className="add-mat-form">
                            <div className="form-item lbl">
                                <label id="sources">Supplier name:</label>
                                <span style={{float: 'right', marginRight: '47px', fontSize: '17px'}} >Click at the end to add new supplier if not in List</span>
                            </div>
                            <div className="form-item">
                                <input id="supplier" type="text" className="form-items" autoComplete="off" aria-labelledby="sources" placeholder="Supplier" required onChange={(e) => handleChange(e,1)}/>
                                <div id="supplier_sugestions" className="dropdown"></div>
                                <div className="quick-btn supplier" ><span>{' + '}</span></div>
                            </div>
                            <div style={{margin: '12px', height: '24px'}} className="form-item lbl">
                                <label id="products">Product:</label>
                            </div>
                            <div className="form-item short" ref={(el) => (shortRefs.current[0]=el)}>
                                <input id="type" type="text" className="form-items" autoComplete="off" aria-labelledby="products" placeholder="Product Type" required onChange={(e) => handleChange(e,1)}/>
                                <div id="type_sugestions" className="dropdown"></div>
                                <div className="quick-btn type"><span>{' + '}</span></div>   
                            </div>
                            <div style={{float: 'inline-end'}} className="form-item long" ref={(el) => (longRefs.current[0]=el)} >
                                <input id="name" type="text" className="form-items" aria-labelledby="products" placeholder="Product name" required onChange={(e) => handleChange(e,1)}/>
                            </div>
                            <div className="form-item lbl">
                                <label id="details">Purchase details:</label>
                            </div>
                            <div className="form-item long" ref={(el) => (longRefs.current[1]=el)}>
                                <input id="unit_cost" type="number" className="form-items" aria-labelledby="details" placeholder="Cost per Item" required onChange={(e) => handleChange(e,6)}/>
                            </div>
                            <div className="form-item short" ref={(el) => (shortRefs.current[1]=el)}>
                                <input id="total_quantity" type="number" className="form-items" aria-labelledby="detials" placeholder="Number of Items Bought" required onChange={(e) => handleChange(e,6)}/>
                            </div>
                            <div className="form-item">
                                <button className="form-items btn" type="submit" >Add Record</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default AddMaterials;