import { useEffect, useState } from 'react'
// CSS
import styles from './nav.module.sass'
// Components
import Input from 'src/components/Inputs'
// Utils
import { useLocalStorage } from 'src/utils/useLocalStorage'

const Nav = () => {
  const { get, update, reset } = useLocalStorage()
  const [darsenas, setDarsenas] = useState(0)
  const onChange = ({ key, value }) => setDarsenas(Number(value))
  const handleConfirm = () => update('darsenas', darsenas)

  useEffect(() => setDarsenas(get('darsenas')), [get])
  return (
    <div className={styles.nav}>
      <div className={styles.wrap}>
        <Input
          placeholder={'Darsenas'}
          getValue={onChange}
          name={'darsenas'}
          defaultValue={darsenas}
          className={styles.input}
        />
        <button onClick={handleConfirm} className={styles.confirm}>
          {'Confirmar'}
        </button>
      </div>

      <button className={styles.reset}>
        {'Reset'}
      </button>
    </div>
  )
}

export default Nav
