import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"

export default function GuessedWords({ guessedWords, open, toggle }) {
  let height = open ? "h-[560px]" : ""

  return (
    <div className="flex mt-10 items-center w-full justify-center">
      <div
        style={{ zIndex: 5000 }}
        className={
          "border w-[80%] bg-white flex justify-end border-black cursor-pointer" +
          " " +
          height
        }
      >
        <KeyboardArrowDownIcon />
      </div>
    </div>
  )
}
