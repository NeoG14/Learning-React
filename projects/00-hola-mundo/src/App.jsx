import { Fragment } from 'react'
import './App.css'
import { TwitterFollowCard } from './TwitterFollorCard'

export function App (){

    return (
        <section className='App'>
        <TwitterFollowCard username={"Soya"}>
            Nicola Alvarez
        </TwitterFollowCard>
        
        <TwitterFollowCard username={"SoyIo"}>
            Cristian Hweksr
        </TwitterFollowCard>
        </section>
    )
}