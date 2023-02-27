import './index.css'
import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import Auth from './Auth'
import Account from './Account'

function Categories({data, onEdit}) {
    return (
        <Row xs={1} md={4} className="g-4">
            {data.map((cardData) => {
                return <CustomCard onEdit={onEdit} key={cardData.id} cardData={cardData}/>
            })}
        </Row>
    );
}


export default Categories;