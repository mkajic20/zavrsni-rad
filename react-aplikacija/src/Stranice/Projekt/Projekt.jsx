import React from 'react'
import { useParams } from 'react-router-dom';

export const Projekt = () => {
    const { id } = useParams();
  return (
    <div>Projekt {id}</div>
  )
}
