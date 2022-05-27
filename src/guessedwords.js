import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"

export default function GuessedWords({ guessedWords, isOpen, toggle }) {
  return (
    <div className="flex absolute top-60 items-center w-full justify-center">
      <div
        onClick={toggle}
        style={{
          zIndex: 5000,
          height: isOpen ? 560 : 40,
          alignItems: isOpen ? "start" : "center",
        }}
        className={
          "border w-[80%] bg-white flex px-2 justify-between border-zinc-300 cursor-pointer"
        }
      >
        {!isOpen ? (
          <div>Your words...</div>
        ) : (
          <>
            <div>You have found {guessedWords.length} words</div>
            <div className="flex flex-col">
              <ul>
                {guessedWords.map(word => {
                  return <li key={word}>{word}</li>
                })}
              </ul>
            </div>
          </>
        )}

        <KeyboardArrowDownIcon />
      </div>
    </div>
  )
}
