'use client'
import { type PropsWithChildren } from 'react'
import { useDispatch } from 'react-redux'

type Props = PropsWithChildren

const RootApiCalls = (props: Props) => {
   return <div>{props.children}</div>
}

export default RootApiCalls
