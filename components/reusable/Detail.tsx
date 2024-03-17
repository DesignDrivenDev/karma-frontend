import React from 'react'

type Props = {
  name: string,
  value: string | number,
};

function Detail({ name, value }: Props) {
  return (
    <h4 className=''><span className='font-bold'>{name}: </span> {value}</h4>
  )
}

export default Detail