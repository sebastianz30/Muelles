import { useState, useRef, useEffect } from 'react'
import classNames from 'classnames'

// CSS
import styles from './inputs.module.sass'

// Utils
import { allowedTypes } from './utils'

const Input = ({
  className,
  defaultValue,
  disabled,
  error,
  getValue,
  name,
  placeholder,
  showPassword,
  type,
  id,
  maxLength,
  disabledLabel,
  ...rest
}) => {
  const itsAllowed = allowedTypes.some(tp => tp === type?.toLowerCase())
  const passwordType = type === 'password'

  const inputRef = useRef()
  const [selected, setSelected] = useState(false)
  const [value, setValue] = useState('')

  const containerClasses = classNames({
    [styles.wrapper]: true,
    [styles.focus]: selected && !error,
    [styles.disabled]: disabled,
    [styles.error]: error,
    [className]: className
  })

  const spanClasses = classNames({
    [styles.label]: true,
    [styles.move]: selected || value,
    [styles.placeholder]: !selected && !value,
    [styles.noLabel]: disabledLabel && (selected || value)
  })

  const updateInput = () => {
    if (defaultValue) {
      !disabled && setSelected(true)
      setValue(defaultValue)
    }
    if (!defaultValue) {
      !disabled && setSelected(false)
      setValue('')
    }
  }

  useEffect(updateInput, [disabled, defaultValue])
  
  return (
    <>
      {itsAllowed && (
        <div className={containerClasses}>
          <span className={spanClasses} onClick={() => inputRef?.current?.focus()}>
            {error || placeholder}
          </span>
          <input
            aria-label={placeholder}
            id={id}
            disabled={disabled}
            ref={inputRef}
            type={showPassword && passwordType ? 'text' : type}
            onFocus={() => !disabled && setSelected(true)}
            onBlur={() => !disabled && setSelected(false)}
            max={maxLength}
            onChange={e => {
              if (maxLength <= e.target.value?.length) return
              !disabled && getValue && getValue({ key: name, value: e.target.value })
              !disabled && setValue(e.target.value)
            }}
            {...{ value }}
            {...rest}
          />
        </div>
      )}
      {!itsAllowed && <span>Ops! It is not supported :(</span>}
    </>
  )
}

Input.defaultProps = {
  className: '',
  defaultValue: null,
  disabled: false,
  error: null,
  getValue: null,
  name: 'input',
  placeholder: 'Placeholder',
  showPassword: false,
  type: 'text'
}

export default Input
