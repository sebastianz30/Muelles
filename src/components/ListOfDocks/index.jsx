import { useEffect, useState } from 'react'
// CSS
import styles from './listOfDocks.module.sass'
// Components
import Dock from './Dock'
// Utils
import { useLocalStorage } from 'src/utils/useLocalStorage'

const ListOfDocks = () => {
  const { get, update } = useLocalStorage()
  const [darsenas, setDarsenas] = useState([])

  useEffect(() => {
    const darsenas = get('darsenas')
    setDarsenas([...Array(Number(darsenas)).keys()])
  }, [get])
  return (
    <div className={styles.listOfDocks}>
      {darsenas.map((key, idx) => (
        <Dock key={idx} {...{ index: idx }} />
      ))}
    </div>
  )
}

export default ListOfDocks
