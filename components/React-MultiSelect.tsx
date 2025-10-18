import React from 'react'

import Select, { components, ControlProps, MultiValue } from 'react-select'
import CreatableSelect from 'react-select/creatable'
// import { colourOptions } from '../data'

// const options = [
//   { value: 'design', label: 'Design' },
//   { value: 'music', label: 'Musique' },
//   { value: 'dev', label: 'Développement' },
// ]
interface OptionType {
  label: string
  value: string
}

interface MultiSelectInputProps {
  options: OptionType[]
  value?: OptionType[]
  onChange?: (selected: OptionType[]) => void
}

export const ReactSelect = ({
  options,
  value,
  onChange,
}: MultiSelectInputProps) => {
  // const controlStyles = {
  //   border: '1px solid black',
  //   padding: '5px',
  //   background: 'blue',
  //   color: 'white',
  // }
  const ControlComponent = (props: ControlProps<typeof options, false>) => (
    <div className="w-full p-4 rounded-large">
      <components.Control {...props} />
    </div>
  )
  return (
    <>
      <div
        // style={controlStyles}
        className="w-full inline-flex shadow-xs px-3 bg-default-100 hover:bg-default-200 focus:bg-default-100 min-h-12 rounded-large flex-col items-start justify-center transition-background motion-reduce:transition-none !duration-150 outline-solid outline-transparent py-2"
      >
        <span className="text-sm mb-2 text-gray-500 dark:text-gray-400 font-medium">
          Caractéristique de produit
        </span>
        {/* <Select
      defaultValue={[options[2], options[3]]}
      isMulti
      name="colors"
      options={options}
      className="basic-multi-select"
      classNamePrefix="select"
    /> */}
        <CreatableSelect
          isClearable
          isSearchable
          isMulti
          // defaultValue={[options[2], options[3]]}
          // name="caracteristics"
          className="react-select-container"
          classNamePrefix="react-select"
          placeholder="Sélectionner..."
          // components={{ Control: ControlComponent }}
          // className="rounded-[14px] p-2"
          options={options}
          value={value}
          onChange={(selected: MultiValue<OptionType>) => {
            // selected est un tableau
            onChange?.(selected as OptionType[]) // cast vers OptionType[]
          }}
          styles={{
            control: (base) => ({
              ...base,
              borderColor: 'transparent',
              borderRadius: '25px',
              padding: `5px 0`,
            }),
            container: (base) => ({
              ...base,
              minWidth: '50%',
            }),
            menu: (base) => ({
              ...base,
              paddingInline: '0.25rem',
              borderRadius: `4px`,
            }),
            multiValue: (base) => ({
              ...base,
              padding: `4px`,
              borderRadius: `14px`,
            }),
            multiValueRemove: (base) => ({
              ...base,
              padding: '2px 6px',
              borderRadius: `14px`,
            }),
          }}
        />
      </div>
    </>
  )
}
