import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import { Divider, ListItem } from "@mui/material"

function capFirstCase(word) {
  return word[0].toUpperCase() + word.slice(1).toLowerCase()
}

export default function GuessedWords({ guessedWords = [], isOpen, toggle }) {
  guessedWords = guessedWords.map(capFirstCase)
  return (
    <div className="flex items-center w-full justify-center">
      <div
        onClick={toggle}
        style={{
          zIndex: 5000,
          height: isOpen ? 560 : 40,
          alignItems: isOpen ? "start" : "center",
        }}
        className={
          "border w-full bg-white flex px-2 justify-between border-zinc-300 cursor-pointer"
        }
      >
        {!isOpen ? (
          <>
            {!guessedWords.length ? (
              <div>Your words...</div>
            ) : (
              <div className="flex">
                {guessedWords.slice(-6).map(w => (
                  <div className="mr-4" key={w}>
                    {w}
                  </div>
                ))}
                {guessedWords.length > 5 && <>...</>}
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col">
            <div className="mb-12">
              You have found {guessedWords.length}{" "}
              {guessedWords.length === 1 ? "word" : "words"}:
            </div>
            <div className="flex flex-col">
              <ul>
                {guessedWords.map((word, i) => {
                  return (
                    <>
                      <ListItem key={word}>{word}</ListItem>
                      {i !== guessedWords.length - 1 && <Divider />}
                    </>
                  )
                })}
              </ul>
            </div>
          </div>
        )}

        <KeyboardArrowDownIcon />
      </div>
    </div>
  )
}
