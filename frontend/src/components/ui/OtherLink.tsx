import { ReactElement } from 'react';

const OtherLink = (props: { url: string, className?: string, divClassName?: string }): ReactElement => {
  return (
    <a href={props.url} target="_blank" className={`block ${props.divClassName} bg-pink-100 rounded-lg`}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.0" stroke="currentColor" className={`${props.className}`}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
      </svg>
    </a>
  )
}

export default OtherLink;