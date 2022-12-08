import moment from "moment"
import { useEffect } from "react"
import { useMemo } from "react"
import { useState } from "react"
import { useSelector } from "react-redux"
import "./style.scss"

const ESPList = ({ onChange = () => {} }) => {
  const keys = useSelector((state) => state.espKey.keysList)
  const [selectedKey, setSelectedKey] = useState(null)

  const computedKeys = useMemo(() => {
    if (!keys?.length) return []
    return keys.map((key) => ({
      ...key,
      validTo: moment(key.validTo).format("DD.MM.YYYY"),
      expired: moment() > moment(key.validTo),
    }))
  }, [keys])

  const changeHandler = (key) => {
    if (key.expired) return null
    setSelectedKey(key)
  }

  useEffect(() => {
    onChange(selectedKey)
  }, [selectedKey])

  return (
    <div className="ESPList">
      {computedKeys?.map((key) => (
        <div
          className={`esp-block ${key?.expired ? "expired" : ""} ${
            key?.serialNumber === selectedKey?.serialNumber ? "selected" : ""
          }`}
          key={key.serialNumber}
          onClick={() => changeHandler(key)}
        >
          <div className="row">
            <span className="label">ИНН/ПИНФЛ: </span>
            <span className="value">{key.TIN}</span>
          </div>

          {key.O ? (
            <div className="row">
              <span className="label">Организация: </span>
              <span className="value">{key.O}</span>
            </div>
          ) : null}

          <div className="row">
            <span className="label">Ф.И.О.: </span>
            <span className="value">{key.CN}</span>
          </div>
          <div className="row date-row">
            <span className="label">Срок действия: </span>
            <span className="value">{key.validTo}</span>
            {key?.expired && <span className="value"> --- (Просрочен)</span>}
          </div>
          <div className="right-slider" />
        </div>
      ))}
    </div>
  )
}

export default ESPList
