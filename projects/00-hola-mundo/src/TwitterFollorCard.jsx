import { useState } from "react"

export function TwitterFollowCard({ children, username }) {
    // const state = useState(false)
    // const isFollowing = state[0]
    // const setIsFollowing = state[1]

    // = lesto es equivalente a lo de arriba
    const [isFollowing,setIsFollowing] = useState(false);
    
    const text = isFollowing ? 'Siguiendo' : 'Seguir'
    const buttonClassName = isFollowing 
    ? 'tw-follow-card-button is-following'
    : 'tw-follow-card-button'

    const handleClick = () => {
        setIsFollowing(!isFollowing)
    }

    return (
        <article className='tw-follow-card'>
            <header className='tw-follow-card-header'>
               <img 
                className='tw-follow-card-avatar'
                src={`https://unavatar.io/${username}?ttl=1h`} alt="avatar" /> 
                <div className='tw-follow-card-info'>
                   <strong>{children}</strong> 
                   <span className='tw-follow-card-info-username'>@{username}</span>
                </div>
            </header>

            <aside>
                <button className={buttonClassName} onClick={handleClick}>
                    <span className='tw-follow-card-text'>{text}</span>
                    <span className='tw-follow-card-stopFollow'>Dejar de seguir</span>
                </button>
            </aside>
        </article>
    )
}