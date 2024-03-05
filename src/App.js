import { useEffect, useState } from "react"
import { list } from './girls.js'
import classNames from "classnames"

const CARD = ({ el, cur, setCur, scroll }) => {
  return [
    <div className={classNames("girlCard", { active: el.id === cur })} onClick={() => { setCur(el.id); scroll() }}>
      <div className="imgContainer">
        <img src={el.photos[0]} style={{ objectFit: "cover", width: "100%", height: "100%" }} />
        <div className="gName__container">
          <div className="gName">
            {el.name}
          </div>
        </div>
      </div>
    </div>
  ]
}

export default ({id}) => {
  const [cur, setCur] = useState(0)
  const [curPhoto, setCurPhoto] = useState(0)
  const [girls, setGirls] = useState(list);

  const plus = () => {
    setCurPhoto(prev => (prev + 1 <= girls[cur].count - 1) ? prev + 1 : 0)
  }

  const setCurF = (id) => {
    setCur(id)
    setCurPhoto(0)
  }

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }

  useEffect(() => {
    const timer = setInterval(() => {
      plus()
    }, 3000)

    return () => clearInterval(timer);
  })

  useEffect(() => {
    const p = new URLSearchParams(window.location.search)
    let params = {}
    p.forEach((param, key) => {
      params[key] = param
    })

    if (params.id) {
      setCur(params.id)
    }
  }, [])

  return [
    <div className="app">
      <h1 className="title" id="start">С 8 марта!</h1>
      <h2 className="sub">От мальчиков 11Ф</h2>
      <div className="about">
        <div className="about__container">
          <div className="photo" onClick={() => plus()}>
            <svg className="heart" viewBox="-20 -20 370 332" width="100%">
              <pattern id="pattern" width="100%" height="100%">
                <image xlinkHref={girls[cur].photos[curPhoto]} width="100%" height="100%" preserveAspectRatio="xMidYMin slice"></image>
              </pattern>
              <path d="M0 100C0 44.7715 44.7715 0 100 0C129.867 0 156.676 13.0939 175 33.8544C193.324 13.0939 220.133 0 250 0C305.228 0 350 44.7715 350 100C350 100.213 349.999 100.426 349.998 100.638C349.999 100.758 350 100.879 350 101C350 188.5 233 301.5 176 301.5C126.98 301.5 32.8447 215.707 7.44733 137.938C2.64685 126.239 0 113.429 0 100Z" fill="url(#pattern)" />
            </svg>
          </div>
          <div className="comments">
            <div className="commentsTitle">{girls[cur].name},</div>
            {girls[cur].comments?.map(el => {
              return <div className="comment">{el}</div>
            })}
          </div>
        </div>
      </div>

      <div className="girlsList">
        <div className="girlsList__container">
          {girls.map(el => {
            return <CARD el={el} cur={cur} setCur={setCurF} scroll={scrollTop} />
          })}
        </div>
      </div>
    </div>
  ]
}