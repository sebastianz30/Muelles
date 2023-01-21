import { useEffect, useState } from 'react'
import Switch from 'react-switch'

// CSS
import styles from './listOfDocks.module.sass'
// components
import Input from '../Inputs'
// Utils
import { useLocalStorage } from 'src/utils/useLocalStorage'
import classNames from 'classnames'

const Docks = ({ index }) => {
  const { get, update } = useLocalStorage()
  const [dock, setDock] = useState({})
  const [edit, setEdit] = useState(false)
  const onChange = ({ key, value }) => {
    let data = { ...dock, [key]: value }
    setDock(data)
    update(`dock-${index}`, data)
  }
  const handleChange = () => {
    let data = { ...dock, checked: !dock?.checked ?? false }
    setDock(data)
    update(`dock-${index}`, data)
    const element = document.getElementById(`dock-${index}`)
    element.focus()
  }
  useEffect(() => {
    const dock = get(`dock-${index}`, true)
    setDock(dock)
  }, [get, index])

  const dockClasses = classNames({
    [styles.dock]: true,
    [styles.checked]: dock?.checked
  })

  return (
    <div className={dockClasses}>
      <label className={styles.switch}>
        <Switch onChange={handleChange} checked={dock?.checked ?? false} />
      </label>
      <div className={styles.title}>
        <Input
          placeholder={'Muelle'}
          name={'name'}
          defaultValue={dock?.name}
          getValue={onChange}
          className={styles.input}
          disabled={!edit}
        />
        <button onClick={() => setEdit(!edit)}>
          <i className='fa-solid fa-user-group' />
        </button>
      </div>
      <div className={styles.info}>
        <Input id={`dock-${index}`} placeholder={'plane'} name={'plane'} getValue={onChange} defaultValue={dock?.plane} />
      </div>
    </div>
  )
}

export default Docks
