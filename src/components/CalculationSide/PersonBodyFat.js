import React, { useState, useEffect } from "react"
import {
  FormRadio,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Slider
} from "shards-react"
import Store from "../../store"
import ModifierSlider from "./ModifierSlider"

export default function PersonBodyFat() {
  const { state, setState } = Store.useStore()
  // const [value, setValue] = useState(15)

  const onBodyFatChange = val => {
    const value = parseFloat(val)

    const maleIsLean = value <= 10
    const maleIsFat = value > 20 && value <= 25
    const maleIsVeryFat = value > 25 && value <= 30
    const maleIsVeryVeryFat = value > 30

    const femaleIsLean = value <= 18
    const femaleIsFat = value > 28 && value <= 32
    const femaleIsVeryFat = value > 32 && value <= 37
    const femaleIsVeryVeryFat = value > 37

    const isLean = state.gender === "Male" ? maleIsLean : femaleIsLean
    const isFat = state.gender === "Male" ? maleIsFat : femaleIsFat
    const isVeryFat = state.gender === "Male" ? maleIsVeryFat : femaleIsVeryFat
    const isVeryVeryFat =
      state.gender === "Male" ? maleIsVeryVeryFat : femaleIsVeryVeryFat

    if (!isLean && !isFat && !isVeryFat && !isVeryVeryFat) {
      setState(state => {
        state.bodyFatValue = 0
        state.bodyFat = value
      })
      return
    }
    if (isLean) {
      setState(state => {
        state.bodyFatValue = 0.5
        state.bodyFat = value
      })
      return
    }
    if (isFat) {
      setState(state => {
        state.bodyFatValue = -0.5
        state.bodyFat = value
      })
      return
    }
    if (isVeryFat) {
      setState(state => {
        state.bodyFatValue = -1
        state.bodyFat = value
      })
      return
    }
    if (isVeryVeryFat) {
      setState(state => {
        state.bodyFatValue = -1.5
        state.bodyFat = value
      })
      return
    }
  }

  return (
    <>
      <h5 className="font-weight-bold d-flex">
        <span>Body fat</span>
        <span className="ml-auto">{state.bodyFat} %</span>
      </h5>
      <ModifierSlider
        onChange={onBodyFatChange}
        max={40}
        min={5}
        step={1}
        defaultVal={state.bodyFat}
      />
    </>
  )
}

// function BfDropdown() {
//   const { state, setState } = Store.useStore()
//   const [isOpen, setOpen] = useState(false)
//   const [bfSelected, setBf] = useState(10)

//   const onBodyFatPercentChange = val => {
//     setBf(val)
//     setState(state => {
//       state.bodyFat = val
//     })
//   }

//   return (
//     <Dropdown open={isOpen} toggle={() => setOpen(!isOpen)} className="mr-2">
//       <DropdownToggle
//         outline
//         theme="dark"
//         disabled={state.bodyFatValue !== 0.5}
//         caret
//         className="p-2">
//         {bfSelected}
//       </DropdownToggle>
//       <DropdownMenu>
//         {Array(6)
//           .fill(null)
//           .map((n, i) => {
//             return (
//               <DropdownItem
//                 key={i}
//                 className=" my-0"
//                 onClick={() => onBodyFatPercentChange(i + 5)}>
//                 {i + 5}
//               </DropdownItem>
//             )
//           })}
//       </DropdownMenu>
//     </Dropdown>
//   )
// }

// <h5 className="font-weight-bold">Body Fat</h5>
// <div className="d-flex align-items-center mb-1">
//   <FormRadio
//     // className="pt-4"
//     checked={state.bodyFatValue === 0.5}
//     onChange={() => onBodyFatChange(0.5)}
//   />

//   {state.sexValue === 28 ? (
//     <>
//       <BfDropdown />
//       {` < 10%`}
//     </>
//   ) : (
//     ` < 18%`
//   )}
// </div>

// <FormRadio
//   checked={state.bodyFatValue === 0}
//   onChange={() => onBodyFatChange(0)}>
//   {state.sexValue === 28 ? `~ 15 %` : `~ 23 %`}
// </FormRadio>
// <FormRadio
//   checked={state.bodyFatValue === -0.5}
//   onChange={() => onBodyFatChange(-0.5)}>
//   {state.sexValue === 28 ? `20 % < bf < 24 %` : `28 % < bf < 32 %`}
// </FormRadio>
// <FormRadio
//   checked={state.bodyFatValue === -1}
//   onChange={() => onBodyFatChange(-1)}>
//   {state.sexValue === 28 ? `25 % < bf < 29 %` : `33 % < bf < 37 %`}
// </FormRadio>
// <FormRadio
//   checked={state.bodyFatValue === -1.5}
//   onChange={() => onBodyFatChange(-1.5)}>
//   {state.sexValue === 28 ? `> 29 %` : `> 37 %`}
// </FormRadio>
// <SliderCustomRange />
